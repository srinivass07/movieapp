import { useState, useEffect, useRef } from "react";
import { fetchMovies, IMAGE_URL, BACKDROP_URL } from "../tmdb";

export default function Row({ title, fetchUrl, isLargeRow, onMovieClick, isTopTen }) {
  const [movies, setMovies] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchMovies(fetchUrl)
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [fetchUrl]);

  const checkArrows = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkArrows);
    checkArrows();
    return () => el.removeEventListener("scroll", checkArrows);
  }, [movies]);

  const scroll = (dir) => {
    if (!rowRef.current) return;
    const containerWidth = rowRef.current.clientWidth;
    rowRef.current.scrollBy({ left: dir === "left" ? -containerWidth * 0.8 : containerWidth * 0.8, behavior: "smooth" });
  };

  const handleMouseEnter = (id) => {
    hoverTimeout.current = setTimeout(() => setHoveredId(id), 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setHoveredId(null);
  };

  return (
    <div className="row">
      <h2 className="row__title">
        {title}
        <span className="row__explore">
          Explore All
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </h2>
      <div className="row__container">
        {showLeftArrow && (
          <button className="row__arrow row__arrow--left" onClick={() => scroll("left")}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div className="row__posters" ref={rowRef}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`row__skeleton ${isLargeRow ? "row__skeleton--large" : ""}`}
                />
              ))
            : movies.map((movie, i) => {
                const imgSrc = isLargeRow
                  ? movie.poster_path
                  : movie.backdrop_path || movie.poster_path;
                if (!imgSrc) return null;

                return (
                  <div
                    className={`row__card ${isLargeRow ? "row__card--large" : ""} ${
                      hoveredId === movie.id ? "row__card--hovered" : ""
                    }`}
                    key={movie.id}
                    onMouseEnter={() => handleMouseEnter(movie.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => onMovieClick(movie)}
                  >
                    {isTopTen && (
                      <div className="row__rank">
                        <span className="row__rank-number">{i + 1}</span>
                      </div>
                    )}
                    <div className="row__card-img-container">
                      <img
                        className="row__card-img"
                        src={`${IMAGE_URL}${imgSrc}`}
                        alt={movie.title || movie.name}
                        loading="lazy"
                      />
                    </div>

                    {/* Hover Mini Card */}
                    {hoveredId === movie.id && (
                      <div className="row__mini-card">
                        <div className="row__mini-img-wrapper">
                          <img
                            src={`${movie.backdrop_path ? BACKDROP_URL + movie.backdrop_path : IMAGE_URL + movie.poster_path}`}
                            alt=""
                            className="row__mini-img"
                          />
                        </div>
                        <div className="row__mini-info">
                          <div className="row__mini-buttons">
                            <button className="row__mini-btn row__mini-btn--play">
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                            </button>
                            <button className="row__mini-btn row__mini-btn--circle">
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </svg>
                            </button>
                            <button className="row__mini-btn row__mini-btn--circle">
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                              </svg>
                            </button>
                            <button className="row__mini-btn row__mini-btn--circle row__mini-btn--right" onClick={(e) => { e.stopPropagation(); onMovieClick(movie); }}>
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </button>
                          </div>
                          <div className="row__mini-meta">
                            <span className="row__mini-match">{Math.round((movie.vote_average || 0) * 10)}% Match</span>
                            <span className="row__mini-maturity">U/A 16+</span>
                            <span className="row__mini-year">{(movie.release_date || movie.first_air_date || "").split("-")[0]}</span>
                          </div>
                          <div className="row__mini-genres">
                            <span>{movie.title || movie.name}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
        {showRightArrow && (
          <button className="row__arrow row__arrow--right" onClick={() => scroll("right")}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
