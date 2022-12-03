import './rolelist.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Loader from '../../../../components/shared/loader/Loader';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  console.log(error)

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const fetchAllRoles = () => {
    axios.get(`/api/roles`).then(res => {
      setRoles(res.data);
      setLoading(false);

    })
      .catch((e) => {
        setError(e.response.data.message)
        setLoading(false);
        // navigate('/admin/dashboard/userlist') 

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

  // decide what to render
  let content;

  if (loading) content = <Loader />;
  if (!loading && error)

    content =

      <p className='alert alert-danger text-center mt-5' role="alert">{error}</p>

  if (!error && !loading && roles?.length === 0) {
    content = <p class="alert alert-primary text-center mt-5" role="alert">
      No Role Found!
    </p>;
  }

  if (!error && !loading && roles?.length > 0) {
    content =
        <div className='container py-5'>
          <div className='row justify-content-center'>
            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
              <div className='mb-4'>
                <Link className="btn btn-outline-primary" to='/admin/dashboard/addrole'>Add Role</Link>
              </div>
              <table className="table table-bordered table-striped table-hover table-info">
                <thead className='table-dark'>
                  <tr className='text-center'>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {roles.map((role, index) => (
                    <tr className='text-center' key={role.id}>
                      <td>{role.name}</td>
                      <td>

                        <Link className="me-3" to={{ pathname: "/admin/dashboard/editrole/" + role.id }}><MdModeEditOutline /></Link>
                        <a className='delete'
                          onClick={() => { deleteRole(role.id) }}
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

export default RoleList