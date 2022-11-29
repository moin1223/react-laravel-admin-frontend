import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const AddPermission = () => {
  const navigate = useNavigate();
  const [permissionInput, setPermissionInput] = useState({

    name: '',
    error_list: [],

  });

  const handleInput = (e) => {
    setPermissionInput({ ...permissionInput, [e.target.name]: e.target.value });
  }

  const permissionSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: permissionInput.name,
    }
    axios.post(`/api/permissions`, data)
      .then((response) => {
        Swal.fire(
          response.data.message,
          'You clicked the button!',
          'success'
        )
        navigate('/admin/dashboard/permissionlist')
      }).catch((e) => {
        setPermissionInput({ ...permissionInput, error_list: e.response.data.errors }
        )

      })

  }

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success">
              <h4>Add Permission</h4>
            </div>
            <div className="card-body">
              <form onSubmit={permissionSubmit}>
                <div className="form-group mb-3">
                  <label>Permission Name</label>
                  <input type="text" name='name' onChange={handleInput} value={permissionInput.name} className='form-control' />
                  <span className='text-danger'>{permissionInput.error_list.name}</span>
                </div>
                <div className="form-group mb-3">
                  <button type='submit' className='btn btn-success'>Crate</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AddPermission;