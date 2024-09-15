import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns"; // Import the date-fns function

SwiperCore.use([Navigation]);

const FeaturedSlider = ({ featuredJobs }) => {
    const getRelativeTime = (jobCreated) => {
        const jobDate = new Date(jobCreated); // Parse job creation date
        return formatDistanceToNow(jobDate, { addSuffix: true }); // Get relative time (e.g., '3 days ago')
    };

    return (
        <>
            <div className="swiper-container swiper-group-4">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    loop={true}
                    navigation={{
                        prevEl: ".swiper-button-prev-4",
                        nextEl: ".swiper-button-next-4"
                    }}
                    className="swiper-wrapper pb-10 pt-5"
                >
                    {featuredJobs && featuredJobs.length > 0 ? (
                        featuredJobs.map((job) => (
                            <SwiperSlide key={job.id}>
                                <div className="card-grid-2 hover-up wow animate__animated animate__fadeIn">
                                    <div className="card-grid-2-image-left">
                                        <span className="flash" />
                                        <div className="image-box logo-background">
                                            <img
                                                src={job.company_logo || "/assets/imgs/brands/default-logo.png"}
                                                alt="jobBox"
                                                className="company-logo-img"
                                            />
                                        </div>
                                        <div className="right-info">
                                            <Link href={`/company-details/${job.companyId}`} legacyBehavior>
                                                <a className="name-job">{job.company_name || "Company Name"}</a>
                                            </Link>
                                            <span className="location-small">{job.location || "Location not provided"}</span>
                                        </div>
                                    </div>
                                    <div className="card-block-info">
                                        <h6>
                                            <Link href={`/job-details/${job.id}`} legacyBehavior>
                                                <a>{job.title || "Job Title"}</a>
                                            </Link>
                                        </h6>
                                        <div className="mt-5">
                                            <span className="card-briefcase">{job.jobType || "Full time"}</span>
                                            <span className="card-time">
                                                {getRelativeTime(job.job_created)} {/* Dynamic time ago */}
                                            </span>
                                        </div>
                                        <p className="font-sm color-text-paragraph mt-15">{job.description || "No description available."}</p>
                                        <div className="mt-30">
                                            {job.skills && job.skills.map((skill, index) => (
                                                <Link href={`/jobs-grid?skill=${skill}`} key={index} legacyBehavior>
                                                    <a className="btn btn-grey-small mr-5">{skill}</a>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="card-2-bottom mt-30">
                                            <div className="row">
                                                <div className="col-lg-7 col-7">
                                                    <span className="card-text-price">${job.salary_min || "Not provided"} - </span>
                                                    <span className="card-text-price">${job.salary_max || "Not provided"}</span>
                                                </div>
                                                <div className="col-lg-5 col-5 text-end">
                                                    <Link href={`/job-details/${job.id}`} legacyBehavior>
                                                        <a className="btn btn-apply-now">Apply now</a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div>No featured jobs available</div>
                    )}
                </Swiper>

                <div className="swiper-button-next swiper-button-next-4" />
                <div className="swiper-button-prev swiper-button-prev-4" />
            </div>

            {/* Styled JSX for adding styles in the same file */}
            <style jsx>{`
                .card-grid-2-image-left {
                    display: flex;
                    align-items: flex-start; /* Aligns the top of the logo with the text */
                }

                .logo-background {
                    background-color: #ffffff; /* Match the card background color for blending */
                    padding: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
                    width: 80px; /* Adjust width for better alignment */
                    height: 80px; /* Adjust height for better alignment */
                    margin-right: 20px; /* Space between logo and text */
                }

                .company-logo-img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                    background-color: transparent;
                }

                .card-grid-2 {
                    background-color: #ffffff;
                    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .card-grid-2:hover {
                    transform: translateY(-10px); /* Slight hover effect for card */
                }

                .card-block-info {
                    padding: 15px; /* Card content padding */
                }

                .right-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-top: 10px; /* Ensure alignment with logo */
                }

                .name-job {
                    font-weight: bold;
                    margin-bottom: 5px; /* Adds spacing between company name and location */
                }

                .location-small {
                    font-size: 0.875rem;
                    color: #6c757d;
                }

                .card-briefcase {
                    font-size: 0.875rem;
                    color: #6c757d;
                }

                .card-time {
                    font-size: 0.875rem;
                    color: #6c757d;
                }

                .card-text-price {
                    font-size: 0.75rem; /* Further reduce the font size of the salary */
                    font-weight: bold;
                    color: #333;
                }
            `}</style>
        </>
    );
};

export default FeaturedSlider;
