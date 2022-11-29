import { useState } from "react"
import { Link } from "react-router-dom"
import './sidebarItem.css'
const SidebarItem = ({item}) => {
    const [open, setOpen] = useState(false)
    if(item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        { item.icon && <i className={item.icon}></i> }
                        {item.title}    
                    </span> 
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="sidebar-content">
                    { item.childrens.map((child, index) => <SidebarItem key={index} item={child} />) }
                </div>
            </div>
        )
    }else{
        return (
            <Link to={item.path || "#"} className="sidebar-item plain">
                { item.icon && <i className={item.icon}></i> }
                {item.title}
            </Link>
        )
    }
}

export default SidebarItem
  {/* <ul className='navbar-nav text-light'>
         <li className="nav-item dropdown ms-4 mt-5">
             <a className="nav-link dropdown-toggle d-flex align-items-center ms-3" href="#" role="button" data-bs-toggle="dropdown">
                 <span className="p-2 me-2 user-icon"><FiUsers /></span>
                 <span className='me-2'>Users</span>
             </a>
             <ul className="dropdown-menu">
             <Link className="nav-link" to="adduser">Add User</Link>
             <Link className="nav-link" to="userlist">User List</Link>
             </ul>
         </li>

         <li className="nav-item ps-5 ">

             <Link className="nav-link" to="rolelist">Roles</Link>
             <Link className="nav-link" to="permissionlist">Permissions</Link>
             <Link className="nav-link" to="assignrole">Assign Role</Link>
             <Link className="nav-link" to="add-product">Add Product</Link>
             <Link className="nav-link" to="order-list">Orders</Link>
         </li>
     </ul> */}