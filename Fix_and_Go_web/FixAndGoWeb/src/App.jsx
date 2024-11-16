import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './components/About/About';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Services from './components/Services/Services';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
       
      <Route path="/" element={<><Home /><About /><Services /><Contact /></>} />
        <Route path="/about" element={<><About /><Contact /></>} />
        <Route path="/services" element={<><Services /><Contact /></>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<><Login /></>} />
        <Route path="/customer" element={<><Customer /><Contact /></>} />
        <Route path="/troller" element={<><Troller /><Contact /></>} />
        <Route path="/mechanic" element={<><Mechanic /><Contact /></>} />
        <Route path="/rentalowner" element={<><RentalOwner /><Contact /></>} />
      </Routes>
    </Router>
  );
};

export default App;
