import React from 'react';
import NavItem from '../views/components/NavItem';
import NavItemList from '../views/components/NavItemlist';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Itemlist = [
  { name:"Control de viajes", icon:"fas fa-bus", 
    links: [
      {link:"/rutas",name:"Crear rutas"},  
      {link:"/viajes",name:"Crear viajes"},
      ]
  },
  { name:"Gestión", icon:"fas fa-users-cog", 
    links: [  
      {name:"Camiones", link:"/camiones"},
      {name:"Conductores", link:"/conductores"},
      ]
  }
]

const Item = [
  {name:"Alineación", icon:"fas fa-border-all", link:"/transporte"},
  {link:"/control-viajes",name:"Control viajes", icon: "fas fa-route"},
  {name:"Lista de viajes App", icon:"fas fa-road", link:"/viajes_lista"},
]

const Sidebar = () =>{
  const username = useSelector(store => store.login.username)
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <Link to="/" className="brand-link">
    <img src="dist/img/text.png" alt="" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">TRANSPORTE</span>
  </Link>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/avatar5.png" className="img-circle elevation-2" alt="" />
      </div>
      <div className="info">
        <Link to="#" className="d-block">{username}</Link >
      </div>
    </div>
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column nav-flat" data-widget="treeview" role="menu" data-accordion="false">
      <li className="nav-header">SERVICIOS</li>
        {
          Item && Item.map(({name, icon, link},index)=>(
            <NavItem  key={index} name={name} icon={icon} link={link}/>
          ))
        }
        {
          Itemlist && Itemlist.map(({name, icon, links},index)=>(
            <NavItemList key={index} name={name} icon={icon}  links={links}/>
          ))
        }
       

      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
</aside>

    )
}

export default Sidebar;
