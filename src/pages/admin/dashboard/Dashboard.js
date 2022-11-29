import React from 'react'
import './dashboard.css'
import { Outlet } from 'react-router-dom'
import AdminNav from '../../../components/shared/navbar/adminnav/AdminNav'
import Sidebar from '../../../components/shared/sidebar/sidebar/Sidebar'
const Dashboard = () => {

  return (

    <>
      <AdminNav />
      <div className="row">
        <div className="col-md-2 bg-dark text-light height">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>

    </>


  )
}

export default Dashboard