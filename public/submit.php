<?php
// submit.php — Oasis Beauty Salon contact form handler
//
// Lives in /public so `npm run build` copies it straight into /out alongside
// the static site — upload the whole /out folder to your web host and it
// lands at www.oasisaltrincham.co.uk/submit.php automatically.
//
// Spam protection: honeypot field + per-IP rate limiting + Google reCAPTCHA v2
// ("I'm not a robot" checkbox).
//
// Before going live:
//   1. Create a .env file next to this file on the server (see .env.example)
//      with your real RECAPTCHA_SECRET_KEY. Until then this uses Google's
//      published "always passes" test key, which is NOT safe for production.
//   2. Set FROM_EMAIL to a real mailbox/alias on your hosting account.
//   3. Confirm NOTIFY_EMAIL is where enquiries should land.

error_reporting(E_ALL);
ini_set('display_errors', '0'); // never show raw errors to the client
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/error.log');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$MESSAGES = [
    'no_data'           => 'No data received',
    'rate_limited'      => 'Too many requests. Please try again later or call us directly.',
    'recaptcha_missing' => 'Please confirm you are not a robot.',
    'recaptcha_failed'  => 'reCAPTCHA verification failed. Please try again.',
    'name_required'     => 'Please enter your name.',
    'message_required'  => 'Please enter a message.',
    'invalid_email'     => 'Please enter a valid email address.',
    'name_length'       => 'Name must be between 2 and 100 characters.',
    'send_success'      => 'Thank you. Your message has been sent and our team will be in touch soon.',
    'send_failed'       => 'Sorry, we could not send your message. Please try again or contact us directly at %s.',
];

function msg(string $key, ...$args): string
{
    global $MESSAGES;
    $template = $MESSAGES[$key] ?? '';
    return $args ? vsprintf($template, $args) : $template;
}

// ---- Load .env (if present) into getenv() ----------------------------------
function load_env(string $path): void
{
    if (!is_file($path)) {
        return;
    }
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') {
            continue;
        }
        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue;
        }
        $key = trim($parts[0]);
        $value = trim($parts[1], " \t\n\r\0\x0B\"'");
        if ($key !== '' && getenv($key) === false) {
            putenv("{$key}={$value}");
        }
    }
}
load_env(__DIR__ . '/.env');

// ---- Configuration ---------------------------------------------------------
define('NOTIFY_EMAIL', getenv('NOTIFY_EMAIL') ?: 'bookings@oasisaltrincham.co.uk');
define('FROM_EMAIL', getenv('FROM_EMAIL') ?: 'noreply@oasisaltrincham.co.uk'); // must be a real mailbox/alias on this hosting account
define('SITE_NAME', 'Oasis Beauty Salon');
define('SITE_DOMAIN', 'www.oasisaltrincham.co.uk');
// Google's published "always passes" test secret — pairs with the test site key in
// ContactForm.tsx. Replace both with your real reCAPTCHA keys before launch.
define('RECAPTCHA_SECRET_KEY', getenv('RECAPTCHA_SECRET_KEY') ?: '6LcIvnktAAAAABQTCxWhK75AZ-jkW6reExQvFkDM');

// ---- Parse input ------------------------------------------------------------
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => msg('no_data')]);
    exit();
}

// ---- Honeypot: hidden field with a name that has no meaning to browser
// autofill. Real visitors never fill it in; bots that blindly fill every
// field do.
if (!empty($data['hp_field'])) {
    echo json_encode(['success' => true, 'message' => msg('send_success')]);
    exit();
}

// ---- Basic per-IP rate limiting (5 submissions / 10 minutes) ---------------
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/oasis_enquiry_' . md5($ip) . '.json';
$window = 600;
$maxRequests = 5;
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $decoded = json_decode((string) file_get_contents($rateFile), true);
    $hits = is_array($decoded) ? $decoded : [];
}
$hits = array_values(array_filter($hits, static fn($t) => is_int($t) && $t > $now - $window));
if (count($hits) >= $maxRequests) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => msg('rate_limited')]);
    exit();
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits));

// ---- Verify Google reCAPTCHA v2 ---------------------------------------------
$token = is_string($data['recaptchaToken'] ?? null) ? $data['recaptchaToken'] : '';
if ($token === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => msg('recaptcha_missing')]);
    exit();
}

$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$verifyBody = http_build_query([
    'secret'   => RECAPTCHA_SECRET_KEY,
    'response' => $token,
    'remoteip' => $ip,
]);

$ch = curl_init($verifyUrl);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $verifyBody,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
]);
$verifyResponse = curl_exec($ch);
curl_close($ch);

$verify = $verifyResponse ? json_decode($verifyResponse, true) : null;
if (!is_array($verify) || empty($verify['success'])) {
    error_log('reCAPTCHA verification failed: ' . ($verifyResponse ?: 'no response'));
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => msg('recaptcha_failed')]);
    exit();
}

