import React, { Suspense } from 'react';
import routes from '../routes';

import {
    Redirect,
    Route,
    Switch
  } from 'react-router-dom'

const loading = (
    <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <div className="spinner-border ml-auto" role="status" aria-hidden="true" />
    </div>
  )

const Content = () => {  
    return (
        <Suspense fallback={loading}>
            <Switch>
                {
                    routes.map((route,idx) => { 
                        return route.component && (<Route 
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                                <div className="content-wrapper">
                                    <div className="content-header">
                                        <div className="container-fluid">
                                            <route.component {...props}/>
                                        </div>
                                    </div>
                                </div> 
                                
                            )}
                            />)
                        })
                    }
                <Redirect from="/admin/" to="/" />
            </Switch>
            
        </Suspense>
    )
}

export default Content;