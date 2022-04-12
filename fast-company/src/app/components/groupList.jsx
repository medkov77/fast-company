import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items }) => {
    console.log(items);
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                <li className="list-group-item" key={items[item]._id}>
                    {items[item].name}
                </li>
            ))}
        </ul>
    );
};
GroupList.propTypes = {
    items: PropTypes.object.isRequired
};

export default GroupList;
