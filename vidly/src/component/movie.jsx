import { Component } from "react";
import Like from "./common/like";
class Movie extends Component {
  render() {
    const { title, genre, numberInStock, dailyRentalRate } = this.props.movie;
    return (
      <tr>
        <td>{title}</td>
        <td>{genre.name}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
        <td>
          <Like
            liked={this.props.movie.liked}
            onClick={() => this.props.onLike(this.props.movie)}
          ></Like>
        </td>
        <td>
          <button
            onClick={() => this.props.onDelete(this.props.movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Movie;
