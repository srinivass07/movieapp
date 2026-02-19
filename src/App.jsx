import { useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Row from "./components/Row";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import requests from "./tmdb";
import "./App.css";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="app">
      <Navbar />
      <Banner onMovieClick={setSelectedMovie} />

      <div className="rows-container">
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.netflixOriginals}
          isLargeRow
          onMovieClick={setSelectedMovie}
        />
        <Row title="Trending Now" fetchUrl={requests.trending} onMovieClick={setSelectedMovie} />
        <Row title="Top 10 Movies in India Today" fetchUrl={requests.topRated} onMovieClick={setSelectedMovie} isTopTen />
        <Row title="Action Movies" fetchUrl={requests.action} onMovieClick={setSelectedMovie} />
        <Row title="Comedy Movies" fetchUrl={requests.comedy} onMovieClick={setSelectedMovie} />
        <Row title="Horror Movies" fetchUrl={requests.horror} onMovieClick={setSelectedMovie} />
        <Row title="Romance Movies" fetchUrl={requests.romance} onMovieClick={setSelectedMovie} />
        <Row title="Sci-Fi Adventures" fetchUrl={requests.sciFi} onMovieClick={setSelectedMovie} />
        <Row title="Documentaries" fetchUrl={requests.documentaries} onMovieClick={setSelectedMovie} />
      </div>

      <Footer />

      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default App;
