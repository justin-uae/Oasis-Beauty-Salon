import {site} from '@/app/data/site';
export default function MobileBookingBar(){return <div className='mobile-booking-bar'><a href={'tel:'+site.phone.replace(/ /g,'')} aria-label='Call Oasis Beauty Salon'>Call</a><a href={site.booking} className='primary' target='_blank' rel='noreferrer'>Book now</a></div>}
