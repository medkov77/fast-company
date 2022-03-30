import React from "react";

const User = (props) => {
  return (
    <tbody className="mt-2 pt-2">
      <tr scope="col" key={props.key} className="align-middle">
        <td>{props.name}</td>
        <td>
          {props.qualities.map((qualiti) => {
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
        <td>{props.profession.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}/5</td>
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
