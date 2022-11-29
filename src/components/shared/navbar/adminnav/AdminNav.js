import axios from 'axios'
import './adminnav.css'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import secureLocalStorage from "react-secure-storage";
import User from '../../../../assets/images/user.jpg'
import { IoMdNotifications } from 'react-icons/io';
import { RiMessage2Line } from 'react-icons/ri';
import { MdOutlineWindow } from 'react-icons/md';


const AdminNav = () => {
    const user = secureLocalStorage.getItem("user");
    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 'success') {
                secureLocalStorage.removeItem('token');
                secureLocalStorage.removeItem('auth');
                Swal.fire(
                    res.data.message,
                    'You clicked the button!',
                    'success'
                )
                navigate('/');
            }
        });

    }

    return (
        <>

            <nav className=" row navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="col-md-4 text-primary">
                    <a className="navbar-brand ps-4" href="#">Logo</a>
                </div>

                <div className="col-md-4 text-primary">
                    <form className="d-flex">
                        <input className="form-control me-2" type="text" placeholder="Search" />
                        {/* <button className="btn btn-primary" type="button">Search</button> */}
                    </form>
                </div>

                <div className="col-md-4 text-primary">
                    <ul className="navbar-nav justify-content-between ms-5">
                        <li className=' nav-icon d-flex align-items-center ms-4'>
                            <div className='me-4'><MdOutlineWindow /></div>
                            <div className='position-relative me-4'><RiMessage2Line />
                                <span className="message-icon position-absolute top-0 start-100 translate-middle rounded-circle">
                                    <span className="visually-hidden">New alerts</span>
                                </span>
                            </div>
                            <div className='position-relative'><IoMdNotifications />
                                <span className="notification-icon position-absolute top-0 start-100 translate-middle rounded-circle">
                                    <span className="visually-hidden">New alerts</span>
                                </span>
                            </div>
                        </li>
                        <li className="nav-item dropdown  pe-4">
                            <a className="nav-link dropdown-toggle d-flex align-items-center ms-3" href="#" role="button" data-bs-toggle="dropdown">
                                <img src={User} alt="User" className="rounded-pill me-3" style={{ width: '40px', height: "40px" }} />
                                <span className='me-1'>{user.name}</span>
                            </a>
                            <ul className="dropdown-menu">
                                <Link className="dropdown-item" to="user-profile">Profile</Link>
                                <li>
                                    <button onClick={logoutSubmit} type='button' className='btn btn-danger btn-sm dropdown-item'>Logout</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </nav>
        </>
    )
}

export default AdminNav;