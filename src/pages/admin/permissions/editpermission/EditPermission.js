import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../../components/shared/loader/Loader';
import Swal from 'sweetalert2'


const EditPermission = () => {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate();
    const [permissionInput, setPermissionInput] = useState({

        name: '',
        error_list: [],

    });

    useEffect(() => {

        axios.get('/api/permissions/' + id + '/edit').then(res => {
            console.log(res.data.name)
            setPermissionInput({
                name: res.data.name,
            });
            setLoading(true);

        })
    }, []);


    const handleInput = (e) => {
        // e.presist();
        setPermissionInput({ ...permissionInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: permissionInput.name,
        }
        // axios.put('/api/permissions/' + id, data)
        axios.put(`/api/permissions/${id}`, data)
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: response.data,
                    // text: response.data,
                })
                // Swal.fire(
                //     response.data
                //     // 'You clicked the button!',
                //     // 'success'
                // )
                navigate('/admin/dashboard/permissionlist')
            }).catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.response.data.message,
                })
                // setPermissionInput({ ...permissionInput, error_list: e.response}
                // )

            })

    }

    return (
        <>
            {
                loading ?
                    <div className='container py-5'>
                        <div className='row justify-content-center'>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header bg-success">
                                        <h4>Edit Permission</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group mb-3">
                                                <label>Name</label>
                                                <input type="text" name='name' onChange={handleInput} value={permissionInput.name} className='form-control' />
                                                {/* <span className='text-danger'>{permissionInput.error_list.name}</span> */}
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
                    : <Loader />
            }
        </>
    )
}

export default EditPermission;