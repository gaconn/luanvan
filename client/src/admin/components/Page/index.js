import { useEffect, useState } from "react";
import { Spinner, Pagination } from "react-bootstrap"


const Page = ({page, onClickPage}) => {
    if(!page || !page.now || !page.rowCount) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="grow" />
            </div>
        )
    }
    return (
        <Pagination className="justify-content-center">
            {
                page.now > 2 &&
                <>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item onClick={onClickPage}>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                </>
            }

            {page.prev && <Pagination.Item onClick={onClickPage}>{page.prev}</Pagination.Item>}
            <Pagination.Item active>{page.now}</Pagination.Item>
            {page.next && <Pagination.Item onClick={onClickPage}>{page.next}</Pagination.Item>}

            {
                page.next && page.next*10 < page.rowCount &&
                <>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={onClickPage}>{page.next}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
                </>
            }
        </Pagination>
    )
}

export default Page