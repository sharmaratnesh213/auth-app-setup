import React from 'react';
import "./tableNav.scss"

const TableNav = ({ totalPages, currentPage, onPageChange }) => {
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    const visiblePageIndices = [];
    let startPage = currentPage - 1;

    if (startPage < 1) {
        startPage = 1;
    } else if (startPage > totalPages - 2) {
        startPage = totalPages - 2;
    }

    for (let i = startPage; i <= startPage + 2 && i <= totalPages; i++) {
        visiblePageIndices.push(i);
    }

    return (
        <div className="tableNav">
            <button onClick={() => handlePageChange(currentPage - 1)}>
                {'<<'}
            </button>
            <div className="pageNumbers">
                {visiblePageIndices.map((pageIndex) => (
                    <span
                        key={pageIndex}
                        className={`page-index ${currentPage === pageIndex ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageIndex)}
                    >
                        {pageIndex}
                    </span>
                ))}
            </div>
            <button onClick={() => handlePageChange(currentPage + 1)}>
                {'>>'}
            </button>
        </div>
    );
};

export default TableNav;
