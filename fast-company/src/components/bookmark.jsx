import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ bookmark, onToggleBookMark, _id }) => {
    return (
        <td onClick={() => onToggleBookMark(_id)}>
            {bookmark
                ? (<i className="bi bi-arrow-through-heart-fill" />
                )
                : (<i className="bi bi-arrow-through-heart" />
                )}
        </td>
    );
};

BookMark.propTypes = {
    bookmark: PropTypes.bool.isRequired,
    _id: PropTypes.number.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};
export default BookMark;
