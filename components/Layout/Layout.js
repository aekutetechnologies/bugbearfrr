import React, { useState } from 'react';
import BackToTop from '../elements/BackToTop';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import Header2 from './Header2';
import { ToastContainer, toast } from 'react-toastify';

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

        <div className=' lg:max-w-screen-xl mx-auto '>
             {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} /> */}
            <div className="body-overlay-1" onClick={handleRemove} />
            {/* <Header handleOpen={handleOpen} handleRemove={handleRemove} openClass={openClass} /> */}
            <Header2 />
            <Sidebar openClass={openClass} />
            <main className="main">

                {children}
            </main>
            <Footer />
            <BackToTop />
        </div>

    );
};

export default Layout;