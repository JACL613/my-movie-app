/* eslint-disable react/prop-types */
import  { useState } from 'react'
import Form from './Form'
import { CirclePlus, CircleX, Play, Star } from 'lucide-react'
// import Selected from './Selected'
import Button from './button';



const MovieCard = ({ movie, onClick }) => (
  <div className="bg-transparent cursor-pointer group" onClick={onClick}>
    <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
      <img
        src={movie.coverImage}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Play />
      </div>
    </div>
    <h3 className="mt-2 text-sm font-medium truncate">{movie.title}</h3>
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <span>{movie.year}</span>
      <div className="flex items-center">
        <Star  className="w-3 h-3 fill-yellow-500 stroke-yellow-500" />
        <span className="ml-1">{movie.rating}</span>
      </div>
    </div>
  </div>
)

export default function MovieGallery({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const handleTrailerClick = (trailerUrl) => {
    if (trailerUrl) {
      // Validar si es una URL de YouTube válida
      if (trailerUrl.includes('youtube.com') || trailerUrl.includes('youtu.be')) {
        window.open(trailerUrl, '_blank', 'noopener,noreferrer');
      } else {
        // Si la URL no es de YouTube, intentamos construirla
        // Asumiendo que trailerUrl podría ser solo el ID del video
        const youtubeUrl = `https://www.youtube.com/watch?v=${trailerUrl}`;
        window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      alert('No hay trailer disponible para esta película.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {selectedMovie && (
        <div className="relative w-full h-[80vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={selectedMovie.backdropImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          </div>
          
          <div className="relative h-full container mx-auto px-4 py-8 flex items-end">
            <div className="flex flex-col md:flex-row gap-8 items-start max-w-4xl">
              <img
                src={selectedMovie.coverImage}
                alt={selectedMovie.titulo}
                className="w-48 rounded-lg shadow-2xl hidden md:block"
              />
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">{selectedMovie.title}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <span>{selectedMovie.fecha_publicacion}</span>
                  <span>{selectedMovie.duration}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
                    <span className="ml-1">{selectedMovie.calificacion}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedMovie.genero.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 max-w-2xl">{selectedMovie.descripcion}</p>
                <div className="flex gap-4 pt-4">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Play className="w-4 h-4 mr-2" />
                    Ver Ahora
                  </Button>
                  {selectedMovie.trailerUrl && (
                  <Button 
                  className="bg-gray-600 hover:bg-gray-700"
                  onClick={() => handleTrailerClick(selectedMovie.trailerUrl)}
                  >
                  <span className="w-4 h-4 mr-2" />
                  Ver Trailer
                  </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <nav className="flex gap-6 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {["Popular", "Puntaje", "Acción", "Aventura", "Comedia", "Crimen", "Fantasía", "Familia"].map((category) => (
            <button
              key={category}
              className="text-gray-400 hover:text-white transition-colors whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </nav>

        <Button
            onClick={() => {
              setShowAddForm(!showAddForm)
            }}
            className={`bg-green-600 hover:bg-green-700 z-20 fixed top-[90%] left-2 text-white px-4 py-2 rounded-md ${showAddForm ? 'bg-red-600 hover:bg-red-700': ''}`}
          >
            {showAddForm ? ( <CircleX className='' height={25} width={25}/>): (<CirclePlus height={25} width={25}/>)}
          </Button>

          {showAddForm && (<Form className="bottom-4"/>)}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}