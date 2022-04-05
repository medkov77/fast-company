import React from "react";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageSize } = props;
  const pageCount = Math.cell(itemsCount / pageSize);
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link">1</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
