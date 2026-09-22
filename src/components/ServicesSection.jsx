import React, { useEffect } from "react";

import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";

import { serviceCategories } from "../data/Services";


const ServicesSection = () => {

    useEffect(() => {

        const swiper = new Swiper(".services-swiper", {

            modules: [Autoplay],

            loop: true,

            centeredSlides: true,

            slidesPerView: 3,

            speed: 1200,

            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            },

            breakpoints: {

                320: {
                    slidesPerView: 1,
                },

                768: {
                    slidesPerView: 2,
                },

                1024: {
                    slidesPerView: 3,
                },
            },

            on: {
                init: function () {
                    this.autoplay.start();
                }
            }

        });

        return () => {
            swiper.destroy(true, true);
        };

    }, []);


    return (

        <div className="services-section">

            <div className="container-fluid">

                <p className="services-small-title">
                    OUR SERVICES
                </p>

                <h2 className="services-main-title">
                    A range of high-quality beauty services
                </h2>


                <div className="swiper services-swiper">

                    <div className="swiper-wrapper">

                        {
                            serviceCategories.map((category) => {

                                const previewService =
                                    category.services[0];

                                return (

                                    <div
                                        className="swiper-slide"
                                        key={category.id}
                                    >

                                    <div className="service-slide">

                                    <img
                                        src={previewService.image}
                                        alt={category.name}
                                        className="service-slide-image"
                                    />

                                    <div className="service-overlay">

                                        <h3>
                                            {category.name}
                                        </h3>

                                        <Link
                                            to="/services"
                                            className="service-btn"
                                        >
                                            VIEW SERVICES
                                        </Link>

                                    </div>

                                    </div>

                                    </div>

                                );

                            })
                        }

                    </div>

                </div>

            </div>

        </div>
    );
};


export default ServicesSection;