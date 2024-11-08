/* eslint-disable react/prop-types */
import  { useState } from 'react'
import Form from './Form'

const Star = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const Play = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const Info = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-md font-medium flex items-center justify-center ${className}`} {...props}>
    {children}
  </button>
)

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
        <Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" />
        <span className="ml-1">{movie.rating}</span>
      </div>
    </div>
  </div>
)

export default function MovieGallery({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

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
                  <Button className="bg-gray-600 hover:bg-gray-700">
                    <Info className="w-4 h-4 mr-2" />
                    Ver Trailer
                  </Button>
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
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700"
          >
            {showAddForm ? 'Hide Form' : 'Add Movie'}
          </Button>

          {showAddForm && <Form/>}

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