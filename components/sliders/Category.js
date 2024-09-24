import Link from "next/link";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";

SwiperCore.use([Navigation]);

import "swiper/css/grid";
import { Grid } from "swiper";

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);

    // Fetch data from backend API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/jobs/categories"); // Update this URL to match your backend endpoint
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <div className="swiper-container swiper-group-5">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    navigation={{
                        prevEl: ".swiper-button-prev",
                        nextEl: ".swiper-button-next"
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        575: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        767: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        991: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        1199: {
                            slidesPerView: 5,
                            spaceBetween: 30
                        }
                    }}
                    className="swiper-wrapper pb-70 pt-5 swiper-grid-jobobx"
                >
                    {categories.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className="swiper-slide hover-up" style={{ height: '200px' }}> {/* Set fixed height to maintain uniform size */}
                                <Link href="/jobs-list">
                                    <div className="item-logo" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                                        {/* Optional image section can be uncommented */}
                                        <div className="image-left">
                                            <img alt="category" src="assets/imgs/page/homepage1/lightning.svg" />
                                        </div>
                                        <div className="text-info-right">
                                            <h4 style={{ 
                                                whiteSpace: 'nowrap', 
                                                overflow: 'hidden', 
                                                textOverflow: 'ellipsis', 
                                                maxWidth: '150px' /* Adjust as needed to control max width */
                                            }}>
                                                {item.name}
                                            </h4>
                                            <p className="font-xs">
                                                {item.job_count}
                                                <span> Jobs Available</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="swiper-button-next" />
            <div className="swiper-button-prev" />
        </>
    );
};

export default CategorySlider;
