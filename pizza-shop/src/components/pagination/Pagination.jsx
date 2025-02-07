import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

const Pagination = ({ onChangePage }) => {
  return (
    <div className={styles.root}>
      <ReactPaginate
        className={styles.paginationLinks}
        breakLabel="..."
        nextLabel="→"
        previousLabel="←"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
