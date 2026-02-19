import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__left">
        <div className="navbar__logo">
          <img
            className="navbar__logo-img"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
          />
        </div>

        <ul className="navbar__links">
          <li className="navbar__link active">Home</li>
          <li className="navbar__link">TV Shows</li>
          <li className="navbar__link">Movies</li>
          <li className="navbar__link">New & Popular</li>
          <li className="navbar__link">My List</li>
          <li className="navbar__link">Browse by Languages</li>
        </ul>

        <div className="navbar__mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
          <span>Browse</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points={mobileMenu ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
          </svg>
        </div>
      </div>

      <div className="navbar__right">
        <div className={`navbar__search ${searchOpen ? "navbar__search--open" : ""}`}>
          <svg
            className="navbar__search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={searchRef}
            className="navbar__search-input"
            type="text"
            placeholder="Titles, people, genres"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
          />
        </div>

        <span className="navbar__kids">Kids</span>

        <div className="navbar__notifications">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>

        <div className="navbar__profile">
          <img
            className="navbar__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile"
          />
          <svg className="navbar__profile-caret" viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>

      {mobileMenu && (
        <div className="navbar__mobile-menu">
          <ul>
            <li className="active">Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
          </ul>
        </div>
      )}
    </nav>
  );
}
