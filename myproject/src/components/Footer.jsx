import '../footer/footer.css';

const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'fa-brands fa-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'fa-brands fa-linkedin' },
  { label: 'Twitter', href: 'https://twitter.com/', icon: 'fa-brands fa-x-twitter' },
  { label: 'Contact', href: 'mailto:merhaba@alpi.dev', icon: 'fa-solid fa-envelope' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerBrand">
          <h3>Alpi&apos;s Coding</h3>
          <span>Building products with curiosity and clean code.</span>
        </div>
        <nav className="footerLinks" aria-label="Footer links">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              <i className={link.icon} aria-hidden="true" />
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footerNote">
          (c) {new Date().getFullYear()} Alpi.Dev - All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

