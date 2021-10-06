import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../redux/reducerLogin/login';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const Navbar = () => {
    
    const dispatch = useDispatch();

    const handleSubmit = () => {
        Swal.fire({
            title: '¿Quieres cerrar la session?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(logout());
            }
        });
    }

    return (
        < nav className = "main-header navbar navbar-expand navbar-white navbar-light" >
            {/* Left navbar links */ }
            < ul className = "navbar-nav" >
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" to="#" role="button"><i className="fas fa-bars" /></Link>
                </li>
               
            </ul >
            {/* Right navbar links */ }
            < ul className = "navbar-nav ml-auto" >
                <li className="nav-item" onClick={handleSubmit}>
                    <button className="btn">Salir <i className="fas fa-sign-out-alt" style={{color: '#f34336'}}></i></button>
                </li>
            </ul>
        </nav >
    )
}
export default Navbar;