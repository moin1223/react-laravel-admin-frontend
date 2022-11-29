import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loader from '../../../../components/shared/loader/Loader';


const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [permissions, setPermissions] = useState([]);
  const [roleInput, setRoleInput] = useState({

    name: '',
    error_list: [],

  });
  const [permission, setPermission] = useState()
  const [rolePermissions, setRolePermissions] = useState()


  useEffect(() => {

    axios.get('/api/roles/' + id + '/edit').then(res => {

      setRoleInput({
        name: res.data.role.name,
      });
      setPermissions(res.data.permissions)
    

    })
  }, []);

  const handleInput = (e) => {
    setRoleInput({ ...roleInput, [e.target.name]: e.target.value });
  }
  const changePermission = (newPermission) => {
    setPermission(newPermission)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: roleInput.name,
    }
    axios.put('/api/roles/' + id, data)
      .then((response) => {
        Swal.fire(
          response.data,
          'You clicked the button!',
          'success'
        )
        navigate('/admin/dashboard/rolelist')
      }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.response.data.message,
      })
        setRoleInput({ ...roleInput, error_list: e.response.data.errors }
        )

      })

  }

  const fetchAllPermissions = () => {
    axios.get('/api/roles/' + id + '/edit').then(res => {
      setRoleInput({
        name: res.data.role.name,
      });
      setRolePermissions(res.data.rolePermissions)
      setLoading(true);
    })
  }

  useEffect(() => {
    fetchAllPermissions();
  }, []);


  //  AssignPermission
  const handleAssignPermission = (e) => {
    e.preventDefault();
    const data = {
      role_id: id,
      permission: permission,
    }


    axios.post('/api/roles/permissions', data)
      .then((response) => {
        if(response.data.status == 200){
          Swal.fire(
            response.data.message,
            'You clicked the button!',
            'success'
          )
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:response.data.message,
        })
        }
      
        fetchAllPermissions()
      }).catch((e) => {

        // swal("Warning", e.response.data.message);
        setRoleInput({ ...roleInput, error_list: e.response.data.errors }

        )

      })

  }

  //delete permission
  const deletePermission = (permission_id) => {
    const data = {
      role_id: id,
      permission_id: permission_id,
    }
    console.log(data)
    data &&
      axios.post('/api/roles/permissions/delete', data)
        .then((response) => {
          fetchAllPermissions()
          Swal.fire(
            response.data.message,
            'You clicked the button!',
            'success'
          )

        }).catch((e) => {

          // swal("Warning", e.response.data.message);
          setRoleInput({ ...roleInput, error_list: e.response}

          )

        })

  }



  return (
    <>
      {
        loading ?
          <>
            <div className='container py-4'>
              <div className='row justify-content-center'>
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header bg-success">
                      <h4>Edit Role</h4>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <label>Name</label>
                          <input type="text" name='name' onChange={handleInput} value={roleInput.name} className='form-control' required  />
                          {/* <span className='text-danger'>{registerInput.error_list.name}</span> */}
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

            <div className='container py-1'>
              <div className='row justify-content-center'>
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header bg-success">
                      <h4>Role Permission</h4>

                    </div>
                    <div className="card-body">
                      <div>
                        {rolePermissions && rolePermissions.map((singlePermission, index) => (
                          <button type="button" className="btn btn-danger me-2"
                            onClick={() => { deletePermission(singlePermission.id) }}
                          >{singlePermission.name}</button>

                        ))}
                      </div>
                      <form onSubmit={handleAssignPermission}>
                        <div className="form-group mb-3 mt-5">
                          <label>permission</label>
                          {/* <input type="text" name='name' onChange={handleInput} value={roleInput.name} className='form-control' /> */}
                          {/* <span className='text-danger'>{registerInput.error_list.name}</span> */}
                          <select class="form-select" onChange={(event) => changePermission(event.target.value)}
                            value={permission} id="floatingSelect" aria-label="Floating label select example">
                            <option value='' selected>Select Permission</option>
                            {permissions.map((permission, index) => (
                              <option value={permission.name}>{permission.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <button type='submit' className='btn btn-success'>Assign</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </>
          : <Loader />

      }

    </>




  )
}

export default EditRole;