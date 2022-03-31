import React from "react";

const Qualiti = (props) => {
    return (
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
    )
};
export default Qualiti;
