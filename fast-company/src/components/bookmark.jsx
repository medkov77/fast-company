import React from "react";

function renderPhrase(n) {
  if (n < 2 || (n >= 5 && n <= 21)) {
    return "человек тусанет";
  }
  if (n > 1 && n < 5) {
    return "человека тусанут";
  }
  let nLast = Number(String(n).slice(-1));
  if (nLast > 1 && nLast < 5) {
    return "человека тусанут";
  }

  return "человек тусанет";
}

const Bookmark = (props) => {
  return props.usersNumber !== 0 ? (
    <h3>
      <span className="mt-2 badge bg-primary">
        {props.usersNumber} {renderPhrase(props.usersNumber)} с тобой сегодня{" "}
      </span>
    </h3>
  ) : (
    <h3>
      <span className="mt-2 badge bg-danger">
        никто не тусанет с тобой сегодня
      </span>
    </h3>
  );
};
export default Bookmark;
