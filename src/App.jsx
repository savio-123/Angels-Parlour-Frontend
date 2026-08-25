import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from "./pages/Home";
import BookAppointment from "./pages/Booking";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {

  return (
    <BrowserRouter>
     <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/book-appointment/:id" element={<BookAppointment />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App