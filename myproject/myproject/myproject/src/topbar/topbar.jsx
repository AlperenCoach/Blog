import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBlogs } from '../services/api';
import { Link } from 'react-router-dom';
import './topbar.css';
import unknownperson from '../assets/unknownperson.png';
import logo from '../assets/logo.png';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Write', to: '/write' },
];

export default function Topbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const avatarMenuRef = useRef(null);

  const toggleAvatar = () => {
    setIsAvatarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setIsAvatarOpen(false);
    navigate('/');
  };

  const closeAvatar = () => {
    setIsAvatarOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    closeAvatar();
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

  // Load blog data for search suggestions
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogs = await getBlogs();
        setAllBlogs(blogs);
      } catch (error) {
        console.error('Error loading blogs for search:', error);
      }
    };
    loadBlogs();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim().length > 0) {
      performSearch(value);
    } else {
      setSearchResults([]);
    }
  };

  const performSearch = (term) => {
    setSearchLoading(true);
    const lowerTerm = term.toLowerCase();
    
    const results = allBlogs.filter(blog => {
      const titleMatch = blog.title?.toLowerCase().includes(lowerTerm);
      const contentMatch = blog.content?.toLowerCase().includes(lowerTerm);
      const categoryMatch = blog.category?.toLowerCase().includes(lowerTerm);
      const authorMatch = blog.author?.toLowerCase().includes(lowerTerm);
      
      return titleMatch || contentMatch || categoryMatch || authorMatch;
    });
    
    setSearchResults(results.slice(0, 5)); // Limit to first 5 results
    setSearchLoading(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchTerm)}`);
      closeSearch();
    }
  };

  const handleResultClick = () => {
    closeSearch();
  };

  // Close modal with ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchTerm('');
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const shouldLockScroll = isSearchOpen || isAvatarOpen;
    document.body.style.overflow = shouldLockScroll ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, isAvatarOpen]);

  useEffect(() => {
    if (!isAvatarOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target)) {
        setIsAvatarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAvatarOpen]);

  return (
    <header className="top">
      <div className="topInner">
        <div className="topLogoWrapper">
          <button 
            className="hamburgerButton" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`hamburgerLine ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburgerLine ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburgerLine ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
          <Link to="/" className="topLogo" onClick={closeMenu}>
            <img src={logo} alt="Alpi.Dev Logo" className="topLogoImage" />
          </Link>
        </div>
        <div className="topLeft">
          <a
            className="topIcon"
            href="https://github.com/AlperenCoach"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github" aria-hidden="true" />
          </a>
          <a
            className="topIcon"
            href="https://www.linkedin.com/in/alperencs/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin" aria-hidden="true" />
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
        <nav className={`topCenter ${isMenuOpen ? 'menuOpen' : ''}`} aria-label="Main navigation">
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
              {isAuthenticated() ? (
                <div className="topNavAuthContainer">
                  <span className="topNavUsername">
                    {user?.username || user?.email}
                  </span>
                  <button 
                    type="button" 
                    className="loginButton" 
                    onClick={() => {
                      logout();
                      closeMenu();
                      navigate('/');
                    }}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <a href="/login" className="loginButtonLink" onClick={closeMenu}>
                  <button type="button" className="loginButton" onClick={closeMenu}>
                    Sign In
                  </button>
                </a>
              )}
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
          <div className="topAvatarWrapper" ref={avatarMenuRef}>
            <button 
              type="button" 
              className="topAvatarButton" 
              onClick={toggleAvatar}
              aria-expanded={isAvatarOpen}
              aria-haspopup="true"
              aria-controls="avatar-menu"
            >
              <img
                className="topAvatar"
                src={user?.profilePicture || unknownperson}
                alt={user?.fullName || user?.username || "Profile"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = unknownperson;
                }}
              />
            </button>
            <div 
              id="avatar-menu"
              className={`avatarDropdown ${isAvatarOpen ? 'open' : ''}`}
              role="menu"
            >
              {isAuthenticated() ? (
                <>
                  <div className="avatarDropdownHeader">
                    <p className="avatarGreeting">Hello,</p>
                    <p className="avatarUser">
                      {user?.fullName || user?.username || user?.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="avatarDropdownItem"
                    onClick={() => {
                      navigate('/write');
                      setIsAvatarOpen(false);
                    }}
                  >
                    Write a Post
                  </button>
                  <button
                    type="button"
                    className="avatarDropdownItem"
                    onClick={() => {
                      navigate('/profile');
                      setIsAvatarOpen(false);
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    type="button"
                    className="avatarDropdownItem logout"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <p className="avatarGreeting">Welcome!</p>
                  <button
                    type="button"
                    className="avatarDropdownItem"
                    onClick={() => {
                      navigate('/login');
                      setIsAvatarOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="avatarDropdownItem"
                    onClick={() => {
                      navigate('/signup');
                      setIsAvatarOpen(false);
                    }}
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    className="avatarDropdownItem"
                    onClick={() => {
                      navigate('/profile');
                      setIsAvatarOpen(false);
                    }}
                  >
                    My Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="searchModalOverlay" onClick={closeSearch}>
          <div className="searchModalContent" onClick={(e) => e.stopPropagation()}>
            <button 
              className="searchModalClose" 
              onClick={closeSearch}
              aria-label="Close search"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
            
            <form className="searchModalForm" onSubmit={handleSearchSubmit}>
              <div className="searchInputWrapper">
                <i className="fa-solid fa-magnifying-glass searchInputIcon" aria-hidden="true"></i>
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  autoFocus
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="searchClearButton"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                  >
                    <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                  </button>
                )}
              </div>
              <button type="submit" className="searchSubmitButton">
                Search
              </button>
            </form>

            <div className="searchResults">
              {searchLoading ? (
                <p className="searchPlaceholder">Searching...</p>
              ) : searchTerm.trim() && searchResults.length > 0 ? (
                <div className="searchResultsList">
                  {searchResults.map((blog) => (
                    <Link
                      key={blog.id}
                      to={`/blog/${blog.id}`}
                      className="searchResultItem"
                      onClick={handleResultClick}
                    >
                      <h4 className="searchResultTitle">{blog.title}</h4>
                      <p className="searchResultSnippet">
                        {blog.content?.substring(0, 100)}...
                      </p>
                      {blog.category && (
                        <span className="searchResultCategory">{blog.category}</span>
                      )}
                    </Link>
                  ))}
                  {searchResults.length >= 5 && (
                    <button 
                      className="searchViewAll"
                      onClick={handleSearchSubmit}
                    >
                      View all results ({allBlogs.filter(b => {
                        const term = searchTerm.toLowerCase();
                        return b.title?.toLowerCase().includes(term) ||
                               b.content?.toLowerCase().includes(term) ||
                               b.category?.toLowerCase().includes(term) ||
                               b.author?.toLowerCase().includes(term);
                      }).length})
                    </button>
                  )}
                </div>
              ) : searchTerm.trim() && searchResults.length === 0 ? (
                <p className="searchPlaceholder">No results found</p>
              ) : (
                <p className="searchPlaceholder">Start typing to search</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}