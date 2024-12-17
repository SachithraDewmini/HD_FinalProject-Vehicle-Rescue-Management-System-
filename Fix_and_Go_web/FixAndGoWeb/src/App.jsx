import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admindashbord from './Admindashbord';
import About from './components/About/About';
import Customer from './components/Buttons/Customer';
import Mechanic from './components/Buttons/Mechanic';
import RentalOwner from './components/Buttons/RentalOwner';
import Troller from './components/Buttons/Troller';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Services from './components/Services/Services';
import CusMechanicView from './CusMechanicView';
import CustomerView from './CustomerView';
import Login from './Login';
import MechanicAdd from './MechanicAdd';
import MechanicEdit from './MechanicEdit';
import MechanicView from './MechanicView';
import RentalOwnerAdd from './RentalOwnerAdd';
import RentalOwnerEdit from './RentalOwnerEdit';
import RentalOwnerView from './RentalOwnerView';
import TrollerAdd from './TrollerAdd';
import TrollerEdit from './TrollerEdit';
import TrollerView from './TrollerView';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';

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
        <Route path="/admindash" element={<Admindashbord />} />
        <Route path="/userRegiser" element={<UserRegister />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/mview" element={<MechanicView />} />
        <Route path="/rview" element={<RentalOwnerView />} />
        <Route path="/tview" element={<TrollerView />} />
        <Route path="/cview" element={<CustomerView />} />
        <Route path="/madd" element={<MechanicAdd />} />
        <Route path="/radd" element={<RentalOwnerAdd />} />
        <Route path="/tadd" element={<TrollerAdd />} />
        <Route path="/medit" element={<MechanicEdit />} />
        <Route path="/redit" element={<RentalOwnerEdit />} />
        <Route path="/tedit" element={<TrollerEdit />} />
        <Route path="/cmview" element={<CusMechanicView />} />
      </Routes>
    </Router>
  );
};

export default App;
