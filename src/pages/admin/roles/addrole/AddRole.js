import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const AddRole = () => {
  const navigate = useNavigate();
  const [roleInput, setRoleInput] = useState({

    name:'',
    error_list: [],

  });

  const handleInput = (e) =>{
    // e.presist();
    setRoleInput({...roleInput, [e.target.name]:e.target.value});
  }

  const roleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name:roleInput.name,
    }
    axios.post(`/api/roles`, data)
    .then((response) => {
      Swal.fire(
        response.data.message,
        'You clicked the button!',
        'success'
      )
      navigate('/admin/dashboard/rolelist')
    }).catch((e)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.response.data.message,

      })
          
  })

  }


  

  return (

    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success">
              <h4>Add Role</h4>
            </div>
            <div className="card-body">
              <form onSubmit={roleSubmit}>
                <div className="form-group mb-3">
                  <label>Role Name</label>
                  <input type="text" name='name' onChange={handleInput} value={roleInput.name}  className='form-control' />
                  <span className='text-danger'>{roleInput.error_list.name}</span>
                </div>
                <div className="form-group mb-3">
                  <button type='submit' className='btn btn-success'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AddRole