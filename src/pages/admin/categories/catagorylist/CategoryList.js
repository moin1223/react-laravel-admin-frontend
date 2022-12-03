import React from 'react'
import './categorylist.css'
import { useGetCategoriesQuery } from '../../../../features/api/apiSlice'
import Loader from '../../../../components/shared/loader/Loader'
import { MdRemoveRedEye, MdDelete, MdModeEditOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const CategoryList = () => {
  const { data: categories, isLoading, isError, error} = useGetCategoriesQuery()
// decide what to render
let content;

if (isLoading) content = <Loader />;
if (!isLoading && isError)

  content =

    <p className='alert alert-danger text-center mt-5' role="alert">{error}</p>

if (!isError && !isLoading &&  categories?.length === 0) {
  content = <p class="alert alert-primary text-center mt-5" role="alert">
    No Role Found!
  </p>;
}

if (!isError && !isLoading &&  categories?.length > 0) {
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
                { categories.map((category, index) => (
                  <tr className='text-center' key={category.id}>
                    <td>{category.category_name}</td>
                    <td>
                    <Link className='view me-3' to={{ pathname: `/admin/dashboard/category-details/${category.id}`}}><MdRemoveRedEye /></Link>
                      <Link className="me-3" to={{ pathname: "/admin/dashboard/editrole/" + category.id }}><MdModeEditOutline /></Link>
                      <a className='delete'
                        // onClick={() => { deleteRole(category.id) }}
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
  
      content
  
)
}

export default CategoryList