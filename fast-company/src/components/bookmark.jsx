import React from "react";



const BookMark = (props) => {
 // console.log(props);
  return (
    <td
    onClick = { ()=> props.onToggleBookMark(props._id)}>
     {props.bookmark? <i class="bi bi-arrow-through-heart-fill"/> : <i class="bi bi-arrow-through-heart"/>}
    </td>
  )
}
export default BookMark;
