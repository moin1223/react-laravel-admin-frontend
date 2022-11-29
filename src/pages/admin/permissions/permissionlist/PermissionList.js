import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../../../../components/shared/loader/Loader';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissions } from "../../../../features/permissions/permissionsSlice";

const PermissionList = () => {


  const dispatch = useDispatch();
  const { permissions, isLoading, isError, error } = useSelector(
      (state) => state.permissions
  );

  useEffect(() => {
      dispatch(fetchPermissions());
  }, [dispatch]);

   // decide what to render
   let content;

   if (isLoading) content = <Loader />;
   if (!isLoading && isError)

      content = <div class="alert alert-danger" role="alert">
   {error}
    </div>

   if (!isError && !isLoading &&  permissions?.length === 0) {
       content = <div class="alert alert-primary" role="alert">
        No Permission Found!
     </div>;
   }

   if (!isError && !isLoading && permissions?.length > 0) {
       content = permissions.map((permission, index) => (
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
 
   }







  // const [permissions, setPermissions] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    fetchAllPermissions();
  }, []);

  const fetchAllPermissions = () => {
    axios.get(`/api/permissions`).then(res => {
      // setPermissions(res.data);
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
    {content}
          
        </tbody>
      </table>
    </div>
  )
}

export default PermissionList;