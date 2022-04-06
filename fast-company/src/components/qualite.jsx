import React from "react";
import PropTypes from "prop-types";
const Qualiti = ({ qualities }) => {
    return (
        <td>
            { qualities.map((qualiti) => {
                return (
                    <span
                        className={`m-2 p-2 badge bg-${qualiti.color}`}
                        key={qualiti._id}
                    >
                        {qualiti.name}
                    </span>
                );
            })}
        </td>
    );
};

Qualiti.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default Qualiti;
