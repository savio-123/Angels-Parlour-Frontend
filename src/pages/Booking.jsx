import { useState } from "react";
import { toast } from "react-toastify";
import {
    useParams,
    useNavigate,
} from "react-router-dom";
import {CalendarDays, Clock3} from "lucide-react";
import { Helmet } from "react-helmet-async";

import InnerNavbar from "../components/InnerNavbar";
import Footer from "../components/Footer";
import MovingGallery from "../components/MovingGallery";

import "../styles/Bookingcss.css";
import { services, serviceCategories } from "../data/Services";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;;

function BookAppointment() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        service: id || "",
        appointment_date: "",
        appointment_time: ""
    })


    const selectedService = services.find(
        (service) => service.id === Number(formData.service)
    )

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (
            formData.customer_name.trim().length < 3
        ) {
        
            toast.error(
                "Enter a valid name"
            )
        
            return
        }

        if (
            !/^\d{10}$/.test(
                formData.customer_phone
            )
        ) {
        
            toast.error(
                "Phone number must be 10 digits"
            )
        
            return
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.customer_email
            )
        ) {
        
            toast.error(
                "Enter valid email"
            )
        
            return
        }

        if (!formData.service) {

            toast.error(
                "Please select a service"
            )
        
            return
        }

        if (
            !formData.appointment_date ||
            !formData.appointment_time
        ) {
        
            toast.error(
                "Please select date and time"
            )
        
            return
        }

        const formattedTime = new Date(
            `1970-01-01T${formData.appointment_time}`
        ).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

        setLoading(true);

try {

    const serviceName =
        selectedService?.name ||
        services.find(
            service =>
                service.id === Number(formData.service)
        )?.name;


    /*
    =========================================
    GOOGLE CALENDAR
    =========================================
    */

    const calendarResponse = await fetch(
        GOOGLE_SCRIPT_URL,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "text/plain;charset=utf-8"
            },

            body: JSON.stringify({

                customer_name:
                    formData.customer_name,

                customer_phone:
                    formData.customer_phone,

                customer_email:
                    formData.customer_email,

                service:
                    serviceName,

                appointment_date:
                    formData.appointment_date,

                appointment_time:
                    formData.appointment_time
            })
        }
    );


    const calendarResult =
        await calendarResponse.json();


    if (!calendarResult.success) {

        throw new Error(
            calendarResult.error ||
            "Calendar booking failed"
        );
    }


    /*
    =========================================
    WHATSAPP
    =========================================
    */

    const message = `
Appointment Request:

Name: ${formData.customer_name}
Phone: ${formData.customer_phone}
Email: ${formData.customer_email}
Service: ${serviceName}
Date: ${formData.appointment_date}
Time: ${formattedTime}

Please contact the customer to confirm the appointment.
    `;


    window.open(

        `https://wa.me/919946935725?text=${encodeURIComponent(message)}`,

        "_blank"
    );


    toast.success(
        "Appointment request sent successfully!"
    );


    navigate("/");


} catch (error) {

    console.error(
        "Booking Error:",
        error
    );

    toast.error(
        "Unable to send appointment request."
    );

} finally {

    setLoading(false);

}
    }


    return (

        <>
        <Helmet>

            <title>
              Book Appointment | Angel's Beauty Parlour
            </title>
            <meta
            name="description"
            content="
            Book your beauty appointment online with
            Angel's Beauty Parlour. Quick, easy and secure
            appointment booking.
            "
            />
            <link rel="canonical"
            href="https://angels-frontend.vercel.app/book-appointment"
            />
            </Helmet>

            <InnerNavbar />
            <div className="booking-page">

            <div className="booking-container">

                {/* IMAGE */}

                <div className="booking-image-side">

                    <img
                        src="/Booking.avif"
                        alt=""
                    />

                </div>


                {/* FORM */}

                <div className="booking-form-side">

                    <p className="booking-small-title">

                        BOOK YOUR VISIT

                    </p>

                    <h1 className="booking-title">

                        Luxury Beauty
                        <br />
                        Experience

                    </h1>

                    <p className="booking-description">

                        Reserve your appointment and
                        indulge in a premium beauty
                        experience crafted exclusively
                        for you.

                    </p>

                    <form
                        onSubmit={handleSubmit}

                        className="booking-form"
                        >

                        <input
                            type="text"

                            name="customer_name"

                            placeholder="Your Name"

                            className="
                                form-control
                                booking-input
                            "

                            onChange={handleChange}
                        />


                        <input
                            type="text"

                            name="customer_phone"

                            placeholder="Phone Number"

                            className="
                                form-control
                                booking-input
                            "

                            onChange={handleChange}
                        />


                        <input
                            type="email"

                            name="customer_email"

                            placeholder="Email Address"

                            className="
                                form-control
                                booking-input
                            "

                            onChange={handleChange}
                        />

                            {
                                id ? (

                                    <input
                                        type="text"
                                        className="
                                            form-control
                                            booking-input
                                        "
                                        value={
                                            selectedService?.name || ""
                                        }
                                        disabled
                                    />

                                ) : (

                                    <select
                                        name="service"
                                        value={formData.service}
                                        className="
                                            form-control
                                            booking-input
                                        "
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select Service
                                        </option>

                                        {
                                            serviceCategories.map((category) => (

                                                <optgroup
                                                    key={category.id}
                                                    label={category.name}
                                                >

                                                    {
                                                        category.services.map((service) => (

                                                            <option
                                                                key={service.id}
                                                                value={service.id}
                                                            >
                                                                {service.name}
                                                            </option>

                                                        ))
                                                    }

                                                </optgroup>

                                            ))
                                        }

                                    </select>
                                )
                            }


                        <div className="booking-field">
                            <CalendarDays size={18} />
                            <input
                                type="date"
                                name="appointment_date"
                                value={formData.appointment_date}
                                onChange={handleChange}
                                className="form-control booking-input"
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>


                        <div className="booking-field">
                            <Clock3 size={18} />
                            <input
                                type="time"
                                name="appointment_time"
                                value={formData.appointment_time}
                                onChange={handleChange}
                                className="form-control booking-input"
                            />
                        </div>


                        <button
                            className="booking-btn"

                            disabled={loading}
                        >

                            {
                                loading ? (

                                    <>
                                        <span
                                            className="
                                                spinner-border
                                                spinner-border-sm
                                                me-2
                                            "
                                        ></span>

                                        Booking...

                                    </>

                                ) : (

                                    "CONFIRM APPOINTMENT"
                                )
                            }

                        </button>

                        </form>

                </div>

            </div>

            </div>
            <MovingGallery />
            <Footer />

        </>
    )
}

export default BookAppointment