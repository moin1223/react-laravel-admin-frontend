import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import secureLocalStorage from "react-secure-storage";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/admin/dashboard/Dashboard'
import axios from 'axios';
import Page403 from './pages/errors/Page403';
import Page404 from './pages/errors/Page404';
import AddUsers from './pages/admin/users/adduser/AddUser'
import UserList from './pages/admin/users/userlist/UserList'
import EditUser from './pages/admin/users/edituser/EditUser'
import UserDetails from './pages/admin/users/userdetails/UserDetails';
import Layout from './components/layout/Layout';
import RequireAuth from './components/RequireAuth';
import UserHome from './pages/user/UserHome';
import Unauthorized from './pages/errors/Unauthorized';
import RoleList from './pages/admin/roles/rolelist/RoleList'
import PermissionList from './pages/admin/permissions/permissionlist/PermissionList'
import AddRole from './pages/admin/roles/addrole/AddRole';
import AddPermission from './pages/admin/permissions/addpermission/AddPermission';
import EditRole from './pages/admin/roles/editrole/EditRole';
import EditPermission from './pages/admin/permissions/editpermission/EditPermission';
import AssignRole from './pages/admin/assignRole/AssignRole';
import UserProfile from './pages/user/userProfile/UserProfile';
import AddProduct from './pages/admin/produts/AddProduct';
import OrderList from './pages/admin/orders/orderList/OrderList';
import OrderDetail from './pages/admin/orders/orderDetails/OrderDetail';



const App = () => {

  axios.defaults.baseURL = "http://localhost:8000/";
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Accept'] = 'application/json';
  axios.defaults.withCredentials = false;
  axios.interceptors.request.use(function (config) {
    const token = secureLocalStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });


  const ROLES = {
    'User': 2,
    'Admin': 1
  }
  return (
    <>

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/unauthorized" element={<Unauthorized />} />


          {/* protect routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/user" element={<UserHome />} />
          </Route>


          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin/dashboard/*" element={<Dashboard />}>
              {/* users crud */}
              <Route path="userlist" element={<UserList />} />
              <Route path="adduser" element={<AddUsers />} />
              <Route path="userdetails/:id" element={<UserDetails />} />
              <Route path="edituser/:id" element={<EditUser />} />
              {/* roles*/}
              <Route path="rolelist" element={<RoleList />} />
              <Route path="addrole" element={<AddRole />} />
              <Route path="editrole/:id" element={<EditRole />} />
              {/* permission  */}
              <Route path="permissionlist" element={<PermissionList />} />
              <Route path="addpermission" element={<AddPermission />} />
              <Route path="editpermission/:id" element={<EditPermission />} />
              {/* assignRole */}
              <Route path="assignrole" element={<AssignRole />} />
              {/* userProfile */}
              <Route path="user-profile" element={<UserProfile />} />
              {/* products */}
              <Route path="add-product" element={<AddProduct />} />
              {/* orders */}
              <Route path="order-list" element={<OrderList />} />
              <Route path="order-details/:id" element={<OrderDetail />} />
            </Route>
          </Route>

        </Route>
      </Routes>
    </>
  )
}

export default App