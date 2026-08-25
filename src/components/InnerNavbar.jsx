import React, { useEffect, useState } from "react";
import {
    Link,
    useLocation
} from "react-router-dom";

import { Menu, X } from "lucide-react";

import "../styles/InnerNavbar.css";

function InnerNavbar({ transparent = false }) {

    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();

    const isBookingPage =
        location.pathname === "/book-appointment";


    useEffect(() => {

        if (menuOpen) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "auto";

        }

        return () => {

            document.body.style.overflow = "auto";

        };

    }, [menuOpen]);


    return (

        <>

            <nav
                className={`inner-navbar ${
                    transparent
                        ? "transparent-navbar"
                        : ""
                }`}
            >

                <div className="container inner-nav-container">

                    {/* LOGO */}

                    <Link
                        to="/"
                        className="inner-brand-logo"
                    >

                        <img
                            src="/footer-logo.png"
                            alt="Logo"
                            className="inner-brand-image"
                        />

                    </Link>


                    {/* DESKTOP LINKS */}

                    <div className="inner-nav-links">

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/services">
                            Services
                        </Link>

                        <Link to="/about">
                            About
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                    </div>


                    {/* DESKTOP BOOKING BUTTON */}

                    <div className="inner-nav-buttons">

                        {
                            !isBookingPage && (

                                <Link
                                    to="/book-appointment"
                                    className="inner-book-btn"
                                >
                                    BOOK A VISIT
                                </Link>

                            )
                        }

                    </div>


                    {/* MOBILE MENU BUTTON */}

                    <button
                        aria-label="Open Menu"
                        className="inner-mobile-btn"
                        onClick={() =>
                            setMenuOpen(true)
                        }
                    >

                        <Menu size={28} />

                    </button>

                </div>

            </nav>


            {/* MOBILE OVERLAY */}

            <div
                className={`mobile-overlay ${
                    menuOpen
                        ? "show-overlay"
                        : ""
                }`}
                onClick={() =>
                    setMenuOpen(false)
                }
            />


            {/* MOBILE DRAWER */}

            <div
                className={`mobile-drawer ${
                    menuOpen
                        ? "show-drawer"
                        : ""
                }`}
            >

                <button
                    aria-label="Close Menu"
                    className="drawer-close"
                    onClick={() =>
                        setMenuOpen(false)
                    }
                >

                    <X size={24} />

                </button>


                {/* MOBILE LINKS */}

                <div className="drawer-links">

                    <Link
                        to="/"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Home
                    </Link>

                    <Link
                        to="/services"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Services
                    </Link>

                    <Link
                        to="/about"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Contact
                    </Link>

                </div>


                {/* MOBILE BOTTOM */}

                <div className="drawer-bottom">

                    <p>

                        Thamarassery,
                        <br />

                        Kozhikode, Kerala
                        <br />

                        MON - SAT : 9:00 am - 8:00 pm
                        <br />

                        <span>

                            +91 9526 999 111
                            <br />

                            info@angelsbeautyparlour.com

                        </span>

                    </p>


                    {
                        !isBookingPage && (

                            <Link
                                to="/book-appointment"
                                className="drawer-book-btn"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                            >
                                BOOK A VISIT
                            </Link>

                        )
                    }

                </div>

            </div>

        </>
    );
}

export default InnerNavbar;