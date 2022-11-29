import React from 'react'
import { Link } from 'react-router-dom'



const Navbar = () => {

    return (
        <>

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>

                </ul>

            </nav>
            <div>
                <h1 className='text-center'>Home Page</h1>
            </div>
        </>
    )
}

export default Navbar