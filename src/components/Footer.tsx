import Image from "next/image";
import Link from "next/link";
import { contentReady, footerMore, PAGES } from "@/config/routes";
import { ARTICLES } from "@/content/articles";
import { REVIEWS_ALLOWED, TESTIMONIALS } from "@/content/testimonials";
import { libraryAvailable } from "@/content/videos";
import { LINKS, MAPS_LINK, HOURS, SERVICES, SITE, TEL_HREF } from "@/config/site";
import { PhoneIcon, PinIcon } from "./Icons";

export default function Footer() {
  const more = footerMore({ articles: ARTICLES.length > 0, testimonials: REVIEWS_ALLOWED && TESTIMONIALS.length > 0, videos: libraryAvailable() });
  const serviceGroups = [
    {
      title: "Comprehensive Eye Care",
      links: [
        ...SERVICES.filter(({ group }) => group === "vision").map(({ title, href }) => ({ title, href })),
        { title: PAGES.squint.label, href: PAGES.squint.path },
      ],
    },
    {
      title: "Specialised Oculoplasty",
      links: SERVICES.filter(({ group }) => group === "oculoplasty"),
    },
  ];
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-logo-plate" aria-label={`${SITE.name}, home`}>
            <Image
              src="/images/namokar-logo.webp"
              alt={SITE.name}
              width={819}
              height={230}
              sizes="200px"
              className="footer-logo"
            />
          </Link>
          <p>
            {SITE.name} provides comprehensive ophthalmic care and specialised functional, reconstructive and aesthetic oculoplasty, led by Dr. Poonam Jain
            in {SITE.area}, India.
          </p>
          <p><strong>See Better. Look Better.</strong></p>
        </div>

        <nav aria-label="Footer" className="footer-col">
          <h2 className="footer-h">Quick Links</h2>
          <ul>
            <li><Link href={LINKS.home}>Home</Link></li>
            <li><Link href={LINKS.about}>About Us</Link></li>
            {/* <li><Link href={LINKS.doctor}>Dr. Poonam Jain</Link></li> */}
            <li><Link href={LINKS.allServices}>Our Services</Link></li>
            <li><Link href={LINKS.international}>International Patients</Link></li>
            <li><Link href={LINKS.contact}>Contact Us</Link></li>
            {more.map((m) => (
              <li key={m.href}><Link href={m.href}>{m.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="footer-col">
          <h2 className="footer-h">Our Services</h2>
          {serviceGroups.map(({ title, links }) => (
            <div key={title}>
              <h3>{title}</h3>
              <ul>
                {links.map((service) => (
                  <li key={service.href}><Link href={service.href}>{service.title}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <address className="footer-col footer-contact">
          <h2 className="footer-h">Contact Us</h2>
          <p>
            <span>{SITE.name}<br /></span>
            {SITE.address.lines.map((l) => (
              <span key={l}>{l}<br /></span>
            ))}
            <span>India</span>
            <span className="footer-landmark">{SITE.address.landmark}</span>
          </p>
          {HOURS.approved && HOURS.text && <p>Consultation Hours: {HOURS.text}</p>}
          <ul>
            <li>
              <a href={TEL_HREF}><PhoneIcon width={18} height={18} />{SITE.phone.display}</a>
            </li>
            <li>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
                <PinIcon width={18} height={18} />Get directions
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </address>
      </div>
      <div className="container footer-base">
        <p>© 2026 {SITE.name}. All rights reserved.</p>
        <nav aria-label="Legal" className="footer-legal">
          {contentReady("privacy") && <Link href={LINKS.privacy}>Privacy Policy</Link>}
          {contentReady("terms") && <Link href={LINKS.terms}>Terms of Use</Link>}
        </nav>
      </div>
    </footer>
  );
}
