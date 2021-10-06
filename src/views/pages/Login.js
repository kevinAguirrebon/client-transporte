import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../redux/reducerLogin/login';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [button, setButton] = useState(false);

    const onSubmit = (data) => {
        dispatch(login(data));
        setButton(!button);
    }

    const dataLogin = useSelector(store => store.login);


    useEffect(()=>{
        console.log('cambio')
        if(dataLogin.status === false){
            Swal.fire({
                title: dataLogin.message,
                icon: 'warning',
                confirmButtonText: 'ok'
            })
        }
    },[dataLogin])

    
    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="/login"><b>CI</b>Tropical</a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                    <p className="login-box-msg">Iniciar Sección</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="username">Usuario</label>
                            <input type="text" className={`form-control ${errors?.username?.message && 'is-invalid'}`} placeholder="username" name="username" {...register('username', { required: {value: true, message: 'Valor requerido*'}})} />
                            <span className="error invalid-feedback">{errors?.username?.message}</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Contraseña</label>
                            <input type="password" className={`form-control ${errors?.password?.message && 'is-invalid'}`} placeholder="Password" {...register('password', { required: {value: true, message: 'Valor requerido'}})}/>
                            <span className="error invalid-feedback">{errors?.password?.message}</span>
                        </div>
                        <div className="row">
                        <div className="col-4">
                            <button type="submit" className="btn btn-success btn-block">Iniciar</button>
                        </div>
                        {/* /.col */}
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>

    )

}
export default Login;