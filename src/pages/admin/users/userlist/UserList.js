import React from 'react'
import './userlist.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import Loader from '../../../../components/shared/loader/Loader'
import { MdRemoveRedEye, MdDelete, MdModeEditOutline } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
// import Pagination from '../../../../components/shared/pagination/Pagination';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setpageCount] = useState(0);


  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    axios.get(`/api/users?page=1`).then(res => {
      // console.log(res.data.paginateUsers.total)
      const totalData = res.data.paginateUsers.total
      setpageCount(Math.ceil(totalData / 5));
      setUsers(res.data.paginateUsers.data);
      setLoading(true);
    })
  }
  const handlePageClick = (data) => {
    const currentPage = data.selected + 1;
    axios.get(`/api/users?page=${currentPage}`).then(res => {
      setUsers(res.data.paginateUsers.data);
      console.log(res.data)
      setLoading(true);
    })

    console.log(currentPage)
  }

  const deleteUser = (id) => {
    axios.delete('/api/users/' + id).then(res => {
      console.log(res.data)
      Swal.fire(
        res.data.message,
        'You clicked the button!',
        'success'
      )
      fetchAllUsers();

    }).catch((e) => {

      Swal.fire({
        title: 'Forbidden',
        text: e.response.data.message,
        icon: 'warning',
      })
    })
  }



  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
          <div className='mb-4'>
            <Link className="btn btn-outline-primary" to='/admin/dashboard/adduser'>Add User</Link>
          </div>
          <table className="table table-bordered table-striped table-hover table-info">
            <thead className='table-dark'>
              <tr className='text-center'>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? users.map((user, index) => (
                <tr className='text-center' key={user.id}>
                  <td>{++index}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>

                    <Link className='view me-3' to={{ pathname: "/admin/dashboard/userdetails/" + user.id }}><MdRemoveRedEye /></Link>
                    <Link className='edit me-3' to={{ pathname: "/admin/dashboard/edituser/" + user.id }}><MdModeEditOutline /></Link>
                    <a className='delete'
                      onClick={() => { deleteUser(user.id) }}
                    ><MdDelete /></a>

                  </td>
                </tr>
              )) : <Loader />
              }
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}

          />
          {/* <Pagination pageCount={pageCount} /> */}

        </div>
      </div>
    </div>

  )
}

export default UserList