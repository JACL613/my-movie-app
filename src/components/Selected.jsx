/* eslint-disable react/prop-types */
import { Info, Play, Star, TicketPlus, TicketX } from "lucide-react";
import Form from "./Form";
import { useState } from "react";
import Button from "./button"; // Fix the case of the file name

// eslint-disable-next-line react/prop-types
export default function Selected({selectedMovie }) {
   const [showForm , setShowForm] = useState(false)    
  return (
        <div className="relative w-full h-[80vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={selectedMovie.backdropImage}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          </div>
          
          <div className="relative h-full container mx-auto px-4 py-8 flex items-end gap-2">
            <div className="flex flex-col md:flex-row gap-8 items-start max-w-4xl">
              <img
                src={selectedMovie.coverImage}
                alt={selectedMovie.title}
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
            {showForm && <Form/>}
             <div className="gap-2  block sm:flex">
             <Button className="backdrop-blur-sm bg-red-600 my-1">
                <TicketX />
              </Button>
              <Button 
              onClick={() => setShowForm(!showForm)}
              className="backdrop-blur-sm bg-blue-600 my-1">
                <TicketPlus />
              </Button>
             </div>
          </div>
        </div>
  )
}
