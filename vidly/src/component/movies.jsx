import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import Movie from "./movie";
class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
    console.log(movies);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const movieCount = this.state.movies.length;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    if (movieCount === 0) {
      return <p>There are no movies in the database</p>;
    }

    // Pagination happens here
    const movies = paginate(allMovies, currentPage, pageSize);
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
            {movies.map((movie) => (
              <Movie
                key={movie._id}
                movie={movie}
                onDelete={this.handleDelete}
                onLike={this.handleLike} 
                // prop1 = {this.state.movie._id}
              ></Movie>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={movieCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
