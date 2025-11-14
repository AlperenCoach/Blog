import { NavLink } from 'react-router-dom';
import './topbar.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Write', to: '/write' },
];

export default function Topbar() {
  return (
    <header className="top">
      <div className="topInner">
        <div className="topLeft">
          <a
            className="topIcon"
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github" aria-hidden="true" />
          </a>
          <a
            className="topIcon"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram" aria-hidden="true" />
          </a>
          <a
            className="topIcon"
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <i className="fa-brands fa-x-twitter" aria-hidden="true" />
          </a>
        </div>
        <nav className="topCenter" aria-label="Ana menü">
          <ul className="topNavList">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button type="button" className="logoutButton">
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <div className="topRight">
          <button type="button" className="searchButton" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          </button>
          <img
            className="topAvatar"
            src="https://avatars.githubusercontent.com/u/113269197?v=4"
            alt="Profil"
          />
        </div>
      </div>
    </header>
  );
}