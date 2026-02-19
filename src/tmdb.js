const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODU1YzMwMDU1M2YzMmVkOTc0OTIzOTg2NjdmNTVmMyIsIm5iZiI6MTc3MTQxOTE1Ni4wMDQ5OTk5LCJzdWIiOiI2OTk1YjYxMzYyMGY4ZjIzNjIwNjY4NzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VM-77Svz5K6jmrUfbaENBU036f79OBGY5re5fhIbb9E";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

export const IMAGE_URL = `${IMG_BASE}/w500`;
export const BACKDROP_URL = `${IMG_BASE}/original`;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${ACCESS_TOKEN}`,
};

const requests = {
  trending: `${BASE_URL}/trending/all/week?language=en-US`,
  netflixOriginals: `${BASE_URL}/discover/tv?with_networks=213`,
  topRated: `${BASE_URL}/movie/top_rated?language=en-US`,
  action: `${BASE_URL}/discover/movie?with_genres=28`,
  comedy: `${BASE_URL}/discover/movie?with_genres=35`,
  horror: `${BASE_URL}/discover/movie?with_genres=27`,
  romance: `${BASE_URL}/discover/movie?with_genres=10749`,
  documentaries: `${BASE_URL}/discover/movie?with_genres=99`,
  sciFi: `${BASE_URL}/discover/movie?with_genres=878`,
};

export default requests;

export async function fetchMovies(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.results;
}

export async function fetchMovieDetails(id, type = "movie") {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}?append_to_response=videos,credits`,
    { headers }
  );
  if (!res.ok) throw new Error("Failed to fetch details");
  return res.json();
}
