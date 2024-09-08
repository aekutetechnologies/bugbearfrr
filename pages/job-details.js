/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import FeaturedSlider from "../../components/sliders/Featured";

export default function JobDetails({ job }) {
    return (
        <>
            <Layout>
                <div>
                    <section className="section-box-2">
                        <div className="container">
                            <div className="banner-hero banner-image-single">
                                <img src="/assets/imgs/page/job-single/thumb.png" alt="jobBox" />
                            </div>
                            <div className="row mt-10">
                                <div className="col-lg-8 col-md-12">
                                    <h3>{job.title || "Job Title"}</h3>
                                    <div className="mt-0 mb-15">
                                        <span className="card-briefcase">{job.job_type || "Fulltime"}</span>
                                        <span className="card-time">Posted on: {new Date(job.job_posted).toLocaleDateString()}</span>
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
                                                    <img src="/assets/imgs/page/job-single/industry.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description industry-icon mb-10">Organization</span>
                                                    <strong className="small-heading">{job.organisation.org_name || "Organization not provided"}</strong>
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img src="/assets/imgs/page/job-single/job-level.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description joblevel-icon mb-10">Job Type</span>
                                                    <strong className="small-heading">{job.job_type || "Not specified"}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-25">
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img src="/assets/imgs/page/job-single/salary.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description salary-icon mb-10">Salary Range</span>
                                                    <strong className="small-heading">${job.salary_min} - ${job.salary_max}</strong>
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex">
                                                <div className="sidebar-icon-item">
                                                    <img src="/assets/imgs/page/job-single/experience.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description experience-icon mb-10">Experience</span>
                                                    <strong className="small-heading">{job.experience.toFixed(1)} years</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-25">
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img src="/assets/imgs/page/job-single/job-type.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description jobtype-icon mb-10">Job Expiry</span>
                                                    <strong className="small-heading">{new Date(job.job_expiry).toLocaleDateString()}</strong>
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img src="/assets/imgs/page/job-single/location.svg" alt="jobBox" />
                                                </div>
                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description mb-10">Location</span>
                                                    <strong className="small-heading">{job.location || "Location not provided"}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="content-single">
                                        <h4>Job Description</h4>
                                        <p>{job.job_description || "Job description goes here."}</p>

                                        <h4>Responsibilities</h4>
                                        <p>{job.responsibilities || "Responsibilities go here."}</p>

                                        <h4>Education</h4>
                                        <p>{job.education || "Education requirements go here."}</p>
                                    </div>

                                    <div className="single-apply-jobs">
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <Link href="#">
                                                    <a className="btn btn-default mr-15">Apply now</a>
                                                </Link>
                                                <Link href="#">
                                                    <a className="btn btn-border">Save job</a>
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
                                    <div className="box-swiper style-nav-top">
                                        <FeaturedSlider />
                                    </div>
                                    <div className="text-center">
                                        <Link href="#">
                                            <a className="btn btn-grey">Load more posts</a>
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
    const { id } = context.query; // Extract job ID from the URL
    const res = await fetch(`http://127.0.0.1:8000/job-details/${id}`); // Fetch data from backend API
    const job = await res.json();

    return {
        props: { job }, // Pass the fetched data as props
    };
}
