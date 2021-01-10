import React from "react";
import Pagination from "react-js-pagination";

function Paginations(props) {
    return (
        <Pagination
            firstPageText={<i className="fas fa-angle-double-left fa-sm" />}
            lastPageText={<i className="fas fa-angle-double-right fa-sm" />}
            prevPageText={<i className="fas fa-angle-left fa-sm" />}
            nextPageText={<i className="fas fa-angle-right fa-sm" />}
            activePage={props.activePage}
            itemsCountPerPage={10}
            totalItemsCount={props.totalItemsCount}
            pageRangeDisplayed={5}
            onChange={props.onChange.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
        />
    );
}

export default Paginations;
