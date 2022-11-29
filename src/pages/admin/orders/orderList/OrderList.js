import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../../../../components/shared/loader/Loader';
import ReactPaginate from 'react-paginate';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    console.log(orders)
    const [loading, setLoading] = useState(false);
    const [pageCount, setpageCount] = useState(0);

    useEffect(() => {
        fetchAllOrders();
    }, []);
    const fetchAllOrders = () => {
        axios.get(`/api/orders?page=1`).then(res => {
            //  console.log(res.data.data)
            setOrders(res.data.data);
            // setOrders(res.data.data);
            const totalData = res.data.total
            setpageCount(Math.ceil(totalData / 2));
            //  setpageCount(totalData);
            setLoading(true);
            // console.log(res.data.total)
        })
    }
    const handlePageClick = (data) => {
        const currentPage = data.selected + 1;
        axios.get(`/api/orders?page=${currentPage}`).then(res => {
            setOrders(res.data.data);
            setLoading(true);
        })

        console.log(currentPage)
    }
    return (

        <>
            {
                loading ?
                    <>
                        <div className='container py-5'>
                            <div className='row justify-content-center'>
                                <div className="col-md-8">
                                    <div>
                                        <h3 className='text-center'>Order Table</h3>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr className='text-center'>
                                                    <th>Date</th>
                                                    <th>User Name</th>
                                                    <th >Details</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {orders.map((user, index) => (
                                                    // <tr key={user.id} className='text-center' >
                                                    <>
                                                        {
                                                            user.orders.map((order, index) => (

                                                                <tr key={user.id} className='text-center' >
                                                                    <td >{order.date}</td>
                                                                    <td >{user.name}</td>
                                                                    <td>
                                                                        <Link className="btn btn-info" to={{ pathname: "/admin/dashboard/order-details/" + order.id }}>Details</Link>
                                                                    </td>

                                                                </tr>

                                                            ))
                                                        }

                                                    </>
                                                ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}

                            />

                        </div>
                    </>
                    : <Loader />


            }

        </>


    )
}

export default OrderList