import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import  secureLocalStorage  from  "react-secure-storage";


const Navbar = () => {
    const navigate = useNavigate();
        const logoutSubmit = (e) => {
            e.preventDefault();
            
            axios.post(`/api/logout`).then(res => {
                if(res.data.status === 'success')
                {
                    secureLocalStorage.removeItem('token');
                    swal("Success",res.data.message,"success");
                    navigate('/');
                }
            });
    
        }
    

    var AuthButtons = '';
    if (!secureLocalStorage.getItem('token')) {
        AuthButtons = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>

        )
    }
    else {
        AuthButtons = (
                <li className="nav-item">
                    <button onClick={logoutSubmit} type='button' className='btn btn-danger btn-sm'>Logout</button>
                </li>

            

        )

    }
    return (
        <>

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li> */}
                
                {
                    AuthButtons
                }
                </ul>

            </nav>
        </>
    )
}

export default Navbar