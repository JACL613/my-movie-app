import  { useState } from 'react'

export default function Form() {
    const [movie, setMovie] = useState({
        title: '',
        year: '',
        rating: '',
        genres: '',
        duration: '',
        description: '',
        coverImage: '',
        backdropImage: ''
      })

      const handleChange = (e) => {
        const { name, value } = e.target
        setMovie(prevMovie => ({
          ...prevMovie,
          [name]: name === 'genres' ? value.split(',').map(genre => genre.trim()) : value
        }))
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        // onAddMovie({...movie, id: Date.now()})
        setMovie({
          title: '',
          year: '',
          rating: '',
          genres: '',
          duration: '',
          description: '',
          coverImage: '',
          backdropImage: ''
        })
      }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
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
        name="year"
        value={movie.year}
        onChange={handleChange}
        placeholder="Year"
        className="bg-gray-700 text-white p-2 rounded"
        required
      />
      <input
        type="number"
        name="rating"
        value={movie.rating}
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
        name="genres"
        value={movie.genres}
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
      name="description"
      value={movie.description}
      onChange={handleChange}
      placeholder="Description"
      className="bg-gray-700 text-white p-2 rounded w-full mt-4"
      rows="4"
      required
    ></textarea>
    <button type="submit" className="bg-blue-600 hover:bg-blue-700 mt-4">
      Add Movie
    </button>
  </form>
  )
}
