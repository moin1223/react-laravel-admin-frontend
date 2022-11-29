import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import Loader from '../../../components/shared/loader/Loader';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [inputarr, setInputarr] = useState([])
  const [inputData, setInputData] = useState({
    title: "",
    price: "",
  })
  const [userData, setUserData] = useState({
    user_id: "",
    date: "",
  })
  const [loading, setLoading] = useState(false);

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    fetchAllUsers();;

  }, []);

  const fetchAllUsers = () => {
    axios.get(`/api/users`).then(res => {
      setUsers(res.data);
      setLoading(true);

    })
  }

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }
  let { title, price } = inputData;
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputarr([...inputarr, { title, price }])
    setInputData({ title: "", price: "" })

  }
  // console.log(inputarr);
  const SubmitAllProduct = () => {
    let orders = {
      "order_items": inputarr,
      "date": userData.date,
      "user_id": userData.user_id,
    };
    axios.post('/api/orders', orders)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: res.data,
          // text: response.data,
      })
      navigate('/admin/dashboard/order-list')
      

      })
    // console.log(orders)
    // console.log('order_items',{"order_items":inputarr});
  }



  return (
    <> {
      loading ?
        <>

          {/* users and date */}
          <div className='container py-2'>
            <div className='row justify-content-center'>
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header bg-success">
                    <h4 className='text-center'>Order Info</h4>

                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label>User</label>
                        <select className="form-select" name='user_id' onChange={handleUserChange}
                          aria-label="Floating label select example">
                          <option value='' selected>Select User</option>
                          {users.map((user, index) => (
                            <option key={index} value={user.id}>{user.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mt-4">
                        <label>Date: </label>
                        <input type="date" onChange={handleUserChange} name="date" className='ms-3' />
                      </div>
                    </form>
                    <div className='mt-5'>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label>Product title</label>
                            <input type="text" name='title' value={inputData.title} onChange={handleChange} className='form-control' />
                          </div>
                        </div>
                        <div className="col-md-6">

                          <div className="form-group mb-3">
                            <label>Price</label>
                            <input type="text" name='price' value={inputData.price} onChange={handleChange} className='form-control' />
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <button type='submit' className='btn btn-success'>Add</button>
                      </div>
                    </form>
                  </div>
                    <div className="form-group mt-3">
                      {/* <button onClick={fetchUserRole} className='btn btn-success'>Search</button> */}
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
           
          {/* table */}
          <div className='container py-5'>
            <div className='row justify-content-center'>
              <div className="col-md-8">
                <div>
                  <h4 className='text-center mb-4'>Product List</h4>
                  <table className="table table-bordered">
                    <thead>
                      <tr className='text-center'>
                        <th >Serial</th>
                        <th>Product title</th>
                        <th >Price</th>
                      </tr>
                    </thead>

                    <tbody>
                      {inputarr.map((product, index) => (
                        <tr key={product.id} className='text-center' >
                          <td>{++index}</td>
                          <td >{product.title}</td>
                          <td>{product.price}</td>

                        </tr>
                      ))
                      }
                    </tbody>
                  </table>
                  <div className="form-group mb-3">
                    <button onClick={SubmitAllProduct} className='btn btn-success'>Place Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <Loader />
    }

    </>
  )
}

export default AddProduct