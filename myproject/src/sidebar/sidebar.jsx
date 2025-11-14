import { Link } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar() {
  const navLinks = [
    { label: 'Ana Sayfa', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Hakkımda', path: '/about' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebarProfile">
        <div className="sidebarProfileImage">
          <div className="profilePlaceholder">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="https://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="40" r="40" fill="rgba(15, 23, 42, 0.1)" />
              <circle cx="40" cy="32" r="12" fill="rgba(15, 23, 42, 0.3)" />
              <path
                d="M20 65c0-11 9-20 20-20s20 9 20 20"
                stroke="rgba(15, 23, 42, 0.3)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>
        <div className="sidebarBio">
          <p>
            Minimal tasarımlı projeler geliştirirken öğrendiklerimi kısa notlar halinde
            kaydediyorum. Frontend ve backend arasında köprü kurmayı seviyorum.
          </p>
        </div>
      </div>

      <nav className="sidebarNav">
        <ul className="sidebarNavList">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="sidebarNavLink">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
