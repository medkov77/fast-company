import React from "react";
import BookMark from "./bookmark";
import Qualiti from "./qualite";

const User = (props) => {
  return (
    <tbody className="mt-2 pt-2">
      <tr   className="align-middle">
        <td>{props.name}</td>
        <Qualiti  qualities = {props.qualities}/>
        <td>{props.profession.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}/5</td>
        <BookMark  onToggleBookMark = {props.onToggleBookMark} _id = {props._id} bookmark = {props.bookmark}/>
        <td>
          <button
            type="button"
            className="btn btn-danger bg-red"
            onClick={() => props.onDelite(props._id)}
          >
            delite
          </button>
        </td>
      </tr>
    </tbody>
  );
};
export default User;
