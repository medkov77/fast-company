import React from "react";



const BookMark = (props) => {
 // console.log(props);
  return (
    <td
    onClick = { ()=> props.onToggleBookMark(props._id)}>
     {props.bookmark? <i className="bi bi-bookmark-fill"  ></i> : <i className="bi bi-bookmark"></i>}
    </td>
  )
}
export default BookMark;
