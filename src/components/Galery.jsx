/* eslint-disable react/prop-types */
import  { useState } from 'react'
import Form from './Form'
import { CirclePlus, CircleX, Play, Star, X} from 'lucide-react'
// import Selected from './Selected'
import Button from './button';

//componente modal del trailer
const Modal = ({ trailerUrl, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div className="relative bg-black p-4 rounded-lg max-w-4xl w-full">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white text-2xl hover:text-red-500"
      >
        <X />
      </button>
      <iframe
  width="100%"
  height="400px"
  src={trailerUrl} // Aquí va la URL convertida de formato standart de YT a formato embed
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
    </div>
  </div>
);

const MovieCard = ({ movie, onClick }) => (
  <div className="bg-transparent cursor-pointer group" onClick={onClick}>
    <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
      <img
        src={movie.coverImage}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center ">
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
  const [trailerModal, setTrailerModal] = useState({ isOpen: false, trailerUrl: "" });//estado para el modal de ver trailer
  const [movieModal, setMovieModal] = useState({ isOpen: false, videoUrl: "" });//estado para controlar el modal de ver peliculas


//logica boton ver ahora
  const handleMovieClick = (movieUrl) => {
    setMovieModal({ isOpen: true, videoUrl: movieUrl });
  };
  
  
  const handleTrailerClick = (trailerUrl) => {
    if (trailerUrl) {
      let videoId;
      try {
        // Extraer el ID del video desde una URL como https://youtu.be/<id>?<params>
        const url = new URL(trailerUrl);
        if (url.hostname === "youtu.be") {
          videoId = url.pathname.slice(1); // Obtén el ID del video
        } else if (url.hostname.includes("youtube.com")) {
          videoId = url.searchParams.get("v"); // Obtén el ID desde el parámetro "v"
        }
      } catch (error) {
        alert("URL de tráiler inválida.");
        return;
      }
  
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        setTrailerModal({ isOpen: true, trailerUrl: embedUrl });
      } else {
        alert("No se pudo obtener el ID del video.");
      }
    } else {
      alert("No hay tráiler disponible para esta película.");
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white ">
      {selectedMovie && (
        <div className="relative w-full h-[50vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={selectedMovie.backdropImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          </div>
          
          <div className="relative h-full container mx-auto px-10 py-16 flex items-center">
            <div className="flex flex-col md:flex-row gap-8 items-start max-w-4xl">
              <img
                src={selectedMovie.coverImage}
                alt={selectedMovie.titulo}
                className="w-48 rounded-lg shadow-2xl hidden md:block"
              />
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold ">{selectedMovie.title}</h1>
                <div className="flex items-center gap-4 text-sm ">
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
                      className="px-3 py-1 bg-white/10 rounded-full text-sm "
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 max-w-2xl">{selectedMovie.descripcion}</p>
                <div className="flex gap-4 pt-4">
                  
                  {selectedMovie.peliculaUrl && (
                  <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleMovieClick(selectedMovie.peliculaUrl)}>
                  <Play className="w-4 h-4 mr-2" />
                  Ver Ahora
                  </Button>
                  )}

                  
                  {selectedMovie.trailerUrl && (
                  <Button 
                  className="bg-gray-600 hover:bg-gray-700"
                  onClick={() => handleTrailerClick(selectedMovie.trailerUrl)}>
                  <Play className="w-4 h-4 mr-2" />
                  Ver Trailer
                  </Button>
                  )}

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-auto py-8 ">
        <nav className="flex gap-6 mb-2 overflow-x-auto pb-4 scrollbar-hide">
          {["Popular", "Puntaje", "Acción", "Aventura", "Comedia", "Crimen", "Fantasía", "Familia"].map((category) => (
            <button
              key={category}
              className="text-xl text-white-500 hover:text-gray-400 transition-colors whitespace-nowrap"
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
            {showAddForm ? ( <CircleX className='' height={25} width={25}/>) : (<CirclePlus height={25} width={25}/>)}
          </Button>

          {showAddForm && (<Form className="bottom-4"/>)}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
              className="cursor-pointer"
              
            />
          ))}
        </div>
      </div>
      {trailerModal.isOpen && (
        <Modal
          trailerUrl={trailerModal.trailerUrl}
          onClose={() => setTrailerModal({ isOpen: false, trailerUrl: "" })}
        />
      
      )}
      {movieModal.isOpen && (
  <Modal
    trailerUrl={movieModal.videoUrl} // Cambia a videoUrl
    onClose={() => setMovieModal({ isOpen: false, videoUrl: "" })}
  />
)}
    </div>
  )
}