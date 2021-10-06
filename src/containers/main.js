import React from 'react';
import {
    Contents,
    Navbar,
    Sidebar,
    Footer,
} from './index';

const Main = () =>{
    return (
        <div className="wrapper">
            <Navbar/>
            <Contents/>
            <Sidebar/>
            <Footer/>
        </div>
    )
}

export default Main;