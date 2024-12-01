// import Link from "next/link";
// import SwiperCore, { Navigation } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { useState, useEffect } from "react";

// SwiperCore.use([Navigation]);

// import "swiper/css/grid";
// import { Grid } from "swiper";

// const CategorySlider = () => {
//     const [categories, setCategories] = useState([]);

//     // Fetch data from backend API
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch("http://3.109.222.157/api/jobs/categories"); // Update this URL to match your backend endpoint
//                 const data = await response.json();
//                 setCategories(data);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     return (
//         <>
//             <div className="swiper-container swiper-group-5">
//                 <Swiper
//                     slidesPerView={5}
//                     spaceBetween={30}
//                     navigation={{
//                         prevEl: ".swiper-button-prev",
//                         nextEl: ".swiper-button-next"
//                     }}
//                     breakpoints={{
//                         320: {
//                             slidesPerView: 1,
//                             spaceBetween: 30
//                         },
//                         575: {
//                             slidesPerView: 2,
//                             spaceBetween: 30
//                         },
//                         767: {
//                             slidesPerView: 2,
//                             spaceBetween: 30
//                         },
//                         991: {
//                             slidesPerView: 3,
//                             spaceBetween: 30
//                         },
//                         1199: {
//                             slidesPerView: 5,
//                             spaceBetween: 30
//                         }
//                     }}
//                     className="swiper-wrapper pb-70 pt-5 swiper-grid-jobobx"
//                 >
//                     {categories.map((item, i) => (
//                         <SwiperSlide key={i}>
//                             <div className="swiper-slide hover-up" style={{ height: '200px' }}> {/* Set fixed height to maintain uniform size */}
//                                 <Link href="/jobs-list">
//                                     <div className="item-logo" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
//                                         {/* Optional image section can be uncommented */}
//                                         <div className="image-left">
//                                             <img alt="category" src="assets/imgs/page/homepage1/lightning.svg" />
//                                         </div>
//                                         <div className="text-info-right">
//                                             <h4 style={{ 
//                                                 whiteSpace: 'nowrap', 
//                                                 overflow: 'hidden', 
//                                                 textOverflow: 'ellipsis', 
//                                                 maxWidth: '150px' /* Adjust as needed to control max width */
//                                             }}>
//                                                 {item.name}
//                                             </h4>
//                                             <p className="font-xs">
//                                                 {item.job_count}
//                                                 <span> Jobs Available</span>
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </div>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </div>

//             <div className="swiper-button-next" />
//             <div className="swiper-button-prev" />
//         </>
//     );
// };

// export default CategorySlider;


import { useState, useEffect } from "react";
import Link from "next/link";

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesToShow = 5; // Number of slides to show at once

    // Fetch data from backend API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://3.109.222.157/api/jobs/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Calculate the total number of slides
    const totalSlides = Math.ceil(categories.length / slidesToShow);

    // Move to the next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    // Move to the previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    return (
        <div className="relative py-10">
            <div className="overflow-hidden px-3">
                <div
                    className="flex  transition-transform duration-500"
                    style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
                >
                    {categories.map((item, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-full md:w-1/3 lg:w-1/5 p-2 "
                        >
                            <div className="bg-white rounded-lg p-4 mx-4 flex items-center justify-center h-52 shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
                                <Link href="/jobs-list">
                                    <div className="flex flex-col items-center">
                                        <div className="mb-3">
                                            <img
                                                alt="category"
                                                className="w-12 h-12"
                                                src="assets/imgs/page/homepage1/lightning.svg"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h4 className="text-lg font-semibold truncate max-w-[150px]">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {item.job_count} <span>Jobs Available</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            {/* Navigation buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-400 transition duration-200 ease-in-out"
            >
                <span className="text-white text-lg font-bold">&lt;</span>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-blue-600 rounded-full shadow-lg hover:bg-blue-400 transition duration-200 ease-in-out"
            >
                <span className="text-white text-lg font-bold">&gt;</span>
            </button>

        </div>
    );
};

export default CategorySlider;
