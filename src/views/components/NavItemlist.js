import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavItemList = ({icon,name,links}) =>{
  
    const [menu,setMenu] = useState(false);
    
    const ftn_open = () => {
      setMenu(!menu);
    }

    return (
        <li className="nav-item">
          <a href="!#" className={`nav-link ${ menu && 'active' }`}  onClick={ftn_open}>
          <i className={`nav-icon ${icon}`}/>
            <p>
              {name}
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          <ul className="nav nav-treeview">
              {
                  links && links.map(({link,name},index) => {
                      return (
                        <li className="nav-item" key={index} >
                            <NavLink to={link} className="nav-link" activeClassName="nav-link active"  name=""> <i className="far fa-circle nav-icon" /> <p>{name}</p> </NavLink>
                        </li>
                      )
                  })
              }
          </ul>
        </li>
    )
}

export default NavItemList;