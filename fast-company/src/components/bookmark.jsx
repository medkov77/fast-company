import React from "react";

const BookMark = (props) => {
  return (
    <td onClick={() => props.onToggleBookMark(props._id)}>
      {props.bookmark ? (
        <i className="bi bi-arrow-through-heart-fill" />
      ) : (
        <i className="bi bi-arrow-through-heart" />
      )}
    </td>
  );
};
export default BookMark;
