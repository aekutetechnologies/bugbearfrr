/* eslint-disable @next/next/no-img-element */
import Layout from "../components/Layout/Layout";
import CategorySlider from "./../components/sliders/Category";
import TopRekruterSlider from "./../components/sliders/TopRekruter";
import BlogSlider from "./../components/sliders/Blog";
import CategoryTab from "./../components/elements/CategoryTab";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();

        // Redirect to jobs-list with query parameters, including category as an array
        router.push({
            pathname: "/jobs-list",
            query: {
                keyword,
            },
        });
    };

    const handleCategoryChange = (e) => {
        // Update category state as an array
        setCategory([e.target.value]);
    };

    return (
        <>
            <Layout>
                <div className="bg-homepage1" />
                <section className="section-box">
                    <div className="banner-hero hero-1">
                        <div className="banner-inner">
                            <div className="row">
                                <div className="col-xl-8 col-lg-12">
                                    <div className="block-banner">
                                        <h1 className="heading-banner wow animate__animated animate__fadeInUp">
                                            The <span className="color-brand-2">Easiest Way</span>
                                            <br className="d-none d-lg-block" />
                                            to Get Your New Job
                                        </h1>
                                        <div className="banner-description mt-20 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                                            Each month, more than 3 million job seekers turn to <br className="d-none d-lg-block" />
                                            website in their search for work, making over 140,000 <br className="d-none d-lg-block" />
                                            applications every single day
                                        </div>
                                        <div className="form-find mt-40 wow animate__animated animate__fadeIn" data-wow-delay=".2s">
                                            <form onSubmit={handleSearch}>
                                                <input
                                                    className="form-input input-keysearch mr-10"
                                                    type="text"
                                                    placeholder="Your keyword..."
                                                    value={keyword}
                                                    onChange={(e) => setKeyword(e.target.value)}
                                                />
                                                <button className="btn btn-default btn-find font-sm" type="submit">
                                                    Search
                                                </button>
                                            </form>
                                        </div>
                                        <div className="list-tags-banner mt-60 wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
                                            <strong>Popular Searches:</strong>
                                            <Link legacyBehavior href="#">
                                                <a>DevSecOps, </a>
                                            </Link>
                                            <Link legacyBehavior href="#">
                                                <a>VPAT, </a>
                                            </Link>
                                            <Link legacyBehavior href="#">
                                                <a>Network Security, </a>
                                            </Link>
                                            <Link legacyBehavior href="#">
                                                <a>WebProxy, </a>
                                            </Link>
                                            <Link legacyBehavior href="#">
                                                <a>SOCaaS, </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-12 d-none d-xl-block col-md-6">
                                    <div className="banner-imgs">
                                        <div className="block-1 shape-1">
                                            {/* <img className="img-responsive" alt="bugbear" src="assets/imgs/page/homepage1/banner1.png" /> */}
                                            <img className="img-responsive" alt="bugbear" style={{
                                                width: "400px",
                                                height: "260px",
                                                borderLeft: "10px solid #3457D5",
                                                borderBottom: "10px solid #3457D5",
                                                borderTopLeftRadius: "40px",   // Adjust the radius value as needed
                                                borderTopRightRadius: "40px",  // Adjust the radius value as needed
                                                borderBottomRightRadius: "80px" // Adjust the radius value as needed
                                            }}
                                                src="assets/imgs/page/homepage1/nbanner1.jpeg" />
                                        </div>
                                        <div className="block-2 shape-2">
                                            {/* <img className="img-responsive" alt="bugbear" src="assets/imgs/page/homepage1/banner2.png" /> */}
                                            <img className="img-responsive" alt="bugbear" style={{
                                                borderLeft: "5px solid #3457D5",
                                                borderBottom: "5px solid #3457D5",
                                                borderTopLeftRadius: "30px",   // Adjust the radius value as needed
                                                borderTopRightRadius: "30px",  // Adjust the radius value as needed
                                                borderBottomRightRadius: "80px"
                                            }} src="assets/imgs/page/homepage1/nbanner2.jpeg" />
                                        </div>
                                        <div className="block-3 shape-3">
                                            <img className="img-responsive" alt="bugbear" src="assets/imgs/page/homepage1/icon-top-banner.png" />
                                        </div>
                                        <div className="block-4 shape-3">
                                            <img className="img-responsive" alt="bugbear" src="assets/imgs/page/homepage1/icon-bottom-banner.png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="mt-100" />
                <section className="section-box mt-80">
                    <div className="section-box wow animate__animated animate__fadeIn">
                        <div className="container">
                            <div className="text-center">
                                <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Browse by category</h2>
                                <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Find the job that’s perfect for you. about 800+ new jobs everyday</p>
                            </div>
                            <div className="box-swiper mt-50">
                                <CategorySlider />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="section-box mb-30">
                    <div className="container">
                        <div className="box-we-hiring">
                            <div className="text-1">
                                <span className="text-we-are">We are</span>
                                <span className="text-hiring">Hiring</span>
                            </div>
                            <div className="text-2">
                                Let’s <span className="color-brand-1">Work</span> Together
                                <br /> &amp; <span className="color-brand-1">Explore</span> Opportunities
                            </div>
                            <div className="text-3">
                                <div className="btn btn-apply btn-apply-icon" data-bs-toggle="modal" data-bs-target="#ModalApplyJobForm">
                                    Apply now
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <section className="section-box mt-50">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Jobs of the day</h2>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Search and connect with the right candidates faster. </p>
                        </div>
                        <div className="mt-70">
                            <CategoryTab />
                        </div>
                    </div>
                </section>
                <section className="section-box overflow-visible mt-100 mb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-sm-12">
                                <div className="box-image-job">
                                    <img className="img-job-1" alt="bugbear" src="assets/imgs/page/homepage1/img-chart.png" />
                                    <img className="img-job-2" alt="bugbear" src="assets/imgs/page/homepage1/controlcard.png" />
                                    <figure className="wow animate__animated animate__fadeIn">
                                        <img alt="bugbear" src="assets/imgs/page/homepage1/img1.png" />
                                    </figure>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <div className="content-job-inner">
                                    <span className="color-text-mutted text-32">Millions Of Jobs. </span>
                                    <h2 className="text-52 wow animate__animated animate__fadeInUp">
                                        Find The One That’s <span className="color-brand-2">Right</span> For You
                                    </h2>
                                    <div className="mt-40 pr-50 text-md-lh28 wow animate__animated animate__fadeInUp">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide. The right job is out there.</div>
                                    <div className="mt-40">
                                        <div className="wow animate__animated animate__fadeInUp">
                                            <Link legacyBehavior href="/jobs-grid">
                                                <a className="btn btn-default">Search Jobs</a>
                                            </Link>

                                            <Link legacyBehavior href="/page-about">
                                                <a className="btn btn-link">Learn More</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section className="section-box overflow-visible mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                                <div className="text-center">
                                    <h1 className="color-brand-2">
                                        <span className="count">25</span>
                                        <span> K+</span>
                                    </h1>
                                    <h5>Completed Cases</h5>
                                    <p className="font-sm color-text-paragraph mt-10">
                                        We always provide people a <br className="d-none d-lg-block" />
                                        complete solution upon focused of
                                        <br className="d-none d-lg-block" /> any business
                                    </p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                                <div className="text-center">
                                    <h1 className="color-brand-2">
                                        <span className="count">17</span>
                                        <span> +</span>
                                    </h1>
                                    <h5>Our Office</h5>
                                    <p className="font-sm color-text-paragraph mt-10">
                                        We always provide people a <br className="d-none d-lg-block" />
                                        complete solution upon focused of <br className="d-none d-lg-block" />
                                        any business
                                    </p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                                <div className="text-center">
                                    <h1 className="color-brand-2">
                                        <span className="count">86</span>
                                        <span> +</span>
                                    </h1>
                                    <h5>Skilled People</h5>
                                    <p className="font-sm color-text-paragraph mt-10">
                                        We always provide people a <br className="d-none d-lg-block" />
                                        complete solution upon focused of <br className="d-none d-lg-block" />
                                        any business
                                    </p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                                <div className="text-center">
                                    <h1 className="color-brand-2">
                                        <span className="count">28</span>
                                        <span> +</span>
                                    </h1>
                                    <h5>CHappy Clients</h5>
                                    <p className="font-sm color-text-paragraph mt-10">
                                        We always provide people a <br className="d-none d-lg-block" />
                                        complete solution upon focused of <br className="d-none d-lg-block" />
                                        any business
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-50">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Top Recruiters</h2>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Discover your next career move, freelance gig, or internship</p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="box-swiper mt-50">
                            <TopRekruterSlider />
                        </div>
                    </div>
                </section>
                {/* <section className="section-box mt-50">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">Jobs by Location</h2>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Find your favourite jobs and get the benefits of yourself</p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row mt-50">
                            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                                <div className="card-image-top hover-up">
                                    <Link legacyBehavior href="/jobs-grid">
                                        <a>
                                            <div className="image" style={{ backgroundImage: "url(assets/imgs/page/homepage1/location1.png)" }}>
                                                <span className="lbl-hot">Hot</span>
                                            </div>
                                        </a>
                                    </Link>

                                    <div className="informations">
                                        <Link legacyBehavior href="/jobs-grid">
                                            <a>
                                                <h5>Paris, France</h5>
                                            </a>
                                        </Link>

                                        <div className="row">
                                            <div className="col-lg-6 col-6">
                                                <span className="text-14 color-text-paragraph-2">5 Vacancy</span>
                                            </div>
                                            <div className="col-lg-6 col-6 text-end">
                                                <span className="color-text-paragraph-2 text-14">120 companies</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-7 col-sm-12 col-12">
                                <div className="card-image-top hover-up">
                                    <Link legacyBehavior href="/jobs-grid">
                                        <a>
                                            <div className="image" style={{ backgroundImage: "url(assets/imgs/page/homepage1/location2.png)" }}>
                                                <span className="lbl-hot">Trending</span>
                                            </div>
                                        </a>
                                    </Link>

                                    <div className="informations">
                                        <Link legacyBehavior href="/jobs-grid">
                                            <a>
                                                <h5>London, England</h5>
                                            </a>
                                        </Link>

                                        <div className="row">
                                            <div className="col-lg-6 col-6">
                                                <span className="text-14 color-text-paragraph-2">7 Vacancy</span>
                                            </div>
                                            <div className="col-lg-6 col-6 text-end">
                                                <span className="color-text-paragraph-2 text-14">68 companies</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5 col-md-7 col-sm-12 col-12">
                                <div className="card-image-top hover-up">
                                    <Link legacyBehavior href="/jobs-grid">
                                        <a>
                                            <div className="image" style={{ backgroundImage: "url(assets/imgs/page/homepage1/location3.png)" }}>
                                                <span className="lbl-hot">Hot</span>
                                            </div>
                                        </a>
                                    </Link>

                                    <div className="informations">
                                        <Link legacyBehavior href="/jobs-grid">
                                            <a>
                                                <h5>New York, USA</h5>
                                            </a>
                                        </Link>

                                        <div className="row">
                                            <div className="col-lg-6 col-6">
                                                <span className="text-14 color-text-paragraph-2">9 Vacancy</span>
                                            </div>
                                            <div className="col-lg-6 col-6 text-end">
                                                <span className="color-text-paragraph-2 text-14">80 companies</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12">
                                <div className="card-image-top hover-up">
                                    <Link legacyBehavior href="/jobs-grid">
                                        <a>
                                            <div className="image" style={{ backgroundImage: "url(assets/imgs/page/homepage1/location4.png)" }} />
                                        </a>
                                    </Link>

                                    <div className="informations">
                                        <Link legacyBehavior href="/jobs-grid">
                                            <a>
                                                <h5>Amsterdam, Holland</h5>
                                            </a>
                                        </Link>

                                        <div className="row">
                                            <div className="col-lg-6 col-6">
                                                <span className="text-14 color-text-paragraph-2">16 Vacancy</span>
                                            </div>
                                            <div className="col-lg-6 col-6 text-end">
                                                <span className="color-text-paragraph-2 text-14">86 companies</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5 col-md-7 col-sm-12 col-12">
                                <div className="card-image-top hover-up">
                                    <Link legacyBehavior href="/jobs-grid">
                                        <a>
                                            <div className="image" style={{ backgroundImage: "url(assets/imgs/page/homepage1/location5.png)" }} />
                                        </a>
                                    </Link>

                                    <div className="informations">
                                        <Link legacyBehavior href="/jobs-grid">
                                            <a>
                                                <h5>Copenhagen, Denmark</h5>
                                            </a>
                                        </Link>

                                        <div className="row">
                                            <div className="col-lg-6 col-6">
                                                <span className="text-14 color-text-paragraph-2">39 Vacancy</span>
                                            </div>
                                            <div className="col-lg-6 col-6 text-end">
                                                <span className="color-text-paragraph-2 text-14">186 companies</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                                <div className="card-image-top hover-up">
                                    <Link legacyBehavior href="/jobs-grid">
                                        <a>
                                            <div className="image" style={{ backgroundImage: "url(assets/imgs/page/homepage1/location6.png)" }} />
                                        </a>
                                    </Link>

                                    <div className="informations">
                                        <Link legacyBehavior href="/jobs-grid">
                                            <a>
                                                <h5>Berlin, Germany</h5>
                                            </a>
                                        </Link>

                                        <div className="row">
                                            <div className="col-lg-6 col-6">
                                                <span className="text-14 color-text-paragraph-2">15 Vacancy</span>
                                            </div>
                                            <div className="col-lg-6 col-6 text-end">
                                                <span className="color-text-paragraph-2 text-14">632 companies</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-50 mb-50">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">News and Blog</h2>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Get the latest news, updates and tips</p>
                        </div>
                    </div>
                    <div className="container">
                        <div className="mt-50">
                            <div className="box-swiper style-nav-top">
                                <BlogSlider />
                            </div>

                            <div className="text-center">
                                <Link legacyBehavior href="/blog-grid">
                                    <a className="btn btn-brand-1 btn-icon-load mt--30 hover-up">Load More Posts</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section className="section-box mt-50 mb-20">
                    <div className="container">
                        <div className="box-newsletter">
                            <div className="row">
                                <div className="col-xl-3 col-12 text-center d-none d-xl-block" >
                                    {/* <img src="assets/imgs/template/newsletter-left.png" alt="joxBox" /> */}
                                    <img src="assets/imgs/template/newsletter2.jpg" alt="joxBox" style={{ width: "150px", borderRadius: "15px", marginRight: "13px", display: "absolute", top: "0" }} />
                                    <img src="assets/imgs/template/newsletter1.jpg" alt="joxBox" style={{ width: "100px", borderRadius: "15px" }} />
                                    <img src="assets/imgs/template/newsletter3.jpg" alt="joxBox" style={{ width: "150px", borderRadius: "15px" }} />
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
                                    <img
                                        src="assets/imgs/template/newsletter4.jpeg"
                                        alt="joxBox"
                                        style={{
                                            width: "150px",
                                            borderRadius: "15px",
                                            position: "relative",
                                            top: "-50px",  // Moves the image 10px down
                                            left: "-10px"  // Moves the image 20px to the right
                                        }}
                                    />
                                    <img
                                        src="assets/imgs/template/newsletter1.jpg"
                                        alt="joxBox"
                                        style={{
                                            width: "80px",
                                            borderRadius: "15px",
                                            position: "relative",
                                            top: "80px",   // Moves the image 20px down
                                            left: "-10px"  // Moves the image 10px to the left
                                        }}
                                    />
                                    {/* <img src="assets/imgs/template/newsletter3.jpg" alt="joxBox"  style={{width:"150px",borderRadius:"15px"}}/> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
