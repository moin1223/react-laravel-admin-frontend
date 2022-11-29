import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../../../../components/shared/loader/Loader';
import Swal from 'sweetalert2'

const PermissionList = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    fetchAllPermissions();
  }, []);

  const fetchAllPermissions = () => {
    axios.get(`/api/permissions`).then(res => {
      setPermissions(res.data);
      setLoading(true)
      

    })
  }
  const deletePermission = (id) => {
    axios.delete('/api/permissions/' + id).then(res => {
      Swal.fire(
        res.data,
        'You clicked the button!',
        'success'
      )
      fetchAllPermissions();


    })
  }
  return (
    <div className='pt-4'>
      <div>
        <Link className="btn btn-success" to='/admin/dashboard/addpermission'>Add Permission</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { loading ? permissions.map((permission, index) => (
            <tr key={permission.id}>
              <td>{permission.name}</td>
              <td>
                <Link className="btn btn-info" to={{ pathname: "/admin/dashboard/editpermission/" + permission.id }}>Edit</Link>
                <button type="button" className="btn btn-danger"
                  onClick={() => { deletePermission(permission.id) }}
                >Delete</button>

              </td>
            </tr>
          ))
          : <Loader />
        }
          
        </tbody>
      </table>
    </div>
  )
}

export default PermissionList;