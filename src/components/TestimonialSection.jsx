import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import {
    HiArrowLeft,
    HiArrowRight,
    HiArrowUpRight,
    HiStar,
} from "react-icons/hi2";
import "../styles/Testimonial.css";

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/XKLBR9D9FD8sQLHv7";

const testimonials = [
    {
        name: "Anupama Susan",
        date: "5 months ago",
        image: "/testimonials/anupama.webp",
        text: "Nice and relaxing experience. The staff was polite, maintained good hygiene, and service was neat and professional, and I’m happy with the results 😊✨",
    },
    {
        name: "AISWARYA SURESH",
        date: "5 months ago",
        image: "/testimonials/aiswarya.webp",
        text: "Good customer service and nice staffs. As a regular customer i recommend angels beauty parlour because it was too worthy and good for me",
    },
    {
        name: "Sumitha Jose",
        date: "10 months ago",
        image: "/testimonials/sumitha.webp",
        text: "I had an absolutely amazing experience with Shanti Bose! From the moment we started, they were warm, professional, and really took the time to understand the look I wanted. The final result was flawless—beautiful, natural, and long-lasting. I felt confident and stunning the entire day.",
    },
    {
        name: "Athira Suresh",
        date: "2 years ago",
        image: "/testimonials/athira.webp",
        text: "I highly recommend Shanti Bose to anyone in need of a makeup artist for any occasion. Her professionalism, skill, and affordability make her a standout choice. She made my sister's reception look absolutely perfect without making the makeup look too heavy.",
    },
    {
        name: "Loveena Mahendran",
        date: "a year ago",
        image: "/testimonials/loveena.webp",
        text: "Absolutely phenomenal experience at Angle Beauty Salon with Shanty Aunty! The saree was draped perfectly, the makeup was stunning, and the hairstyle stayed put through all the festivities. The entire team was professional, welcoming, and made me feel completely at ease.",
    },
    {
        name: "Shikki Shaji",
        date: "3 years ago",
        image: "/testimonials/shikki.webp",
        text: "You made my special day more memorable. Thank you for being on time. As an artist you are really calm, pious and comfortable to be with. You knew what was best for my skin tone. Thank you so much for your love and support. 😍",
    },
];

const ReviewImage = ({ src, alt, initial, thumbnail = false }) => {
    const [hasError, setHasError] = useState(false);

    return (
        <>
            {!hasError && (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setHasError(true)}
                />
            )}

            {hasError && (
                <span
                    className={
                        thumbnail
                            ? "testimonial-thumb-initial"
                            : "testimonial-initial"
                    }
                >
                    {initial}
                </span>
            )}
        </>
    );
};

const TestimonialSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeReview = testimonials[activeIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(
                (current) => (current + 1) % testimonials.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const showPrevious = () => {
        setActiveIndex(
            (current) =>
                (current - 1 + testimonials.length) % testimonials.length
        );
    };

    const showNext = () => {
        setActiveIndex(
            (current) => (current + 1) % testimonials.length
        );
    };

    return (
        <section className="testimonial-section">
            <div className="container">
                <div className="testimonial-heading">
                    <span className="testimonial-eyebrow">
                        REAL STORIES, REAL BEAUTY
                    </span>

                    <h2>
                        A Little Love
                        <br />
                        From Our Clients
                    </h2>

                    <p>
                        Every visit means something special. Here’s what our
                        clients have to say.
                    </p>
                </div>

                <div className="testimonial-carousel">
                    <div className="testimonial-feature">
                        <div className="testimonial-feature-top">
                            <span className="testimonial-quote-mark">
                                “
                            </span>

                            <span className="testimonial-google-label">
                                <FaGoogle />
                                Google Review
                            </span>
                        </div>

                        <div
                            className="testimonial-rating"
                            aria-label="5 out of 5 stars"
                        >
                            {Array.from({ length: 5 }, (_, index) => (
                                <HiStar key={index} />
                            ))}

                            <span>5.0</span>
                        </div>

                        <blockquote
                            className="testimonial-review-text"
                            key={activeReview.name}
                        >
                            {activeReview.text}
                        </blockquote>

                        <div className="testimonial-feature-bottom">
                            <div className="testimonial-reviewer">
                                <div className="testimonial-reviewer-photo">
                                    <ReviewImage
                                        key={activeReview.image}
                                        src={activeReview.image}
                                        alt={`${activeReview.name} Google profile`}
                                        initial={activeReview.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    />
                                </div>

                                <div className="testimonial-reviewer-details">
                                    <h3>{activeReview.name}</h3>
                                    <p>{activeReview.date}</p>
                                </div>
                            </div>

                            <div className="testimonial-controls">
                                <button
                                    type="button"
                                    onClick={showPrevious}
                                    aria-label="Previous review"
                                >
                                    <HiArrowLeft />
                                </button>

                                <span aria-live="polite">
                                    {String(activeIndex + 1).padStart(2, "0")}
                                    <span className="testimonial-count-divider">
                                        /
                                    </span>
                                    {String(testimonials.length).padStart(
                                        2,
                                        "0"
                                    )}
                                </span>

                                <button
                                    type="button"
                                    onClick={showNext}
                                    aria-label="Next review"
                                >
                                    <HiArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="testimonial-picker">
                    <div className="testimonial-thumbnails">
                        {testimonials.map((review, index) => (
                            <button
                                type="button"
                                key={review.name}
                                className={`testimonial-thumb ${
                                    activeIndex === index ? "active" : ""
                                }`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`Read review by ${review.name}`}
                                aria-pressed={activeIndex === index}
                            >
                                <ReviewImage
                                    key={review.image}
                                    src={review.image}
                                    alt=""
                                    initial={review.name
                                        .charAt(0)
                                        .toUpperCase()}
                                    thumbnail
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="testimonial-footer">
                    <p>
                        Have you visited us? We’d love to hear from you.
                    </p>

                    <a
                        href={GOOGLE_REVIEWS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="testimonial-google-button"
                    >
                        <FaGoogle />
                        Read Reviews on Google
                        <HiArrowUpRight />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;