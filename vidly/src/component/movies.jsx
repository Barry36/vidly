import _ from "lodash";
import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
class Movies extends Component {
  state = {
    movies: [],
    sortColumn: { path: "title", order: "asc" },
    genres: [],
    currentPage: 1,
    selectedGenre: {},
    pageSize: 4,
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;

    // Filter
    let filteredMovies = [];
    if (Object.keys(selectedGenre).length !== 0 && selectedGenre._id) {
      filteredMovies = allMovies.filter(
        (m) => m.genre._id === selectedGenre._id
      );
    } else {
      filteredMovies = allMovies;
    }

    // Sort

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    // Pagination
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };
  testState = () => {
    console.log(this.state);
  };

  render() {
    const movieCount = this.state.movies.length;
    const { pageSize, currentPage, sortColumn } = this.state;
    if (movieCount === 0) {
      return <p>There are no movies in the database</p>;
    }

    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>There are {totalCount} movies in the database</p>
          <MoviesTable
            sortColumn={sortColumn}
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />

          <button onClick={this.testState}>testState</button>
        </div>
      </div>
    );
  }
}

export default Movies;
