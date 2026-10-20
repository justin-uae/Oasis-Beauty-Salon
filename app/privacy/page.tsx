import Hero from '../components/Hero';
import {site} from '../data/site';

export const metadata = {title: 'Privacy Policy', description: 'How Oasis Beauty Salon collects, uses and protects your personal information.'};

export default function Page() {
  return (
    <>
      <Hero title="Privacy Policy" lead="How Oasis Beauty Salon collects, uses and protects your personal information." />
      <section className="container py-16 max-w-4xl">
        <div className="prose">
          <p><strong>Last updated: 6 August 2026</strong></p>

          <p>Oasis Beauty Salon ("we", "us", "our") is committed to protecting your privacy. This policy explains what personal information we collect through this website, why we collect it, how it is used and the choices and rights you have. It applies to www.oasisaltrincham.co.uk and covers our compliance with UK data protection law, including the UK GDPR and the Data Protection Act 2018.</p>

          <h2>Who we are</h2>
          <p>Oasis Beauty Salon, {site.address}. If you have any questions about this policy or how your information is handled, you can contact us using the details at the bottom of this page.</p>

          <h2>Information we collect</h2>
          <p>We collect information in the following ways:</p>
          <p><strong>Contact form.</strong> When you submit the contact form on this site, we collect the name, email address and message you provide, so that we can respond to your enquiry. Submissions are processed by a form handler running on our web hosting and are sent to us by email; they are not stored in a database or shared with third parties beyond the services described below.</p>
          <p><strong>Bookings.</strong> Appointment bookings on this website are made through Fresha, an independent online booking platform. When you book an appointment, your booking details are collected and processed directly by Fresha under its own privacy policy and terms, not by us. We recommend reviewing Fresha's privacy policy before booking.</p>
          <p><strong>Phone, WhatsApp and email.</strong> If you contact us directly by phone, WhatsApp or email, we will use the details you provide (such as your name and phone number) to respond to you and, where relevant, to arrange or manage your appointment.</p>
          <p><strong>Automatically collected information.</strong> Like most websites, our hosting and analytics tools may automatically log technical information such as your IP address, browser type, device type, pages visited and approximate location. This is used to keep the site secure and to understand how it is used; see "Cookies and similar technologies" below.</p>

          <h2>How we use your information</h2>
          <p>We use the personal information we collect to:</p>
          <p>respond to enquiries submitted through the contact form or sent directly to us; manage and communicate with you about appointments and bookings; protect the website and our systems from spam, abuse and fraudulent submissions; and understand how visitors use the site so that we can improve it.</p>
          <p>We do not sell your personal information, and we do not use it for marketing unless you have separately agreed to receive marketing communications from us.</p>

          <h2>Legal basis for processing</h2>
          <p>We rely on the following legal bases under UK GDPR: your consent, when you voluntarily submit the contact form or contact us directly; our legitimate interests, in responding to enquiries, keeping the website secure and understanding site usage; and, where applicable, the steps necessary to perform a contract with you, such as arranging a treatment you have booked.</p>

          <h2>Cookies and similar technologies</h2>
          <p>This website may use the following technologies, each of which can set cookies or similar identifiers in your browser:</p>
          <p><strong>Google Analytics</strong> — helps us understand how visitors use the site (pages viewed, time on site, general location). Analytics data is aggregated and used to improve the website.</p>
          <p><strong>Google reCAPTCHA</strong> — used on the contact form to help distinguish real visitors from automated bots and prevent spam submissions. reCAPTCHA may set cookies and collect hardware and software information, such as device and application data, which is sent to Google. Use of reCAPTCHA is subject to the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Google Terms of Service</a>.</p>
          <p><strong>Google Maps</strong> — the map on our contact page is provided by Google and may set cookies when it loads. Use of Google Maps is subject to the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>.</p>
          <p>You can control or delete cookies through your browser settings at any time. Blocking cookies may affect how parts of this website work, including the contact form.</p>

          <h2>Sharing your information</h2>
          <p>We do not sell or rent your personal information. We may share limited information with trusted third-party services that help us run this website and our business, specifically: our web hosting provider, for email delivery of contact form submissions; Google, for analytics and reCAPTCHA spam protection; and Fresha, for online bookings you make directly through their platform. We may also disclose information where required by law or to protect our rights, property or safety, or that of our clients.</p>

          <h2>How long we keep your information</h2>
          <p>Contact form enquiries are kept only for as long as needed to respond to and resolve your enquiry, and are then deleted or archived securely. Booking and appointment information is retained in line with standard business record-keeping requirements, including tax and insurance obligations, after which it is securely deleted.</p>

          <h2>Your rights</h2>
          <p>Under UK data protection law, you have the right to: request access to the personal information we hold about you; request that inaccurate information be corrected; request that your information be deleted, where there is no legal reason for us to keep it; object to or restrict how we use your information; and request a copy of your information in a portable format.</p>
          <p>To exercise any of these rights, contact us using the details below. If you are unhappy with how we have handled your information, you also have the right to complain to the Information Commissioner's Office (ICO) at ico.org.uk.</p>

          <h2>Children's privacy</h2>
          <p>This website is not directed at children, and we do not knowingly collect personal information from children under 13.</p>

          <h2>Changes to this policy</h2>
          <p>We may update this policy from time to time, for example to reflect changes to the tools we use on this website. Any updates will be posted on this page with a revised "last updated" date.</p>

          <h2>Contact us</h2>
          <p>If you have any questions about this privacy policy or how your information is handled, please contact us:</p>
          <p>Oasis Beauty Salon, {site.address}<br />
            Phone: <a href={'tel:' + site.phone.replace(/ /g, '')}>{site.phone}</a><br />
            WhatsApp: <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">+{site.whatsapp}</a><br />
            Email: <a href={'mailto:' + site.email}>{site.email}</a></p>
        </div>
      </section>
    </>
  );
}
