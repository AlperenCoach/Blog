import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './topbar.css';
import unknownperson from '../assets/unknownperson.png';


const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Write', to: '/write' },
];

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchTerm('');
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Arama yapılacak (sonraki adımlarda implement edilecek)
      console.log('Arama yapılıyor:', searchTerm);
      // Şimdilik sadece console'a yazdırıyoruz
    }
  };

  // ESC tuşu ile modal'ı kapat
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchTerm('');
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      // Modal açıkken body scroll'unu engelle
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  
  return (
    <header className="top">
      <div className="topInner">
        <button 
          className="hamburgerButton" 
          onClick={toggleMenu}
          aria-label="Menüyü aç/kapat"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburgerLine ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburgerLine ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburgerLine ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
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
        <nav className={`topCenter ${isMenuOpen ? 'menuOpen' : ''}`} aria-label="Ana menü">
          <ul className="topNavList">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button type="button" className="logoutButton" onClick={closeMenu}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <div className="topRight">
          <button 
            type="button" 
            className="searchButton" 
            aria-label="Search"
            onClick={toggleSearch}
          >
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          </button>
          <img
            className="topAvatar"
            src={unknownperson}
            alt="Profil"
          />
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="searchModalOverlay" onClick={closeSearch}>
          <div className="searchModalContent" onClick={(e) => e.stopPropagation()}>
            <button 
              className="searchModalClose" 
              onClick={closeSearch}
              aria-label="Aramayı kapat"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
            
            <form className="searchModalForm" onSubmit={handleSearchSubmit}>
              <div className="searchInputWrapper">
                <i className="fa-solid fa-magnifying-glass searchInputIcon" aria-hidden="true"></i>
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Blog yazılarında ara..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  autoFocus
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="searchClearButton"
                    onClick={() => setSearchTerm('')}
                    aria-label="Aramayı temizle"
                  >
                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                  </button>
                )}
              </div>
              <button type="submit" className="searchSubmitButton">
                Ara
              </button>
            </form>

            <div className="searchResults">
              {/* Sonuçlar burada gösterilecek (sonraki adımlarda) */}
              {searchTerm.trim() ? (
                <p className="searchPlaceholder">Arama sonuçları burada gösterilecek...</p>
              ) : (
                <p className="searchPlaceholder">Aramaya başlamak için bir şey yazın</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}