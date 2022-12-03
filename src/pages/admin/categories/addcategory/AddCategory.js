import React from 'react'
import { useState } from 'react';
import { useAddCategoryMutation } from '../../../../features/api/apiSlice';

const AddCategory = () => {
  const [addCategory, { isLoading, isSuccess, isError }] = useAddCategoryMutation();
  // console(isSuccess)

  const [title, setTitle] = useState("");


  const categorySubmit = (e) =>{
    e.preventDefault();
    addCategory({
      title:title,
    })
    resetForm();
  }
  const resetForm = () => {
    setTitle("");
  }
  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success">
              <h4>Add Category</h4>
            </div>
            <div className="card-body">
              <form onSubmit={categorySubmit}>
                <div className="form-group mb-3">
                  <label>Category Name</label>
                  <input type="text" value={title}  onChange={(e) => setTitle(e.target.value)}  className='form-control' />
                </div>
                <div className="form-group mb-3">
                  <button type='submit' className='btn btn-success'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AddCategory