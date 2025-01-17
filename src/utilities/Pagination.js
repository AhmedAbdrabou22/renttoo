import React from 'react'
import ReactPaginate from "react-paginate";
const Pagination = ({onPress , countsPage}) => {


    const handlePageClick = (data) => {

        onPress(data.selected + 1)
    };
    return (
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="التالى"
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                pageCount={countsPage}
                previousLabel="السابق"
                containerClassName={"pagination justify-content-center p-3"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    )
}

export default Pagination