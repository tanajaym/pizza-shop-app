import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   onChangePage,
                                               }) => {
    return (
        <div className={styles.root}>
            <ReactPaginate
                className={styles.paginationLinks}
                breakLabel="..."
                nextLabel="→"
                previousLabel="←"
                onPageChange={(page) => onChangePage(page.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
                renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Pagination;
