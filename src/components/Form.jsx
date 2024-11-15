import  { useState } from 'react'

// eslint-disable-next-line react/prop-types
export default function Form({ className}) {
    const [movie, setMovie] = useState({
        title: '',
        fecha_publicacion: '',
        calificacion: '',
        genero: '',
        duration: '',
        descripcion: '',
        coverImage: '',
        backdropImage: ''
      })

      const handleChange = (e) => {
        const { name, value } = e.target
        setMovie(prevMovie => ({
          ...prevMovie,
          [name]: name === 'genero' ? value.split(',').map(genre => genre.trim()) : value
        }))
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/peliculas', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...movie})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error))
        // onAddMovie({...movie, id: Date.now()})
        setMovie({
          title: '',
          fecha_publicacion: '',
          calificacion: '',
          genero: '',
          duration: '',
          descripcion: '',
          coverImage: '',
          backdropImage: ''
        })
      }

  return (
    <form onSubmit={handleSubmit} className={`bg-gray-800 p-6 rounded-lg shadow-lg fixed z-20  ${className}`}>
    <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="title"
        value={movie.title}
        onChange={handleChange}
        placeholder="Title"
        className="bg-gray-700 text-white p-2 rounded"
        required
      />
      <input
        type="number"
        name="fecha_publicacion"
        value={movie.fecha_publicacion}
        onChange={handleChange}
        placeholder="Year"
        className="bg-gray-700 text-white p-2 rounded"
        required
      />
      <input
        type="number"
        name="calificacion"
        value={movie.calificacion}
        onChange={handleChange}
        placeholder="Rating"
        step="0.1"
        min="0"
        max="10"
        className="bg-gray-700 text-white p-2 rounded"
        required
      />
      <input
        type="text"
        name="genero"
        value={movie.genero}
        onChange={handleChange}
        placeholder="Genres (comma-separated)"
        className="bg-gray-700 text-white p-2 rounded"
        required
      />
      <input
        type="text"
        name="duration"
        value={movie.duration}
        onChange={handleChange}
        placeholder="Duration"
        className="bg-gray-700 text-white p-2 rounded"
        required
      />
      <input
        type="text"
        name="coverImage"
        value={movie.coverImage}
        onChange={handleChange}
        placeholder="Cover Image URL"
        className="bg-gray-700 text-white p-2 rounded"
        required
      />
      <input
        type="text"
        name="backdropImage"
        value={movie.backdropImage}
        onChange={handleChange}
        placeholder="Backdrop Image URL"
        className="bg-gray-700 text-white p-2 rounded"
        required
      />
    </div>
    <textarea
      name="descripcion"
      value={movie.descripcion}
      onChange={handleChange}
      placeholder="Description"
      className="bg-gray-700 text-white p-2 rounded w-full mt-4"
      rows="4"
      required
    ></textarea>
    <button type="submit" className="bg-blue-600 hover:bg-blue-700 mt-4 px-3 py-1 rounded-md" >
      Add Movie
    </button>
  </form>
  )
}
