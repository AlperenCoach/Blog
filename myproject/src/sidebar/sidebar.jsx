import './sidebar.css';
import whoami from '../assets/whoami.jpg';

const favoriteStacks = ['React', 'TypeScript', '.NET', 'Tailwind', 'Prisma', 'Testing Library'];
const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'fa-brands fa-github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'fa-brands fa-linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'fa-brands fa-instagram' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">Hakkımda</span>
        <img
          src={whoami}
          alt="Yazar portresi"
        />
        <p>
          Merhaba! Minimal tasarımlı projeler geliştirirken öğrendiklerimi kısa notlar halinde
          kaydediyorum. Frontend ve backend arasında köprü kurmayı seviyorum.
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">Favori Yığınlar</span>
        <div className="sidebarTags">
          {favoriteStacks.map((stack) => (
            <span key={stack} className="sidebarTag">
              #{stack}
            </span>
          ))}
        </div>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">Bağlantılar</span>
        <ul className="sidebarLinks">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                <i className={link.icon} aria-hidden="true" />
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}