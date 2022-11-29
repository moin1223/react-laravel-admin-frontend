import React from 'react'
import { Link } from 'react-router-dom'
import { FiUsers } from 'react-icons/fi';
import './sidebar.css'
import items from '../SidebarConfig.json'
import SidebarItem from '../sidebarItem/SidebarItem';

const Sidebar = () => {
    return (
        <div className="sidebar">
        { items.map((item, index) => <SidebarItem key={index} item={item} />) }
  
  </div>
       
    )
}

export default Sidebar