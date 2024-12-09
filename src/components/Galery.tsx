import { SetStateAction, useState } from 'react';
import Form from './Form';
import { CirclePlus, CircleX, Play, Star, X } from 'lucide-react';
import Button from './Button';
import Selected from './Selected';

interface Movie {
  id: number;
  title: string;
  coverImage: string;
  year: number;
  rating: number;
}

interface ModalProps {
  trailerUrl: string;
  onClose: () => void;
}

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  className: string;
}

interface MovieGalleryProps {
  movies: Movie[];
}

// Modal component for the trailer
const Modal: React.FC<ModalProps> = ({ trailerUrl, onClose }) => (
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
        src={trailerUrl} // Aquí va la URL convertida de formato estándar de YT a formato embed
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => (
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
        <Star className="w-3 h-3 fill-yellow-500 stroke-yellow-500" />
        <span className="ml-1">{movie.rating}</span>
      </div>
    </div>
  </div>
);

export const MovieGallery: React.FC<MovieGalleryProps> = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [trailerModal, setTrailerModal] = useState<{ isOpen: boolean; trailerUrl: string }>({ isOpen: false, trailerUrl: '' });
  const [movieModal, setMovieModal] = useState<{ isOpen: boolean; videoUrl: string }>({ isOpen: false, videoUrl: '' });

  return (
    <div className="min-h-screen bg-primary text-white">
      {selectedMovie && (
        <Selected
          selectedMovie={selectedMovie}
          setMovieModal={(e: SetStateAction<{ isOpen: boolean; videoUrl: string; }>) => setMovieModal(e)}
          setTrailerModal={(e: SetStateAction<{ isOpen: boolean; trailerUrl: string; }>) => setTrailerModal(e)}
        />
      )}

      <div className="container mx-auto px-auto py-8">
        <nav className="flex gap-6 mb-2 overflow-x-auto pb-4 scrollbar-hide">
          {['Popular', 'Puntaje', 'Acción', 'Aventura', 'Comedia', 'Crimen', 'Fantasía', 'Familia'].map((category) => (
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
            setShowAddForm(!showAddForm);
          }}
          className={`bg-green-600 hover:bg-green-700 z-20 fixed top-[90%] left-2 text-white px-4 py-2 rounded-md ${
            showAddForm ? 'bg-red-600 hover:bg-red-700' : ''
          }`}
        >
          {showAddForm ? <CircleX className="" height={25} width={25} /> : <CirclePlus height={25} width={25} />}
        </Button>

        {showAddForm && <Form className="bottom-4" />}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => {
                console.log('movie', movie);
                setSelectedMovie(movie);
              }}
              className="cursor-pointer"
            />
          ))}
        </div>
      </div>
      {trailerModal.isOpen && (
        <Modal
          trailerUrl={trailerModal.trailerUrl}
          onClose={() => setTrailerModal({ isOpen: false, trailerUrl: '' })}
        />
      )}
      {movieModal.isOpen && (
        <Modal
          trailerUrl={movieModal.videoUrl} // Cambia a videoUrl
          onClose={() => setMovieModal({ isOpen: false, videoUrl: '' })}
        />
      )}
    </div>
  );
};
