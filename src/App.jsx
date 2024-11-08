
import { useEffect, useState } from 'react'
import './App.css'
import MovieGallery from './components/Galery'
// import movies from './utils/DB.json'


function App() {
  const [movies, setMovies] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/peliculas', {
      method: 'GET',
      headers: {
        "Acept": "application/json"
      },
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      setMovies(res.data)
      
    })
  }, [])

  if (!movies) return <h1>Loading...</h1>
  return (
    <>
    {/* <h1>Movies App</h1> */}
      <MovieGallery movies={movies}/>
    </>
  )
}

export default App
