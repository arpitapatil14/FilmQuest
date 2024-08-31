import "./movieCard.css";

const MovieCard = ({ id, title, posterURLs, genres, rating, cast, directors }) => {
  // Remove double quotes and hashtags from the title
  const cleanedTitle = title.replace(/^#|"/g, '').replace(/"$/g, '');

  return (
    <div className="card-container">
      <div className="card-img-container">
        <img src="https://static.vecteezy.com/system/resources/previews/001/266/936/non_2x/time-for-movie-poster-with-cinema-items-on-red-vector.jpg" alt="" />
      </div>
      <div className="card-details">
        <h2 className="card-title">{cleanedTitle}</h2>
        <div>
          <span className="label">Genres : </span>
          <span className="genres">
            {genres?.map((genre, index) => (
              <span key={`${genre}-${index}`} className="genre-item">
                {genre}
                {index !== genres.length - 1 && " | "}
              </span>
            ))}
          </span>
        </div>
        <div>
          <span className="label">Rating : </span>
          <span className="rating">{rating}</span>
        </div>
        <div>
          <span className="label">Cast : </span>
          <span className="cast">
            {cast?.map((actor, index) => (
              <span key={`${actor}-${index}`} className="cast-item">
                {actor}
                {index !== cast.length - 1 && " | "}
              </span>
            ))}
          </span>
        </div>
        <div>
          <span className="label">Directors : </span>
          <span className="directors">
            {directors?.map((director, index) => (
              <span key={`${director}-${index}`} className="director-item">
                {director}
                {index !== directors.length - 1 && " | "}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;