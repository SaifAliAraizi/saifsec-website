import "./Footer.css";
import { useSite } from "../../context/SiteContext";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaYoutube,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  const { site } = useSite();

  const logoUrl = site?.logo || "/assets/logo.png";
  const email = site?.email || "araizii007@gmail.com";
  const phone = site?.phone || "+92 330 9122954";

  return (
    <footer className="footer" id="contact">
      <div className="footer-left">
        <img
          src={logoUrl}
          alt={site?.brand_name || "SaifSec"}
          className="footer-logo"
        />

        <p>
          “{site?.tagline || "Where offensive thinking meets defensive security."}”
        </p>
      </div>

      <div className="footer-right">
        {/* Email */}
        <div className="footer-contact-row">
          <a href={`mailto:${email}`} className="footer-email">
            {email}
          </a>

          <a
            href={`mailto:${email}`}
            className="footer-contact-icon email-icon"
            aria-label="Send Email"
            title="Send Email"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Phone */}
        <div className="footer-contact-row">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="footer-phone">
            {phone}
          </a>

          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="footer-contact-icon phone-icon"
            aria-label="Call Phone Number"
            title="Call Phone Number"
          >
            <FaPhoneAlt />
          </a>
        </div>

        {/* Social links */}
        <div className="footer-socials">
          <a
            href={site?.youtube_url || "https://youtube.com"}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            title="YouTube"
            className="footer-social-icon youtube-icon"
          >
            <FaYoutube />
          </a>

          <a
            href={site?.linkedin_url || "https://linkedin.com"}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="footer-social-icon linkedin-icon"
          >
            <FaLinkedin />
          </a>

          <a
            href={site?.github_url || "https://github.com"}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="footer-social-icon github-icon"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;