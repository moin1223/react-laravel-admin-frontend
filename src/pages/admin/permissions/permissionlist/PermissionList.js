import './permissionlist.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loader from '../../../../components/shared/loader/Loader';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

const PermissionList = () => {
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  console.log(error)

  useEffect(() => {
    fetchAllPermissions();
  }, []);

  const fetchAllPermissions = () => {
    axios.get(`/api/permissions`).then(res => {
      setPermissions(res.data);
      setLoading(false);

    })
      .catch((e) => {
        setError(e.response.data.message)
        setLoading(false);
        // navigate('/admin/dashboard/userlist') 

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

  // decide what to render
  let content;

  if (loading) content = <Loader />;
  if (!loading && error)

    content =

      <p className='alert alert-danger text-center mt-5' role="alert">{error}</p>

  if (!error && !loading && permissions?.length === 0) {
    content = <p class="alert alert-primary text-center mt-5" role="alert">
      No Permission Found!
    </p>;
  }

  if (!error && !loading && permissions?.length > 0) {
    content =
        <div className='container py-5'>
          <div className='row justify-content-center'>
            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
              <div className='mb-4'>
                <Link className="btn btn-outline-primary" to='/admin/dashboard/addpermission'>Add Permission</Link>
              </div>
              <table className="table table-bordered table-striped table-hover table-info">
                <thead className='table-dark'>
                  <tr className='text-center'>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {permissions.map((permission, index) => (
                    <tr className='text-center' key={permission.id}>
                      <td>{permission.name}</td>
                      <td>

                        <Link className="me-3" to={{ pathname: "/admin/dashboard/editpermission/" + permission.id }}><MdModeEditOutline /></Link>
                        <a className='delete'
                          onClick={() => { deletePermission(permission.id) }}
                        ><MdDelete /></a>

                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
  }

  return (
    <>
      {
        content
      }
    </>
  )
}

export default PermissionList