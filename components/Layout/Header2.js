/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import Sidebar from "../../components/elements/Sidebar"; // Import the sidebar component
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { fetchProfileData } from "../../util/api"; // Import the API function
import { RxHamburgerMenu } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";

const Header2 = ({ handleOpen, handleRemove, openClass }) => {
  const [scroll, setScroll] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Ensure this code runs only on the client
    setIsClient(true);

    const handleScroll = () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };

    document.addEventListener("scroll", handleScroll);

    // Fetch profile data if logged in
    if (isClient) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        fetchProfileData(token)
          .then((data) => {
            setProfileData(data);
            setIsLoggedIn(true);
            setUserType(localStorage.getItem("userType"));
          })
          .catch((error) => {
            console.error("Error fetching profile data:", error);
          });
      }
    }

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scroll, isClient]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userType");
    Cookies.remove("token");
    setIsLoggedIn(false);
    setProfileData(null);
    setUserType(null);
    toast.success("Logout Successfully");
    router.push("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header
      className={scroll ? "sticky-bar stick py-3 top-2" : "sticky-bar py-3"}
    >
      <div
        className={
          scroll
            ? "bg-neutral-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 backdrop-saturate-100 backdrop-contrast-125 py-2 mx-auto max-w-[1260px] flex justify-between rounded-xl top-2 shadow-lg shadow-sky-200"
            : "py-2 flex justify-between"
        }
      >
        <div>
          <Link
            href={
              !isLoggedIn
                ? "/"
                : userType === "3"
                ? "/dashboard"
                : userType === "1" || userType === "2"
                ? "/jobs-list"
                : "/"
            }
            className="d-flex"
          >
            <img
              className="w-44"
              alt="bugbear"
              src="/assets/imgs/template/jobhub-logo.svg"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {isClient && isLoggedIn && userType === "3" && (
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-white font-semibold"
              >
                <button>Dashboard</button>
              </Link>
            </div>
          )}
          {isClient && isLoggedIn && (userType === "1" || userType === "2") && (
            <div className="flex gap-4">
              <Link
                href="/jobs-list"
                className="text-gray-700 hover:text-white font-semibold"
              >
                <button className="w-full">Search Jobs</button>
              </Link>
              <Link
                href="/applied-jobs"
                className="text-gray-700 hover:text-white font-semibold"
              >
                <button className="w-full">My Jobs</button>
              </Link>
              <Link
                href="/saved-jobs"
                className="text-gray-700 hover:text-white font-semibold"
              >
                <button className="w-full">Saved Jobs</button>
              </Link>
            </div>
          )}
          {isClient && isLoggedIn ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 pr-10"
                onClick={toggleDropdown}
              >
                <img
                  src={
                    profileData?.profile_pic_url ||
                    "/assets/imgs/default-profile-pic.png"
                  }
                  alt="Profile"
                  width={45}
                  className="rounded-full"
                />
                <span>
                  <span>Hi,</span>
                  {profileData?.first_name || "User"}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg z-10">
                  <Link
                    href={
                      userType === "1"
                        ? "/candidate-profile"
                        : userType === "2"
                        ? "/organization-profile"
                        : "/recruiter-profile"
                    }
                  >
                    <div className="dropdown-item flex items-center p-2 cursor-pointer">
                      <FaUserCircle
                        className="mr-2"
                        style={{ fontSize: "1.2rem" }}
                      />
                      View Profile
                    </div>
                  </Link>
                  <div
                    className="dropdown-item flex items-center p-2 cursor-pointer"
                    onClick={toggleSidebar}
                  >
                    <FaCog
                      className="mr-2"
                      style={{ fontSize: "1.2rem" }}
                    />
                    My Account
                  </div>
                  <div
                    className="dropdown-item flex items-center p-2 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt
                      className="mr-2"
                      style={{ fontSize: "1.2rem" }}
                    />
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            isClient && (
              <div className="flex items-center pr-10">
                <Link
                  href="/choose-role"
                  className="text-link-bd-btom hover-up"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="btn btn-default btn-shadow ml-40 hover-up"
                >
                  Sign in
                </Link>
              </div>
            )
          )}
        </div>
        <div className="flex lg:hidden items-center">
          <RxHamburgerMenu size={35} />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </header>
  );
};

export default Header2;
