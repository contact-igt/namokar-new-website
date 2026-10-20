import Image from "next/image";
import Link from "next/link";
import { footerMore } from "@/config/routes";
import { ARTICLES } from "@/content/articles";
import { REVIEWS_ALLOWED, TESTIMONIALS } from "@/content/testimonials";
import { libraryAvailable } from "@/content/videos";
import { LINKS, MAPS_LINK, SERVICES, SITE, TEL_HREF } from "@/config/site";
import { PhoneIcon, PinIcon } from "./Icons";

export default function Footer() {
  const more = footerMore({ articles: ARTICLES.length > 0, testimonials: REVIEWS_ALLOWED && TESTIMONIALS.length > 0, videos: libraryAvailable() });
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
            Comprehensive eye care with specialist oculoplasty, led by Dr. Poonam Jain
            in {SITE.area}.
          </p>
        </div>

        <nav aria-label="Footer" className="footer-col">
          <h2 className="footer-h">Explore</h2>
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
          <h2 className="footer-h">Services</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.key}><Link href={s.href}>{s.title}</Link></li>
            ))}
          </ul>
        </nav>

        <address className="footer-col footer-contact">
          <h2 className="footer-h">Visit or call</h2>
          <p>
            {SITE.address.lines.map((l) => (
              <span key={l}>{l}<br /></span>
            ))}
            <span className="footer-landmark">{SITE.address.landmark}</span>
          </p>
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
        <p>
          Information on this website is general guidance and does not replace an
          examination by a doctor.
        </p>
      </div>
    </footer>
  );
}
