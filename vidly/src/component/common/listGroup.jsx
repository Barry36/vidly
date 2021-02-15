import React from "react";
const ListGroup = (props) => {
  const { items, textProperty, valueProperty } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        // console.log("Hannah", item.name);
        <li key={item[valueProperty]} className="list-group-item">
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
