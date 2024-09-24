/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Sidebar from '../../components/elements/Sidebar'; // Import the sidebar component
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Header = ({ handleOpen, handleRemove, openClass }) => {
    const [scroll, setScroll] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [userType, setUserType] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const scrollCheck = window.scrollY > 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        };

        document.addEventListener('scroll', handleScroll);

        // Fetch profile data if logged in
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetchProfileData(token);
        }

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scroll]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const fetchProfileData = async (token) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/user/user-details/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
                setIsLoggedIn(true);
                setUserType(localStorage.getItem('userType'));
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userType');
        Cookies.remove('token');
        setIsLoggedIn(false);
        setProfileData(null);
        setUserType(null);

        router.push('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <header className={scroll ? 'header sticky-bar stick' : 'header sticky-bar'}>
                <div className="container">
                    <div className="main-header">
                        <div className="header-left">
                            <div className="header-logo">
                                <Link href="/" className="d-flex">
                                    <img alt="bugbear" src="/assets/imgs/template/jobhub-logo.svg" />
                                </Link>
                            </div>
                        </div>
                        <div className="header-nav">
                            <nav className="nav-main-menu">
                                <ul>
                                    {/* Dashboard for userType 3 (recruiter) */}
                                    {isLoggedIn && userType === "3" && (
                                        <li>
                                            <Link href="/dashboard" className="nav-link">
                                                Dashboard
                                            </Link>
                                        </li>
                                    )}

                                    {/* Search Jobs, My Jobs, Saved Jobs for userType 1 or 2 (job seekers) */}
                                    {isLoggedIn && (userType === "1" || userType === "2") && (
                                        <>
                                            <li>
                                                <Link href="/jobs-list" className="nav-link">
                                                    Search Jobs
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/applied-jobs" className="nav-link">
                                                    My Jobs
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/saved-jobs" className="nav-link">
                                                    Saved Jobs
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </nav>
                            <div
                                className={`burger-icon burger-icon-white ${openClass && 'burger-close'}`}
                                onClick={() => { handleOpen(); handleRemove(); }}
                            >
                                <span className="burger-icon-top" /><span className="burger-icon-mid" /><span className="burger-icon-bottom" />
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="block-signin">
                                {isLoggedIn ? (
                                    <div className="profile-dropdown">
                                        <div
                                            className="profile-header"
                                            onClick={toggleDropdown}
                                        >
                                            <img
                                                src={profileData?.profile_pic_url || '/assets/imgs/default-profile-pic.png'}
                                                alt="Profile"
                                            />
                                            <span>{`Hi, ${profileData?.first_name || 'User'}`}</span>
                                            <i className="dropdown-icon">&#9662;</i>
                                        </div>

                                        {dropdownOpen && (
                                           <div className="profile-dropdown-menu">
                                           <Link href={userType === "3" ? "/recruiter-profile" : "/candidate-profile"}>
                                               <div className="dropdown-item" style={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
                                                   <FaUserCircle style={{ marginRight: '10px', fontSize: '1.2rem' }} /> View Profile
                                               </div>
                                           </Link>
                                           <div className="dropdown-item" onClick={toggleSidebar} style={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
                                               <FaCog style={{ marginRight: '10px', fontSize: '1.2rem' }} /> My Account
                                           </div>
                                           <div className="dropdown-item" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
                                               <FaSignOutAlt style={{ marginRight: '10px', fontSize: '1.2rem' }} /> Logout
                                           </div>
                                       </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <Link href="/choose-role" className="text-link-bd-btom hover-up">Register</Link>
                                        <Link href="/login" className="btn btn-default btn-shadow ml-40 hover-up">Sign in</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <style jsx>{`
                .profile-dropdown {
                    position: relative;
                }

                .profile-header {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    padding: 10px;
                }

                .profile-header img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                }

                .profile-header span {
                    margin-left: 10px;
                }

                .dropdown-icon {
                    margin-left: 10px;
                }

                .profile-dropdown-menu {
                    position: absolute;
                    right: 0;
                    top: 50px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    z-index: 1000;
                    padding: 10px;
                    min-width: 150px;
                }

                .dropdown-item {
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .dropdown-item:hover {
                    background-color: #f0f0f0;
                }

                .icon {
                    margin-right: 10px;
                    font-size: 1.2rem;
                }

                .nav-main-menu ul {
                    list-style: none;
                    display: flex;
                    gap: 20px;
                    margin: 0;
                    padding: 0;
                }

                .nav-main-menu li {
                    display: inline;
                }

                .nav-link {
                    text-decoration: none;
                    color: inherit;
                    font-weight: 500;
                    transition: color 0.3s ease;
                }

                .nav-link:hover {
                    color: #0070f3;
                }

                .burger-icon {
                    cursor: pointer;
                }

                .burger-close .burger-icon-top,
                .burger-close .burger-icon-mid,
                .burger-close .burger-icon-bottom {
                    background-color: transparent;
                }
            `}</style>

            {isSidebarOpen && <Sidebar closeSidebar={toggleSidebar} />}
        </>
    );
};

export default Header;
