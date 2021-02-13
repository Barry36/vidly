import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Movie from "./movie";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
  };

  onDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  onLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
    console.log(movies);
  };

  //   handlePageChange = (page) => {
  //     console.log(page);
  //   };
  render() {
    const movieCount = this.state.movies.length;
    if (movieCount === 0) {
      return <p>There are no movies in the database</p>;
    }

    return (
      <React.Fragment>
        <p>There are {movieCount} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this.state.movies.map((movie) => (
              <Movie
                key={movie._id}
                movie={movie}
                onDelete={this.onDelete}
                onLike={this.onLike}
              ></Movie>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
