
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

  //banner superior de bienvenida
  if (!movies) return <h1 style={{ color: 'black', textAlign: 'center' }}>Cargando...</h1>;
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000020', color: 'white' }}>
    <marquee direction="" 
    style={{
      color: "white", 
      backgroundColor: "#000020", 
      fontSize: "20px", 
      padding: "10px",
      width: "100%",
      height: "55px",
      border: "none",
    }}
    >
      Bienvenidos a Cine Fanáticos !!!. Disfruta de todo el contenido gratuito 😁.
    </marquee>
    {/* <h1>Movies App</h1> */}
      <MovieGallery movies={movies}/>
    </div>
  )
}

export default App
