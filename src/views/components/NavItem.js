import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({link,icon,name}) =>{
    return (
        <li className="nav-item">
            <NavLink  to={link} activeClassName="nav-link active" className="nav-link"> <i className={`nav-icon ${icon}`} /><p>{name}</p></NavLink >
        </li>
    )
}

export default NavItem;