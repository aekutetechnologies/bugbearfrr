import React, { useState } from 'react';
import BackToTop from '../elements/BackToTop';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import Header2 from './Header2';

const Layout = ({ children }) => {
    const [openClass, setOpenClass] = useState('');

    const handleOpen = () => {
        document.body.classList.add("mobile-menu-active");
        setOpenClass("sidebar-visible")
    }

    const handleRemove = () => {
        if (openClass === "sidebar-visible") {
            setOpenClass("")
            document.body.classList.remove("mobile-menu-active");
        }
    }
    return (
        <div className=' lg:max-w-screen-xl mx-auto'>
            <div className="body-overlay-1" onClick={handleRemove} /> 
             {/* <Header handleOpen={handleOpen} handleRemove={handleRemove} openClass={openClass} /> */}
             <Header2/>
            <Sidebar openClass={openClass} />
            <main className="main">
                {children}
            </main>
            <Footer className=""/>
            <BackToTop />
        </div>
    );
};

export default Layout;