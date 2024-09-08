/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import FeaturedSlider from "./../../components/sliders/Featured";

export default function JobDetails({ job, featuredJobs }) {
    if (!job) {
        return <div>Job details not found!</div>;
    }

    return (
        <>
            <Layout>
                <div>
                    <section className="section-box-2">
                        <div className="container">
                            <div className="banner-hero banner-image-single">
                                <img src="assets/imgs/page/job-single/thumb.png" alt="jobBox" />
                            </div>
                            <div className="row mt-10">
                                <div className="col-lg-8 col-md-12">
                                    <h3>{job.title || "Job Title"}</h3>
                                    <div className="mt-0 mb-15">
                                        <span className="card-briefcase">{job.job_type || "Fulltime"}</span>
                                        <span className="card-time">{new Date(job.posted_date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 text-lg-end">
                                    <div className="btn btn-apply-icon btn-apply btn-apply-big hover-up" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                        Apply now
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
                                                    <img src="assets/imgs/page/job-single/industry.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description industry-icon mb-10">Industry</span>
                                                    <strong className="small-heading">{job.industry || "Industry not provided"}</strong>
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img src="assets/imgs/page/job-single/job-level.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description joblevel-icon mb-10">Job level</span>
                                                    <strong className="small-heading">{job.job_level || "Not specified"}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-25">
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img src="assets/imgs/page/job-single/salary.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description salary-icon mb-10">Salary</span>
                                                    <strong className="small-heading">${job.salary_min} - ${job.salary_max}</strong>
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex">
                                                <div className="sidebar-icon-item">
                                                    <img src="assets/imgs/page/job-single/experience.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description experience-icon mb-10">Experience</span>
                                                    <strong className="small-heading">{job.experience || "Not specified"}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-25">
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img src="assets/imgs/page/job-single/job-type.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description jobtype-icon mb-10">Job type</span>
                                                    <strong className="small-heading">{job.job_type || "Permanent"}</strong>
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img src="assets/imgs/page/job-single/location.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description mb-10">Location</span>
                                                    <strong className="small-heading">{job.location || "Remote"}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="content-single">
                                        <h4>Job Description</h4>
                                        <p>{job.job_description || "Job description not available."}</p>

                                        <h4>Essential Knowledge, Skills, and Experience</h4>
                                        <ul>
                                            {job.skills && job.skills.map((skill, index) => (
                                                <li key={index}>{skill}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="single-apply-jobs">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <Link href="/job-details">
                                                    Apply now
                                                </Link>
                                                <Link href="/job-details">
                                                    Save job
                                                </Link>
                                            </div>
                                        </div>
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
                                <div className="mt-50">
                                <FeaturedSlider featuredJobs={featuredJobs} />
                            </div>
                                    <div className="text-center">
                                        <Link href="#">
                                            Load more posts
                                        </Link>
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

// Fetch data from the API
export async function getServerSideProps(context) {
    const { id } = context.query;
    console.log("ID:", id);

    try {
        const res = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch job details: ${res.status}`);
        }

        const job = await res.json();

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