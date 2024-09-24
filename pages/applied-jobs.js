import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";

export default function JobGrid() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // For tracking the current page
    const jobsPerPage = 10; // Number of jobs to display per page

    const router = useRouter();

    // Fetch the token from localStorage when on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            const tokenFromStorage = localStorage.getItem('accessToken');
            setToken(tokenFromStorage);
        }
    }, []);

    // Fetch jobs from the backend
    useEffect(() => {
        const fetchJobs = async () => {
            if (!token) return; // If token is not available yet, do not make the request

            try {
                const response = await fetch("http://127.0.0.1:8000/api/jobs/applied", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Pass token here
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setJobs(data); // Assume this is an array of jobs
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (token) {
            fetchJobs();
        }
    }, [token]);

    // Helper function to format salary in "k" format
    const formatSalary = (salary) => {
        if (salary >= 1000) {
            return `${Math.round(salary / 1000)}k`;
        }
        return salary;
    };

    // Determine the jobs to display on the current page
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    // Handle page navigation
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleApplyNowClick = (jobId) => {
        router.push(`/job-details/${jobId}`);
    };

    return (
        <>
            <style jsx>{`
                /* Styling the grid to have 4 cards per row with reduced spacing */
                .job-grid .col-xl-3,
                .job-grid .col-lg-4,
                .job-grid .col-md-6,
                .job-grid .col-sm-12,
                .job-grid .col-12 {
                    padding-left: 5px; /* Reduce left padding */
                    padding-right: 5px; /* Reduce right padding */
                    margin-bottom: 15px; /* Reduce bottom margin between cards */
                }

                /* Ensure the company logo is square and properly sized */
                .company-logo {
                    width: 100px;
                    height: 100px;
                    object-fit: contain; /* Contain the logo within the box without distortion */
                    background-color: rgba(255, 255, 255, 0.2); /* Blending the logo with the background */
                    padding: 10px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                /* Pagination container */
                .paginations .pager {
                    display: flex;
                    justify-content: center;
                    list-style: none;
                    padding-left: 0;
                    margin-top: 20px;
                }

                .pager li {
                    margin-right: 5px;
                }

                /* Page number buttons */
                .pager .pager-number {
                    padding: 8px 15px;
                    border: 1px solid #ddd;
                    background-color: transparent; /* Transparent background for inactive buttons */
                    color: #007bff; /* Blue color for the text */
                    font-size: 14px;
                    cursor: pointer;
                    border-radius: 4px; /* Rounded corners */
                    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
                }

                .pager .pager-number:hover {
                    background-color: #007bff;
                    color: #fff;
                    box-shadow: 0 2px 5px rgba(0, 123, 255, 0.3); /* Subtle shadow on hover */
                }

                /* Highlight the current page number */
                .pager .pager-number.active {
                    background-color: #007bff;
                    color: #fff; /* White text on the active page */
                    border-color: #007bff;
                    box-shadow: 0 2px 5px rgba(0, 123, 255, 0.4); /* Slight shadow on active button */
                }

                /* Disabled state for "Next" and "Previous" buttons */
                .pager .pager-number:disabled {
                    background-color: transparent;
                    color: #aaa;
                    cursor: not-allowed;
                    border-color: #ddd;
                }

                .pager-prev,
                .pager-next {
                    padding: 8px 15px;
                    border: 1px solid #ddd;
                    background-color: #f5f5f5;
                    font-size: 14px;
                    color: #007bff;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
                }

                .pager-prev:hover,
                .pager-next:hover {
                    background-color: #007bff;
                    color: #fff;
                    box-shadow: 0 2px 5px rgba(0, 123, 255, 0.3);
                }

                /* Disabled state for prev/next buttons */
                .pager-prev:disabled,
                .pager-next:disabled {
                    background-color: #f5f5f5;
                    color: #aaa;
                    cursor: not-allowed;
                    border-color: #ddd;
                }
            `}</style>
            <Layout>
                <div>
                    <section className="section-box mt-30">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="content-page">
                                        <div className="box-filters-job">
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-5">
                                                    <span className="text-small text-showing">
                                                        Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> pages
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row job-grid">
                                            {/* Loop through current jobs and display */}
                                            {currentJobs.map((job) => (
                                                <div key={job.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                                                    <div className="card-grid-2 hover-up">
                                                        <div className="card-grid-2-image-left">
                                                            <div className="image-box">
                                                                <img src={job.company_logo || "assets/imgs/brands/brand-1.png"} alt={job.company_name} className="company-logo" />
                                                            </div>
                                                            <div className="right-info">
                                                                <Link href={`/company-details/${job.company_id}`} legacyBehavior>
                                                                    <a className="name-job">{job.company_name}</a>
                                                                </Link>
                                                                <span className="location-small">{job.location}</span>
                                                            </div>
                                                        </div>
                                                        <div className="card-block-info">
                                                            <h6>
                                                                <Link href={`/job-details/${job.id}`} legacyBehavior>
                                                                    <a>{job.title}</a>
                                                                </Link>
                                                            </h6>
                                                            <div className="mt-5">
                                                                <span className="card-briefcase">{job.job_type}</span>
                                                                <span className="card-time">
                                                                    {job.posted_time}
                                                                </span>
                                                            </div>
                                                            <p className="font-sm color-text-paragraph mt-15">{job.description}</p>
                                                            <div className="card-2-bottom mt-30">
                                                                <div className="row">
                                                                    <div className="col-lg-7 col-7">
                                                                        <span className="card-text-price">{formatSalary(job.salary_min)} - </span>
                                                                        <span className="card-text-price">{formatSalary(job.salary_max)}</span>
                                                                    </div>
                                                                    <div className="col-lg-5 col-5 text-end">
                                                                        <div className="btn btn-apply-now" onClick={() => handleApplyNowClick(job.id)}>
                                                                            Apply now
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pagination Controls */}
                                    <div className="paginations">
                                        <ul className="pager">
                                            <li>
                                                <button
                                                    className="pager-prev"
                                                    onClick={handlePreviousPage}
                                                    disabled={currentPage === 1} // Disable if on the first page
                                                >
                                                </button>
                                            </li>

                                            {/* Pagination Numbers */}
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li key={index + 1}>
                                                    <button
                                                        className={`pager-number ${currentPage === index + 1 ? "active" : ""}`}
                                                        onClick={() => goToPage(index + 1)}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}

                                            <li>
                                                <button
                                                    className="pager-next"
                                                    onClick={handleNextPage}
                                                    disabled={currentPage === totalPages} // Disable if on the last page
                                                >
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Newsletter Section */}
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
