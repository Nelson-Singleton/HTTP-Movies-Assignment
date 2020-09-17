import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import {useHistory} from 'react-router-dom'

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory() //

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const newRouteButton = (e) => {
    e.preventDefault()
    history.push(`/update-movie/${movie.id}`)
  }

  const deleteButton = e => {
    e.preventDefault()
    axios 
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log(res, "Movie deleted ")
        history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick = {newRouteButton}>Change Movie</button>
      <button onClick = {deleteButton}>Delete Movie</button>
    </div>
  );
}

export default Movie;
