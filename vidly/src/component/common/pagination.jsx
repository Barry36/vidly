import _ from "lodash";
import ProptTypes from "prop-types";
const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) {
    return null;
  }
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: ProptTypes.number.isRequired,
  pageSize: ProptTypes.number.isRequired,
  currentPage: ProptTypes.number.isRequired,
  onPageChange: ProptTypes.func.isRequired,
};
export default Pagination;
