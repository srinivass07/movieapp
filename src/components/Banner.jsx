import { useState, useEffect, useCallback } from "react";
import { fetchMovies, BACKDROP_URL } from "../tmdb";
import requests from "../tmdb";

export default function Banner({ onMovieClick }) {
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    fetchMovies(requests.trending).then((res) => {
      const filtered = res.filter((m) => m.backdrop_path && m.overview);
      setMovies(filtered.slice(0, 8));
      if (filtered.length > 0) {
        setMovie(filtered[0]);
      }
    });
  }, []);

  const cycleBanner = useCallback(() => {
    if (movies.length < 2) return;
    setTransitioning(true);
    setTimeout(() => {
      setIndex((prev) => {
        const next = (prev + 1) % movies.length;
        setMovie(movies[next]);
        setImgLoaded(false);
        return next;
      });
      setTimeout(() => setTransitioning(false), 50);
    }, 600);
  }, [movies]);

  useEffect(() => {
    if (movies.length < 2) return;
    const timer = setInterval(cycleBanner, 10000);
    return () => clearInterval(timer);
  }, [cycleBanner, movies]);

  if (!movie) {
    return (
      <div className="banner banner--loading">
        <div className="banner__skeleton-title" />
        <div className="banner__skeleton-desc" />
        <div className="banner__skeleton-btns" />
      </div>
    );
  }

  const title = movie.title || movie.name || movie.original_name;
  const desc = movie.overview
    ? movie.overview.length > 180
      ? movie.overview.substring(0, 180) + "…"
      : movie.overview
    : "";

  return (
    <div className={`banner ${transitioning ? "banner--fade" : ""}`}>
      <div className="banner__bg">
        <img
          src={`${BACKDROP_URL}${movie.backdrop_path}`}
          alt=""
          className={`banner__bg-img ${imgLoaded ? "loaded" : ""}`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <div className="banner__vignette" />
      <div className="banner__content">
        <div className="banner__badge">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M4 2h6l2 4-3 6 3 6-2 4H4l2-4-3-6 3-6L4 2z" fill="#e50914"/>
            <path d="M14 2h6l-2 4 3 6-3 6 2 4h-6l-2-4 3-6-3-6 2-4z" fill="#b20710"/>
          </svg>
          <span>N</span>
          <span className="banner__badge-text">S E R I E S</span>
        </div>
        <h1 className="banner__title">{title}</h1>
        <div className="banner__meta">
          <span className="banner__match">{Math.round((movie.vote_average || 0) * 10)}% Match</span>
          <span className="banner__year">{(movie.release_date || movie.first_air_date || "").split("-")[0]}</span>
          <span className="banner__maturity">U/A 16+</span>
          <span className="banner__quality">HD</span>
        </div>
        <p className="banner__description">{desc}</p>
        <div className="banner__buttons">
          <button className="banner__btn banner__btn--play">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Play
          </button>
          <button className="banner__btn banner__btn--info" onClick={() => onMovieClick(movie)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            More Info
          </button>
        </div>
      </div>
      <div className="banner__fadeBottom" />

      {/* Banner Indicator Dots */}
      {movies.length > 1 && (
        <div className="banner__indicators">
          {movies.map((_, i) => (
            <button
              key={i}
              className={`banner__dot ${i === index ? "banner__dot--active" : ""}`}
              onClick={() => {
                setTransitioning(true);
                setTimeout(() => {
                  setIndex(i);
                  setMovie(movies[i]);
                  setImgLoaded(false);
                  setTimeout(() => setTransitioning(false), 50);
                }, 600);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
