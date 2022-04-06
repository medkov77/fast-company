import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import Qualiti from "./qualite";

const User = ({ name, qualities, profession, completedMeetings, rate, onToggleBookMark, _id, bookmark, onDelite }) => {
    return (
        <tbody className="mt-2 pt-2">
            <tr className="align-middle">
                <td>{name}</td>
                <Qualiti qualities={qualities} />
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}/5</td>
                <BookMark
                    onToggleBookMark={onToggleBookMark}
                    _id={_id}
                    bookmark={bookmark}
                />
                <td>
                    <button
                        type="button"
                        className="btn btn-danger bg-red"
                        onClick={() => onDelite(_id)}
                    >
                        delite
                    </button>
                </td>
            </tr>
        </tbody>
    );
};
User.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    _id: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDelite: PropTypes.func.isRequired
};
export default User;
