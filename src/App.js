import React, { Suspense, lazy, useState,useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


const Main = lazy(() => import('./containers/main'))
const Login = lazy(() => import('./views/pages/Login'))

const loading = (
  <div className="text-center">
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>
)

const App = () => {

  const [login,setLogin] = useState(false);
  const dataLogin = useSelector(store => store.login);

  useEffect(()=>{
    setLogin(dataLogin.status);
  },[dataLogin]);
  
  return(
      <Suspense fallback={loading}>
        <Switch>
          <Route path="/login" name="Login" render={props =>{
            if(!login){
              return <Login {...props} />
            }else{
              return <Redirect to="/"/>
            }}
            }/>
          <Route path="/" name="Home" render={props =>{
            if(login){
              return <Main {...props}/>
            }else{
              return <Redirect to="/login"/>
            }
            }
            } />
        </Switch>
      </Suspense>
  )
}


export default App;
