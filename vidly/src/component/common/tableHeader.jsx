import React, { Component } from "react";

/**
 * Interface of this component
 *  columns: array
 *  sortColumn: object
 *  onSort: function
 */
class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      // if path is different, we update the path
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.handleSort(sortColumn);
  };

  renderSortIcon = (col) => {
    const { sortColumn } = this.props;
    if (col.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc" />;
    }

    return <i className="fa fa-sort-desc" />;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              className="clickable"
              key={col.path || col.key}
              onClick={() => this.raiseSort(col.path)}
            >
              {col.label} {this.renderSortIcon(col)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
