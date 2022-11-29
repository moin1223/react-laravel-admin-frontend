import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loader from '../../../../components/shared/loader/Loader';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const fetchAllRoles = () => {
    axios.get(`/api/roles`).then(res => {
      setRoles(res.data);
      setLoading(true);

    })
  }
  const deleteRole = (id) => {
    axios.delete('/api/roles/' + id).then(res => {
      Swal.fire(
        res.data,
        'You clicked the button!',
        'success'
      )
      fetchAllRoles();

    })
  }
  return (
    <div className='pt-4'>
      <div>
        <Link className="btn btn-success" to='/admin/dashboard/addrole'>Add Role</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        {
          loading ?
          <tbody>
          {roles.map((role, index) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                <Link className="btn btn-info" to={{ pathname: "/admin/dashboard/editrole/" + role.id }}>Edit</Link>
                <button type="button" className="btn btn-danger"
                  onClick={() => { deleteRole(role.id) }}
                >Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
        : <Loader />
        }
    
      </table>
    </div>
  )
}

export default RoleList