// ---- Sanitize helpers --------------------------------------------------------
function clean_field($value, int $max = 500): string
{
    $value = is_string($value) ? $value : '';
    $value = preg_replace('/[\r\n]+/', ' ', $value) ?? ''; // block header-injection via any field
    return function_exists('mb_substr')
        ? mb_substr(trim(strip_tags($value)), 0, $max)
        : substr(trim(strip_tags($value)), 0, $max);
}

$fields = [
    'name'    => clean_field($data['name'] ?? '', 100),
    'email'   => filter_var(trim((string) ($data['email'] ?? '')), FILTER_SANITIZE_EMAIL),
    'message' => clean_field($data['message'] ?? '', 2000),
];

// ---- Validation ---------------------------------------------------------------
if ($fields['name'] === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => msg('name_required')]);
    exit();
}

if (strlen($fields['name']) < 2 || strlen($fields['name']) > 100) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => msg('name_length')]);
    exit();
}

if ($fields['email'] === '' || !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => msg('invalid_email')]);
    exit();
}

if ($fields['message'] === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => msg('message_required')]);
    exit();
}

// ---- Build email ------------------------------------------------------------------
$submittedDate = date('jS F l Y') . ' at ' . date('g:i a');
$ipAddress = $ip;
$userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? htmlspecialchars($_SERVER['HTTP_USER_AGENT'], ENT_QUOTES, 'UTF-8') : 'Unknown';

$rows = [
    'Name'  => $fields['name'],
    'Email' => $fields['email'],
];

$rowsHtml = '';
foreach ($rows as $label => $value) {
    $rowsHtml .= "
            <div class='field'>
                <span class='label'>" . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . "</span>
                <div class='value'>" . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '</div>
            </div>';
}

$messageHtml = "
            <div class='field'>
                <span class='label'>Message</span>
                <div class='value message-value'>" . nl2br(htmlspecialchars($fields['message'], ENT_QUOTES, 'UTF-8')) . '</div>
            </div>';

$subjectName = str_replace(["\r", "\n"], '', $fields['name']);
$subject = SITE_NAME . ' - New enquiry from ' . $subjectName;

// HTML email body — styled to match the Oasis site palette
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #272326;
            margin: 0;
            padding: 0;
            background-color: #fbf7f3;
        }
        .container {
            max-width: 640px;
            margin: 20px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #8d5057 0%, #b86f77 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: bold;
        }
        .content {
            padding: 30px;
        }
        .field {
            margin-bottom: 18px;
            border-bottom: 1px solid #eadfda;
            padding-bottom: 18px;
        }
        .field:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
        .label {
            font-weight: 700;
            color: #8d5057;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
            display: block;
        }
        .value {
            background: #fbf7f3;
            padding: 10px 14px;
            border-radius: 8px;
            border-left: 4px solid #b86f77;
            color: #272326;
            word-wrap: break-word;
        }
        .message-value {
            white-space: pre-wrap;
        }
        .footer {
            background: #272326;
            color: #ead0d3;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer p { margin: 4px 0; }
        .metadata { font-size: 11px; color: #b3a6a8; margin-top: 5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>New Enquiry</h1>
        </div>
        <div class='content'>
            {$rowsHtml}
            {$messageHtml}
            <div class='field'>
                <span class='label'>Submission details</span>
                <div class='value'>
                    <strong>Date:</strong> {$submittedDate}<br>
                    <div class='metadata'>
                        <strong>IP Address:</strong> {$ipAddress}<br>
                        <strong>User Agent:</strong> {$userAgent}
                    </div>
                </div>
            </div>
        </div>
        <div class='footer'>
            <p><strong>" . SITE_NAME . "</strong></p>
            <p><a href='https://" . SITE_DOMAIN . "' style='color:#b86f77;text-decoration:none;'>" . SITE_DOMAIN . "</a></p>
            <p style='margin-top:12px;font-size:11px;'>Reply directly to this email to respond to {$fields['name']}.</p>
        </div>
    </div>
</body>
</html>
";

// ---- Email headers ----------------------------------------------------------------
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From: ' . SITE_NAME . ' <' . FROM_EMAIL . '>' . "\r\n";
$headers .= 'Reply-To: ' . $fields['name'] . ' <' . $fields['email'] . '>' . "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion() . "\r\n";
$headers .= 'X-Priority: 3' . "\r\n";

// ---- Send mail -----------------------------------------------------------------------
$mailSent = @mail(NOTIFY_EMAIL, $subject, $emailBody, $headers);

if ($mailSent) {
    error_log("Enquiry submitted successfully from: {$fields['name']} ({$fields['email']})");
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => msg('send_success'),
    ]);
} else {
    error_log("Failed to send enquiry email from: {$fields['name']} ({$fields['email']})");
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => msg('send_failed', NOTIFY_EMAIL),
    ]);
}
