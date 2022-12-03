import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2'

const AssignRole = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState()
  const [role, setRole] = useState()
  const [userRole, setUserRole] = useState()



  useEffect(() => {
    fetchAllUsers();
    fetchAllRoles();
  }, []);

  const fetchAllUsers = () => {
    axios.get(`/api/users`).then(res => {
      // console.log(res.data.users)
      setUsers(res.data.users);

    })
  }
  const fetchAllRoles = () => {
    axios.get(`/api/roles`).then(res => {
      setRoles(res.data);

    })
  }
  const changeUserId = (newUserId) => {
    setUserId(newUserId)
  }
  const changeRole = (newRole) => {
    setRole(newRole)
  }


  //Fetch Assinged Roll
  useEffect(() => {
    fetchUserRole();
  }, [userId]);

  const fetchUserRole = () => {
    const data = {
      user_id: userId,

    }
    axios.post(`api/users/roles/user-role`, data).then(res => {
      setUserRole(res.data.userRole)

    })
  }



  //  AssignRole
  const handleAssignRole = (e) => {
    e.preventDefault();
    const data = {
      user_id: userId,
      role: role,
    }
    console.log(data)

    axios.post('/api/users/roles', data)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          // text: response.data,
      })
        fetchUserRole();
      }).catch((e)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.response.data.message,
  
        })
            
    })

  }

  //remove role
  const deletePermission = (role_id) => {
    const data = {
      user_id: userId,
      role_id: role_id,
    }
    axios.post('/api/users/roles/delete', data)
      .then((response) => {
        fetchUserRole();

      }).catch((e) => {

        // swal("Warning", e.response.data.message);
        // setRoleInput({ ...roleInput, error_list: e.response.data.errors }

        // )

      })

  }



  return (
    <>
      <div className='container py-2'>
        <div className='row justify-content-center'>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-success">
                <h4>User</h4>

              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>User</label>
                    <select className="form-select" onChange={(event) => changeUserId(event.target.value)}
                      aria-label="Floating label select example">
                      <option value='' selected>Select User</option>
                      {users.map((user, index) => (
                        <option key={index} value={user.id}>{user.name}</option>
                      ))}
                    </select>
                  </div>
                </form>
                <div className="form-group mt-3">
                  <button onClick={fetchUserRole} className='btn btn-success'>Search</button>
                </div>
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
                <h4>User Role</h4>

              </div>
              <div className="card-body">
                <div>
                  {userRole && userRole.map((singleRole, index) => (
                    <button type="button" className="btn btn-danger me-2"
                      onClick={() => { deletePermission(singleRole.id) }}
                    >{singleRole.name}</button>

                  ))}
                </div>
                <form onSubmit={handleAssignRole}>
                  <div className="form-group mb-3 mt-5">
                    <label>Roles</label>
                    <select className="form-select" onChange={(event) => changeRole(event.target.value)}
                      aria-label="Floating label select example">
                      <option value='' selected>Select Role</option>
                      {roles.map((role, index) => (
                        <option key={index} value={role.name}>{role.name}</option>
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


  )
}

export default AssignRole