import Link from "next/link";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout/Layout";

// Skill suggestions data
const skillOptions = [
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "AWS", label: "AWS" },
    { value: "Figma", label: "Figma" },
    { value: "Laravel", label: "Laravel" },
    { value: "Golang", label: "Golang" },
];

export default function CandidateProfile() {
    const [activeIndex, setActiveIndex] = useState(1);
    const [profileData, setProfileData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        bio: "",
        website: "",
        position: "",
        country: "",
        state: "",
        city: "",
        zip_code: "",
        profile_pic_url: "",
        skills: [],
    });
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    // Fetch profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch("http://127.0.0.1:8000/api/user/user-details", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfileData({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        phone: data.phone,
                        bio: data.about_me,
                        position: data.position,
                        country: data.country,
                        city: data.city,
                        zip_code: data.address,
                        profile_pic_url: data.profile_pic_url,
                        skills: data.skills || [],
                    });
                    // setSelectedSkills(data.skills.map(skill => ({ label: skill, value: skill })));
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/user/user-details/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...profileData,
                    skills: selectedSkills.map((skill) => skill.value),
                }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setProfileData((prevData) => ({
                    ...prevData,
                    ...updatedData,
                }));
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred while updating the profile");
        } finally {
            setLoading(false);
        }
    };

    const handleProfilePicUpload = async () => {
        const formData = new FormData();
        formData.append("profile_pic", profilePic);

        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://127.0.0.1:8000/api/user/upload-profile-pic/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProfileData((prevData) => ({
                    ...prevData,
                    profile_pic_url: data.profile_pic_url,
                }));
                toast.success("Profile picture uploaded successfully!");
            } else {
                toast.error("Failed to upload profile picture");
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            toast.error("An error occurred while uploading the profile picture");
        }
    };

    return (
        <>
            <Layout>
                <div>
                    <ToastContainer />
                    <section className="section-box-2">
                        <div className="container">
                            <div className="banner-hero banner-image-single">
                                <img src="assets/imgs/page/candidates/img.png" alt="jobbox" />
                                <a className="btn-editor" href="#" />
                            </div>
                            <div className="box-company-profile">
                                <div className="image-compay">
                                    <img
                                        src={profileData.profile_pic_url}
                                        alt="Profile"
                                    />
                                </div>
                                <div className="row mt-10">
                                    <div className="col-lg-8 col-md-12">
                                        <h5 className="f-18">
                                            {profileData.first_name} {profileData.last_name}{" "}
                                            <span className="card-location font-regular ml-20">
                                                {profileData.city}, {profileData.country}
                                            </span>
                                        </h5>
                                        <p className="mt-0 font-md color-text-paragraph-2 mb-15">
                                            {profileData.position}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom pt-10 pb-10" />
                        </div>
                    </section>
                    <section className="section-box mt-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-12">
                                    <div className="box-nav-tabs nav-tavs-profile mb-5">
                                        <ul className="nav" role="tablist">
                                            <li>
                                                <a className="btn btn-border aboutus-icon mb-20 active" onClick={() => handleOnClick(1)}>
                                                    My Profile
                                                </a>
                                            </li>
                                            <li>
                                                <a className="btn btn-border recruitment-icon mb-20" onClick={() => handleOnClick(2)}>
                                                    My Jobs
                                                </a>
                                            </li>
                                            <li>
                                                <a className="btn btn-border people-icon mb-20" onClick={() => handleOnClick(3)}>
                                                    Saved Jobs
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="border-bottom pt-10 pb-10" />
                                        <div className="mt-20 mb-20">
                                            <Link href="#">
                                                <button className="link-red">Delete Account</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12 col-12 mb-50">
                                    <div className="content-single">
                                        <div className="tab-content">
                                            <div className={`tab-pane fade ${activeIndex === 1 && "show active"}`}>
                                                <h3 className="mt-0 mb-15 color-brand-1">My Account</h3>
                                                <form onSubmit={handleProfileUpdate}>
                                                    <div className="mt-35 mb-40 box-info-profie">
                                                        <div className="image-profile">
                                                            <img
                                                                src={profileData.profile_pic_url || "assets/imgs/page/candidates/candidate-profile.png"}
                                                                alt="Profile Pic"
                                                            />
                                                        </div>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => setProfilePic(e.target.files[0])}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-apply"
                                                            onClick={handleProfilePicUpload}
                                                            disabled={!profilePic}
                                                        >
                                                            Upload Avatar
                                                        </button>
                                                    </div>

                                                    <div className="row form-contact">
                                                        <div className="col-lg-6 col-md-12">
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Full Name *</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="first_name"
                                                                    value={profileData.first_name}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Email *</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="email"
                                                                    value={profileData.email}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Phone</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="phone"
                                                                    value={profileData.phone}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Bio</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    rows={4}
                                                                    name="bio"
                                                                    value={profileData.bio}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Website</label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="website"
                                                                    value={profileData.website}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>

                                                            {/* Skills Section */}
                                                            <div className="form-group">
                                                                <label className="font-sm color-text-mutted mb-10">Skills</label>
                                                                <Select
                                                                    isMulti
                                                                    name="skills"
                                                                    options={skillOptions}
                                                                    value={selectedSkills}
                                                                    onChange={(selected) => setSelectedSkills(selected)}
                                                                    className="basic-multi-select"
                                                                    classNamePrefix="select"
                                                                />
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="font-sm color-text-mutted mb-10">Country</label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="country"
                                                                            value={profileData.country}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="font-sm color-text-mutted mb-10">State</label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="state"
                                                                            value={profileData.state}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="font-sm color-text-mutted mb-10">City</label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="city"
                                                                            value={profileData.city}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label className="font-sm color-text-mutted mb-10">Zip Code</label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="zip_code"
                                                                            value={profileData.zip_code}
                                                                            onChange={handleInputChange}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="box-button mt-15">
                                                            <button
                                                                className="btn btn-apply-big font-md font-bold"
                                                                type="submit"
                                                                disabled={loading}
                                                            >
                                                                {loading ? "Saving..." : "Save All Changes"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className={`tab-pane fade ${activeIndex === 2 && "show active"}`}>
                                                <h3 className="mt-0 color-brand-1 mb-50">My Jobs</h3>
                                                <div className="row display-list">
                                                    <div className="col-xl-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <span className="flash" />
                                                            <div className="row">
                                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="card-grid-2-image-left">
                                                                        <div className="image-box">
                                                                            <img src="assets/imgs/brands/brand-5.png" alt="jobBox" />
                                                                        </div>
                                                                        <div className="right-info">
                                                                            <Link legacyBehavior href="#">
                                                                                <a className="name-job">Linkedin</a>
                                                                            </Link>
                                                                            <span className="location-small">New York, US</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                                                                    <div className="pl-15 mb-15 mt-30">
                                                                        <Link legacyBehavior href="#">
                                                                            <a className="btn btn-grey-small mr-5">Adobe XD</a>
                                                                        </Link>

                                                                        <Link legacyBehavior href="#">
                                                                            <a className="btn btn-grey-small mr-5">Figma</a>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h4>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>React Native Web Developer</a>
                                                                    </Link>
                                                                </h4>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Fulltime</span>
                                                                    <span className="card-time">
                                                                        <span>4</span>
                                                                        <span> mins ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur</p>
                                                                <div className="card-2-bottom mt-20">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$500</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <span className="flash" />
                                                            <div className="row">
                                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="card-grid-2-image-left">
                                                                        <div className="image-box">
                                                                            <img src="assets/imgs/brands/brand-6.png" alt="jobBox" />
                                                                        </div>
                                                                        <div className="right-info">
                                                                            <Link legacyBehavior href="#">
                                                                                <a className="name-job">Quora JSC</a>
                                                                            </Link>
                                                                            <span className="location-small">New York, US</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                                                                    <div className="pl-15 mb-15 mt-30">
                                                                        <Link legacyBehavior href="#">
                                                                            <a className="btn btn-grey-small mr-5">Adobe XD</a>
                                                                        </Link>

                                                                        <Link legacyBehavior href="#">
                                                                            <a className="btn btn-grey-small mr-5">Figma</a>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h4>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>Senior System Engineer</a>
                                                                    </Link>
                                                                </h4>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Part time</span>
                                                                    <span className="card-time">
                                                                        <span>5</span>
                                                                        <span> mins ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.</p>
                                                                <div className="card-2-bottom mt-20">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$800</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <span className="flash" />
                                                            <div className="row">
                                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="card-grid-2-image-left">
                                                                        <div className="image-box">
                                                                            <img src="assets/imgs/brands/brand-7.png" alt="jobBox" />
                                                                        </div>
                                                                        <div className="right-info">
                                                                            <Link legacyBehavior href="#">
                                                                                <a className="name-job">Nintendo</a>
                                                                            </Link>
                                                                            <span className="location-small">New York, US</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                                                                    <div className="pl-15 mb-15 mt-30">
                                                                        <Link legacyBehavior href="#">
                                                                            <a className="btn btn-grey-small mr-5">Adobe XD</a>
                                                                        </Link>

                                                                        <Link legacyBehavior href="#">
                                                                            <a className="btn btn-grey-small mr-5">Figma</a>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h4>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>Products Manager</a>
                                                                    </Link>
                                                                </h4>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Full time</span>
                                                                    <span className="card-time">
                                                                        <span>6</span>
                                                                        <span> mins ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.</p>
                                                                <div className="card-2-bottom mt-20">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$250</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <span className="flash" />
                                                            <div className="row">
                                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="card-grid-2-image-left">
                                                                        <div className="image-box">
                                                                            <img src="assets/imgs/brands/brand-8.png" alt="jobBox" />
                                                                        </div>
                                                                        <div className="right-info">
                                                                            <Link legacyBehavior href="#">
                                                                                <a className="name-job">Periscope</a>
                                                                            </Link>
                                                                            <span className="location-small">New York, US</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                                                                    <div className="pl-15 mb-15 mt-30">
                                                                        <Link legacyBehavior href="#">
                                                                            <a className="btn btn-grey-small mr-5">Adobe XD</a>
                                                                        </Link>

                                                                        <Link legacyBehavior href="#">
                                                                            <a className="btn btn-grey-small mr-5">Figma</a>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h4>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>Lead Quality Control QA</a>
                                                                    </Link>
                                                                </h4>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Full time</span>
                                                                    <span className="card-time">
                                                                        <span>6</span>
                                                                        <span> mins ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.</p>
                                                                <div className="card-2-bottom mt-20">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$250</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="paginations">
                                                    <ul className="pager">
                                                        <li>
                                                            <a className="pager-prev" href="#" />
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">1</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">2</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">3</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">4</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">5</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number active">6</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">7</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <a className="pager-next" href="#" />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className={`tab-pane fade ${activeIndex === 3 && "show active"}`}>
                                                <h3 className="mt-0 color-brand-1 mb-50">Saved Jobs</h3>
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <div className="card-grid-2-image-left">
                                                                <span className="flash" />
                                                                <div className="image-box">
                                                                    <img src="assets/imgs/brands/brand-1.png" alt="jobBox" />
                                                                </div>
                                                                <div className="right-info">
                                                                    <Link legacyBehavior href="#">
                                                                        <a className="name-job">LinkedIn</a>
                                                                    </Link>
                                                                    <span className="location-small">New York, US</span>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h6>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>UI / UX Designer fulltime</a>
                                                                    </Link>
                                                                </h6>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Fulltime</span>
                                                                    <span className="card-time">
                                                                        4<span> minutes ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-15">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur</p>
                                                                <div className="mt-30">
                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">Adobe XD</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">Figma</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">Photoshop</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="card-2-bottom mt-30">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$500</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <div className="card-grid-2-image-left">
                                                                <span className="flash" />
                                                                <div className="image-box">
                                                                    <img src="assets/imgs/brands/brand-2.png" alt="jobBox" />
                                                                </div>
                                                                <div className="right-info">
                                                                    <Link legacyBehavior href="#">
                                                                        <a className="name-job">Adobe Ilustrator</a>
                                                                    </Link>
                                                                    <span className="location-small">New York, US</span>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h6>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>Full Stack Engineer</a>
                                                                    </Link>
                                                                </h6>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Part time</span>
                                                                    <span className="card-time">
                                                                        5<span> minutes ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-15">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.</p>
                                                                <div className="mt-30">
                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">React</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">NodeJS</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="card-2-bottom mt-30">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$800</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <div className="card-grid-2-image-left">
                                                                <span className="flash" />
                                                                <div className="image-box">
                                                                    <img src="assets/imgs/brands/brand-3.png" alt="jobBox" />
                                                                </div>
                                                                <div className="right-info">
                                                                    <Link legacyBehavior href="#">
                                                                        <a className="name-job">Bing Search</a>
                                                                    </Link>
                                                                    <span className="location-small">New York, US</span>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h6>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>Java Software Engineer</a>
                                                                    </Link>
                                                                </h6>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Full time</span>
                                                                    <span className="card-time">
                                                                        6<span> minutes ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-15">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.</p>
                                                                <div className="mt-30">
                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">Python</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">AWS</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">Photoshop</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="card-2-bottom mt-30">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$250</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <div className="card-grid-2-image-left">
                                                                <span className="flash" />
                                                                <div className="image-box">
                                                                    <img src="assets/imgs/brands/brand-4.png" alt="jobBox" />
                                                                </div>
                                                                <div className="right-info">
                                                                    <Link legacyBehavior href="#">
                                                                        <a className="name-job">Dailymotion</a>
                                                                    </Link>
                                                                    <span className="location-small">New York, US</span>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h6>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>Frontend Developer</a>
                                                                    </Link>
                                                                </h6>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Full time</span>
                                                                    <span className="card-time">
                                                                        6<span> minutes ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-15">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.</p>
                                                                <div className="mt-30">
                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">Typescript</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">Java</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="card-2-bottom mt-30">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$250</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <div className="card-grid-2-image-left">
                                                                <span className="flash" />
                                                                <div className="image-box">
                                                                    <img src="assets/imgs/brands/brand-5.png" alt="jobBox" />
                                                                </div>
                                                                <div className="right-info">
                                                                    <Link legacyBehavior href="#">
                                                                        <a className="name-job">Linkedin</a>
                                                                    </Link>
                                                                    <span className="location-small">New York, US</span>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h6>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>React Native Web Developer</a>
                                                                    </Link>
                                                                </h6>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Fulltime</span>
                                                                    <span className="card-time">
                                                                        4<span> minutes ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-15">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur</p>
                                                                <div className="mt-30">
                                                                    <Link legacyBehavior href="/jobs-grid">
                                                                        <a className="btn btn-grey-small mr-5">Angular</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="card-2-bottom mt-30">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$500</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <div className="card-grid-2-image-left">
                                                                <span className="flash" />
                                                                <div className="image-box">
                                                                    <img src="assets/imgs/brands/brand-6.png" alt="jobBox" />
                                                                </div>
                                                                <div className="right-info">
                                                                    <Link legacyBehavior href="#">
                                                                        <a className="name-job">Quora JSC</a>
                                                                    </Link>
                                                                    <span className="location-small">New York, US</span>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h6>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>Senior System Engineer</a>
                                                                    </Link>
                                                                </h6>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Part time</span>
                                                                    <span className="card-time">
                                                                        5<span> minutes ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-15">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.</p>
                                                                <div className="mt-30">
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a className="btn btn-grey-small mr-5">PHP</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a className="btn btn-grey-small mr-5">Android</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="card-2-bottom mt-30">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$800</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <div className="card-grid-2-image-left">
                                                                <span className="flash" />
                                                                <div className="image-box">
                                                                    <img src="assets/imgs/brands/brand-7.png" alt="jobBox" />
                                                                </div>
                                                                <div className="right-info">
                                                                    <Link legacyBehavior href="#">
                                                                        <a className="name-job">Nintendo</a>
                                                                    </Link>
                                                                    <span className="location-small">New York, US</span>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h6>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>Products Manager</a>
                                                                    </Link>
                                                                </h6>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Full time</span>
                                                                    <span className="card-time">
                                                                        6<span> minutes ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-15">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.</p>
                                                                <div className="mt-30">
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a className="btn btn-grey-small mr-5">ASP .Net</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a className="btn btn-grey-small mr-5">Figma</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="card-2-bottom mt-30">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$250</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <div className="card-grid-2-image-left">
                                                                <span className="flash" />
                                                                <div className="image-box">
                                                                    <img src="assets/imgs/brands/brand-8.png" alt="jobBox" />
                                                                </div>
                                                                <div className="right-info">
                                                                    <Link legacyBehavior href="#">
                                                                        <a className="name-job">Periscope</a>
                                                                    </Link>
                                                                    <span className="location-small">New York, US</span>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h6>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>Lead Quality Control QA</a>
                                                                    </Link>
                                                                </h6>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Full time</span>
                                                                    <span className="card-time">
                                                                        6<span> minutes ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-15">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.</p>
                                                                <div className="mt-30">
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a className="btn btn-grey-small mr-5">iOS</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a className="btn btn-grey-small mr-5">Laravel</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a className="btn btn-grey-small mr-5">Golang</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="card-2-bottom mt-30">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$250</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                                                        <div className="card-grid-2 hover-up">
                                                            <div className="card-grid-2-image-left">
                                                                <span className="flash" />
                                                                <div className="image-box">
                                                                    <img src="assets/imgs/brands/brand-8.png" alt="jobBox" />
                                                                </div>
                                                                <div className="right-info">
                                                                    <Link legacyBehavior href="#">
                                                                        <a className="name-job">Periscope</a>
                                                                    </Link>
                                                                    <span className="location-small">New York, US</span>
                                                                </div>
                                                            </div>
                                                            <div className="card-block-info">
                                                                <h6>
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a>Lead Quality Control QA</a>
                                                                    </Link>
                                                                </h6>
                                                                <div className="mt-5">
                                                                    <span className="card-briefcase">Full time</span>
                                                                    <span className="card-time">
                                                                        6<span> minutes ago</span>
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm color-text-paragraph mt-15">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur.</p>
                                                                <div className="mt-30">
                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a className="btn btn-grey-small mr-5">iOS</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a className="btn btn-grey-small mr-5">Laravel</a>
                                                                    </Link>

                                                                    <Link legacyBehavior href="/job-details">
                                                                        <a className="btn btn-grey-small mr-5">Golang</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="card-2-bottom mt-30">
                                                                    <div className="row">
                                                                        <div className="col-lg-7 col-7">
                                                                            <span className="card-text-price">$250</span>
                                                                            <span className="text-muted">/Hour</span>
                                                                        </div>
                                                                        <div className="col-lg-5 col-5 text-end">
                                                                            <div className="btn btn-apply-now" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                                                                Apply now
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="paginations">
                                                    <ul className="pager">
                                                        <li>
                                                            <a className="pager-prev" href="#" />
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">1</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">2</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">3</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">4</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">5</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number active">6</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link legacyBehavior href="#">
                                                                <a className="pager-number">7</a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <a className="pager-next" href="#" />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-50 mb-20">
                        <div className="container">
                            <div className="box-newsletter">
                                <div className="row">
                                    <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                                        <img src="assets/imgs/template/newsletter-left.png" alt="joxBox" />
                                    </div>
                                    <div className="col-lg-12 col-xl-6 col-12">
                                        <h2 className="text-md-newsletter text-center">
                                            New Things Will Always
                                            <br /> Update Regularly
                                        </h2>
                                        <div className="box-form-newsletter mt-40">
                                            <form className="form-newsletter">
                                                <input className="input-newsletter" type="text" placeholder="Enter your email here" />
                                                <button className="btn btn-default font-heading icon-send-letter">Subscribe</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                                        <img src="assets/imgs/template/newsletter-right.png" alt="joxBox" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}
