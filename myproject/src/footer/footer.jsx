import './footer.css';


const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'fa-brands fa-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'fa-brands fa-linkedin' },
  { label: 'Twitter', href: 'https://twitter.com/', icon: 'fa-brands fa-x-twitter' },
  { label: 'İletişim', href: 'mailto:merhaba@alpi.dev', icon: 'fa-solid fa-envelope' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerBrand">
          <h3>Alpi&apos;s Coding</h3>
          <span>My development journey with coding and programming.</span>
        </div>
        <nav className="footerLinks" aria-label="Alt bağlantılar">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              <i className={link.icon} aria-hidden="true" />
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footerNote">© {new Date().getFullYear()} Alpi.Dev · All rights reserved.</div>
      </div>
    </footer>
  );
}