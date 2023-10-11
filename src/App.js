import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [movie,setMovie]=useState("")
  const [pSource,setSource]=useState("")

  const handleChange=(e)=>{
    setMovie(e.target.value);
  }

  async function retrievePoster(){
    const key=process.env.REACT_APP_KEY;
  
    let m=movie.trim();
    const url=`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${m}`;
    
    await fetch(url).then(res=>res.json()).then(data=>{
      if(data.results){
        const path=data.results[0]['poster_path'];
        const newPath=`https://image.tmdb.org/t/p/w200${path}`;
        setSource(newPath);
      }
    })
  }
  useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (movie.trim() !== '') {
          retrievePoster();
        }
      }
    });
    
  }, [movie]);

  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
      <h1>Movie Poster Display</h1>
      <input type="text" id="movieInput" placeholder="Enter a movie title" value={movie} onChange={handleChange}></input>
      <button id="searchButton" onClick={retrievePoster} class='btn btn-primary'>Search</button>

      <div id="posterContainer">
        <img id="curPoster" src={pSource}></img>
      </div>
          
    </div>
  );
}

export default App;
