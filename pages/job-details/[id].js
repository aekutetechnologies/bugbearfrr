/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import FeaturedSlider from "./../../components/sliders/Featured";
import { format } from 'date-fns';
import { FaIndustry, FaMoneyBillWave, FaClock, FaMapMarkerAlt, FaStar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { GoBriefcase } from "react-icons/go";
import { useState } from "react";  // Import useState for managing button clicks
import { ToastContainer, toast } from 'react-toastify'; // Import toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast notifications
import cookie from 'cookie'; // Import cookie module
// import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
// import image from 'pub'


export default function JobDetails({ job, featuredJobs }) {
    const [isApplying, setIsApplying] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false); // Track whether the job is saved

    if (!job) {
        return <div>Job details not found!</div>;
    }

    // Format the job_posted and job_expiry dates using date-fns
    const jobPostedDate = job.job_posted ? format(new Date(job.job_posted), 'MM/dd/yyyy') : 'N/A';
    const jobExpiryDate = job.job_expiry ? format(new Date(job.job_expiry), 'MM/dd/yyyy') : 'N/A';

    // Function to get the token from localStorage (assuming it's stored there)
    const getToken = () => {
        return localStorage.getItem("accessToken"); // Replace with the actual method to retrieve the token
    };

    // Function to handle job application
    const handleApply = async () => {
        setIsApplying(true);
        const token = getToken();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/jobs/apply/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Add token to the Authorization header
                },
                body: JSON.stringify({ job_id: job.id }),
            });
            if (!response.ok) {
                throw new Error(`Failed to apply for the job: ${response.status}`);
            }
            toast.success("Job application submitted successfully!");

            window.location.reload();
        } catch (error) {
            console.error("Error applying for job:", error);
            toast.error("There was an issue applying for the job.");
        } finally {
            setIsApplying(false);
        }
    };

    // Function to handle job saving
    const handleSave = async () => {
        setIsSaving(true);
        const token = getToken();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/jobs/${saved ? "unsave" : "save"}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Add token to the Authorization header
                },
                body: JSON.stringify({ job_id: job.id }),
            });
            if (!response.ok) {
                throw new Error(`Failed to ${saved ? "unsave" : "save"} the job: ${response.status}`);
            }
            setSaved(!saved); // Toggle saved state
            toast.success(`Job ${saved ? "unsaved" : "saved"} successfully!`);
        } catch (error) {
            console.error(`Error ${saved ? "unsaving" : "saving"} job:`, error);
            toast.error(`There was an issue ${saved ? "unsaving" : "saving"} the job.`);
        } finally {
            setIsSaving(false);
        }
    };

    // Function to handle "Connect VDI"
    const handleConnectVDI = () => {
        // Add the functionality for connecting VDI here.
        // For example, redirecting to a VDI-related page or opening a VDI connection
        toast.info("Connecting to VDI...");
    };

    function formatSalary(amount) {
        if (amount >= 1000 && amount < 100000) {
            return (amount / 1000).toFixed(0) + 'k'; // For amounts in thousands (e.g., 10k, 15k)
        } else if (amount >= 100000) {
            return (amount / 100000).toFixed(0) + 'L'; // For lakhs if needed
        }
        return amount; // Return the original amount if it doesn't meet conditions
    }

    return (
        <>
            <Layout>
                <ToastContainer /> {/* Add toast container */}
                <div>
                    <section className="section-box-2">
                        <div className="container">
                            <div className="banner-hero banner-image-single">
                                <img src="/assets/imgs/page/job-single/thumb.png" alt="bugbear" />
                            </div>
                            <div className="flex flex-wrap ">
                                {/* First column: Job Title and Info */}
                                <div className="col-lg-8 col-md-12 flex flex-col justify-center ">
                                    <h3>{job.title || "Job Title"}</h3>
                                    <div className="mt-10 mb-15 flex items-center gap-3">
                                        <span className="text-xs flex gap-2 text-gray-500"><GoBriefcase /> {job.job_type || "Full Time"}</span>
                                        <span className="text-xs flex gap-2 text-gray-500"><FaClock /> {jobPostedDate}</span>
                                        <span className="text-xs flex gap-2 text-gray-500"><FaClock /> {jobExpiryDate}</span>
                                    </div>
                                </div>

                                {/* Second column: Buttons and Save Icon */}
                                <div className="col-lg-4 col-md-12 flex items-center justify-end ">
                                    <div className="flex items-center">
                                        {job.is_approved && (
                                            <button className="btn btn-connect-vdi hover-up mr-2" onClick={handleConnectVDI}>
                                                Connect VDI
                                            </button>
                                        )}

                                        <button
                                            className="btn btn-apply-icon btn-apply btn-apply-big hover-up"
                                            disabled={isApplying || job.applied}
                                            onClick={handleApply}
                                        >
                                            {job.applied ? "Applied" : isApplying ? "Applying..." : "Apply now"}
                                        </button>

                                        <FaStar
                                            size={24}
                                            color={saved ? "yellow" : "gray"}  // Yellow if saved, gray if not saved
                                            className="ml-2 cursor-pointer"
                                            onClick={handleSave}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-bottom pt-10 pb-10" />
                        </div>
                    </section>

                    {/* Employment Information */}
                    <section className="section-box mt-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                                    <div className="job-overview">
                                        <h5 className="border-bottom pb-15 mb-30">Employment Information</h5>
                                        <div className="row">
                                            <div className="col-md-6 d-flex">
                                                <div className="sidebar-icon-item">
                                                    <FaIndustry size={24} />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description industry-icon mb-10">Category</span>
                                                    <strong className="small-heading">{job.category || "Industry not provided"}</strong> {/* Handle job category */}
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <FaMoneyBillWave size={24} />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description salary-icon mb-10">Salary</span>
                                                    <strong className="small-heading">₹{formatSalary(job.salary_min)} - ₹{formatSalary(job.salary_max)}</strong> {/* Display salary */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-25">
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <FaClock size={24} />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description experience-icon mb-10">Experience</span>
                                                    <strong className="small-heading">{job.experience || "Not specified"} years</strong> {/* Display experience */}
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex">
                                                <div className="sidebar-icon-item">
                                                    <FaMapMarkerAlt size={24} />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description jobtype-icon mb-10">Location</span>
                                                    <strong className="small-heading">{job.location || "Remote"}</strong> {/* Display location */}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Display if the job is featured or active */}
                                        <div className="row mt-25">
                                            <div className="col-md-6 d-flex">
                                                <div className="sidebar-icon-item">
                                                    <FaStar size={24} color="gray" /> {/* Featured icon in grey */}
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description mb-10">Featured</span>
                                                    <strong className="small-heading">{job.featured ? "Yes" : "No"}</strong> {/* Display featured status */}
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex">
                                                <div className="sidebar-icon-item">
                                                    {job.is_active ? <FaCheckCircle size={24} color="gray" /> : <FaTimesCircle size={24} color="gray" />} {/* Active/Inactive icons in grey */}
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description mb-10">Status</span>
                                                    <strong className="small-heading">{job.is_active ? "Open" : "Closed"}</strong> {/* Display active status */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Job Description */}
                                    <div className="content-single">
                                        <h4>Job Description</h4>
                                        {/* <p>{job.responsibilities || "Job description not available."}</p> */}
                                        <p dangerouslySetInnerHTML={{ __html: job.responsibilities || "Job description not available." }} />

                                        <h4>Essential Knowledge, Skills, and Experience</h4>
                                        <p dangerouslySetInnerHTML={{ __html: job.skills || "Skills not provided." }} />
                                        {/* <ul>
                                            {job.skills && job.skills.length > 0 ? (
                                                job.skills.split(",").map((skill, index) => (
                                                    <li key={index}>{skill.trim()}</li>
                                                ))
                                            ) : (
                                                <li>Skills not provided</li>
                                            )}
                                        </ul> */}

                                        <h4>Qualifications</h4>
                                        <p dangerouslySetInnerHTML={{ __html: job.qualifications || "No qualifications provided." }} />
                                        {/* <p>{job.qualifications || "No qualifications provided."}</p> */}
                                    </div>
                                </div>

                                {/* Sidebar or additional content here */}
                            </div>
                        </div>
                    </section>

                    {/* Featured Jobs */}
                    <section className="section-box mt-50">
                        <div className="container">
                            <div className="text-left">
                                <h2 className="section-title mb-10">Featured Jobs</h2>
                                <div className="mt-50">
                                    <FeaturedSlider featuredJobs={featuredJobs} />
                                    {/* <div className="text-center">
                                        <Link href="#">
                                            Load more posts
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}


// Fetch data from the API
export async function getServerSideProps(context) {
    const { id } = context.query;

    try {
        // Parse cookies from the request header
        const cookies = context.req.headers.cookie ? cookie.parse(context.req.headers.cookie) : {};
        const token = cookies.accessToken; // Get the token from cookies

        const res = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the headers
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch job details: ${res.status}`);
        }

        const job = await res.json();
        console.log(job);

        // Fetch featured jobs with POST request
        const featuredRes = await fetch(`http://127.0.0.1:8000/api/jobs/search/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: "",
                page: 1,
                page_size: 4, // Limit the featured jobs to 4
                category: [],
                salaryRange: [],
                experienceLevel: [],
                jobType: [],
            }),
        });

        if (!featuredRes.ok) {
            throw new Error(`Failed to fetch featured jobs: ${featuredRes.status}`);
        }

        const featuredJobs = await featuredRes.json();

        return {
            props: { job, featuredJobs: featuredJobs.results || [] },
        };
    } catch (error) {
        console.error("Error fetching job details:", error);

        return {
            props: { job: null }, // Return null job if fetching fails
        };
    }
}
