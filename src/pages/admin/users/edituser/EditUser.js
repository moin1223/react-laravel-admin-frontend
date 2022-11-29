import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loader from '../../../../components/shared/loader/Loader';



const EditUser = () => {
  const {id} = useParams();
  console.log(id)
  const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({

    name:'',
    password:'',
    error_list: [],

  });
  const [loading,setLoading] = useState(false);

  useEffect(() => {

    axios.get('/api/users/'+id+'/edit').then(res => {
      console.log(res.data.name)
      setRegisterInput({
        name:res.data.name,
        email:res.data.email,
    });
    setLoading(true);
     
    })
  },[]);

  const handleInput = (e) =>{
    setRegisterInput({...registerInput, [e.target.name]:e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name:registerInput.name,
      email:registerInput.email,
    }
    axios.put('/api/users/'+id, data)
    .then((response) => {
      Swal.fire(
        response.data,
        'You clicked the button!',
        'success'
      )
      navigate('/admin/dashboard/userlist')
    }).catch((e)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.response.data.message,
      })
      setRegisterInput({...registerInput, error_list:e.response.data.errors}
            )
          
  })

  }

  return (
    <>
    {

loading ?  
<div className='container py-5'>
<div className='row justify-content-center'>
  <div className="col-md-6">
    <div className="card">
      <div className="card-header bg-success">
        <h4>Add User</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Full Name</label>
            <input type="text" name='name' onChange={handleInput} value={registerInput.name}  className='form-control' />
            {/* <span className='text-danger'>{registerInput.error_list.name}</span> */}
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input type="email" name='email' onChange={handleInput} value={registerInput.email}  className='form-control'/>
            {/* <span className='text-danger'>{registerInput.error_list.email}</span> */}
          </div>
          <div className="form-group mb-3">
            <button type='submit' className='btn btn-success'>Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</div>
</div>
:
<Loader />
    }
    </>
    
   
  )
}

export default EditUser