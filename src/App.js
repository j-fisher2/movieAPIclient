import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [movie, setMovie] = useState("");
  const [pSource, setSource] = useState("");

  const handleChange = (e) => {
    setMovie(e.target.value);
  }

  async function retrievePoster() {
    const key = process.env.REACT_APP_KEY;
    let m = movie.trim();
    if (m.length === 0) {
      return;
    }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${m}`;

    const re=await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          const path = data.results[0]['poster_path'];
          const newPath = `https://image.tmdb.org/t/p/w200${path}`;
          setSource(newPath);
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    retrievePoster();
  }


  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous">
      </link>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="mx-auto">
          <h1 className="navbar-brand" style={{ fontSize: '2rem' }}>Movie Poster Display</h1>
        </div>
      </nav>
      <form onSubmit={handleSubmit}>
        <input type="text" id="movieInput" placeholder="Enter a movie title" value={movie} onChange={handleChange}></input>
        <button type="submit" id="searchButton" className="btn btn-primary">Search</button>
      </form>

      <div id="posterContainer">
        <img id="curPoster" src={pSource}></img>
      </div>

    </div>
  );
}
export default App