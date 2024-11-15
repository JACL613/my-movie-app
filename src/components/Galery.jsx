/* eslint-disable react/prop-types */
import  { useState } from 'react'
import Form from './Form'
import { CirclePlus, CircleX, Play, Star } from 'lucide-react'
import Selected from './Selected'
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

  return (
    <div className="min-h-screen bg-black text-white">
      {selectedMovie && (<Selected selectedMovie={selectedMovie}/>)}

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