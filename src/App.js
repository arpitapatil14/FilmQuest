import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './components/movieCard/movieCard';

function App() {
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getShows = async () => {
    try {
      const { data } = await axios.get('https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&series_granularity=show&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_type=movie', {
        headers: {
          'x-rapidapi-key': 'f9261a3fccmsh9f3b13c5ce05af1p1e36b7jsn18023044a178',
          'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
      });
      setShows(data.shows);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShows();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredShows = shows.filter((show) => {
    const title = show.originalTitle || show.originalName;
    const genres = show.genres.map((genre) => genre.name);
    const titleMatch = title.toLowerCase().includes(searchQuery.toLowerCase());
    const genreMatch = genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase()));
    return titleMatch || genreMatch;
  });

  return (
    <div className="App">
      <header className='header'>
        <div className="header-container">
          <h1 className='heading-1'>Movie Explorer</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by title or genre"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>
      </header>
      {filteredShows.length > 0 ? (
        <div className="movie-grid">
          {filteredShows.map((show) => (
            <MovieCard
              key={show.id}
              id={show.id}
              title={show.originalTitle || show.originalName}
              posterURLs={show.posterURLs}
              genres={show.genres?.map((genre) => genre.name)}
              rating={show.rating}
              cast={show.cast}
              directors={show.directors}
            />
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default App;