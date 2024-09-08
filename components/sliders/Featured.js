import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

SwiperCore.use([Navigation]);

const FeaturedSlider = ({ featuredJobs }) => {
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
                                        <div className="image-box">
                                            <img src={job.companyLogo || "/assets/imgs/brands/default-logo.png"} alt="jobBox" />
                                        </div>
                                        <div className="right-info">
                                            <Link href={`/company-details/${job.companyId}`} legacyBehavior>
                                                <a className="name-job">{job.companyName || "Company Name"}</a>
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
                                                {job.postedTime || "Just now"}
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
                                                    <span className="card-text-price">${job.salary || "Not provided"}</span>
                                                    <span className="text-muted">/Hour</span>
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
        </>
    );
};

export default FeaturedSlider;
