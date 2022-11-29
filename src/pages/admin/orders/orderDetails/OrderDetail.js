import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../../../components/shared/loader/Loader';

const OrderDetail = () => {
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        orderDetails();
    }, []);
    const orderDetails = () => {
        const data = {
            order_id: id
        };
        axios.post('/api/orders/details', data).then(res => {
            setOrderDetail(res.data.orderDetails);
            setLoading(true)
            console.log(res.data)
        })

    }
    return (
        <>
            {
                loading ?
                    <div className='container py-5'>
                        <div className='row justify-content-center'>
                            <div className="col-md-8">
                                <div>
                                    <h4 className='text-center'>Order Details</h4>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr className='text-center'>
                                                <th >#</th>
                                                <th>Product title</th>
                                                <th >Price</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {orderDetail.map((product, index) => (
                                                <tr key={product.id} className='text-center' >
                                                    <td>{++index}</td>
                                                    <td >{product.product_name}</td>
                                                    <td>{product.product_price}</td>

                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    : <Loader />
            }
        </>

    )
}

export default OrderDetail