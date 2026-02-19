import { useState, useEffect } from "react";
import { BACKDROP_URL, IMAGE_URL, fetchMovieDetails } from "../tmdb";

export default function Modal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie) return;
    setLoading(true);
    const type = movie.media_type === "tv" || movie.first_air_date ? "tv" : "movie";
    fetchMovieDetails(movie.id, type)
      .then((data) => { setDetails(data); setLoading(false); })
      .catch(() => setLoading(false));

    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const title = movie.title || movie.name || movie.original_name;
  const backdrop = movie.backdrop_path ? `${BACKDROP_URL}${movie.backdrop_path}` : null;
  const trailer = details?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const teaser = !trailer
    ? details?.videos?.results?.find((v) => v.site === "YouTube")
    : null;
  const video = trailer || teaser;
  const cast = details?.credits?.cast?.slice(0, 8) || [];
  const genres = details?.genres || [];
  const runtime = details?.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : details?.episode_run_time?.[0]
    ? `${details.episode_run_time[0]}m per ep`
    : null;
  const seasons = details?.number_of_seasons;
  const matchPct = Math.round((movie.vote_average || 0) * 10);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Hero */}
        <div className="modal__hero">
          {video ? (
            <iframe
              className="modal__trailer"
              src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : backdrop ? (
            <img src={backdrop} alt={title} className="modal__backdrop" />
          ) : (
            <div className="modal__backdrop modal__backdrop--empty" />
          )}
          <div className="modal__hero-gradient" />
          <div className="modal__hero-content">
            <h2 className="modal__title">{title}</h2>
            <div className="modal__hero-buttons">
              <button className="modal__play-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Play
              </button>
              <button className="modal__icon-btn" title="Add to My List">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <button className="modal__icon-btn" title="I like this">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </button>
            </div>
          </div>
          {/* Volume / Maturity at right side */}
          <div className="modal__hero-right">
            <button className="modal__icon-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            </button>
            <span className="modal__maturity-badge">U/A 16+</span>
          </div>
        </div>

        {/* Info Body */}
        <div className="modal__body">
          <div className="modal__body-left">
            <div className="modal__meta-row">
              <span className="modal__match">{matchPct}% Match</span>
              <span className="modal__year">
                {(movie.release_date || movie.first_air_date || "").split("-")[0]}
              </span>
              {seasons && <span className="modal__seasons">{seasons} Season{seasons > 1 ? "s" : ""}</span>}
              {runtime && <span className="modal__runtime">{runtime}</span>}
              <span className="modal__hd-badge">HD</span>
              <span className="modal__spatial">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="10" rx="2" />
                  <path d="M7 11h2v2H7z" />
                </svg>
              </span>
            </div>
            <p className="modal__overview">{movie.overview}</p>
          </div>
          <div className="modal__body-right">
            {cast.length > 0 && (
              <p className="modal__detail">
                <span className="modal__label">Cast:</span>{" "}
                {cast.map((c, i) => (
                  <span key={c.id}>
                    <span className="modal__detail-link">{c.name}</span>
                    {i < cast.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
            {genres.length > 0 && (
              <p className="modal__detail">
                <span className="modal__label">Genres:</span>{" "}
                {genres.map((g, i) => (
                  <span key={g.id}>
                    <span className="modal__detail-link">{g.name}</span>
                    {i < genres.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
            {details?.tagline && (
              <p className="modal__detail">
                <span className="modal__label">Tagline:</span>{" "}
                <span className="modal__detail-link">{details.tagline}</span>
              </p>
            )}
          </div>
        </div>

        {/* Similar Titles */}
        {details?.credits?.cast?.length > 0 && (
          <div className="modal__section">
            <h3 className="modal__section-title">About {title}</h3>
            <div className="modal__about-grid">
              {cast.length > 0 && (
                <p className="modal__about-item">
                  <span className="modal__label">Cast:</span> {cast.map((c) => c.name).join(", ")}
                </p>
              )}
              {genres.length > 0 && (
                <p className="modal__about-item">
                  <span className="modal__label">Genres:</span> {genres.map((g) => g.name).join(", ")}
                </p>
              )}
              {details?.vote_average && (
                <p className="modal__about-item">
                  <span className="modal__label">Rating:</span> ⭐ {details.vote_average.toFixed(1)} / 10
                </p>
              )}
              {details?.production_companies?.length > 0 && (
                <p className="modal__about-item">
                  <span className="modal__label">Production:</span> {details.production_companies.map(c => c.name).join(", ")}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
