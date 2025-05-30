import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddMFeedback from './AddMFeedback';
import AddRFeedback from './AddRFeedback';
import AddTFeedback from './AddTFeedback';
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
import CusRentalView from './CusRentalView';
import CustomerView from './CustomerView';
import CusTrollerView from './CusTrollerView';
import Logout from './Logout';
import MechanicAdd from './MechanicAdd';
import MechanicEdit from './MechanicEdit';
import MechanicFeedback from './MechanicFeedback';
import MechanicView from './MechanicView';
import RentalOwnerAdd from './RentalOwnerAdd';
import RentalOwnerEdit from './RentalOwnerEdit';
import RentalOwnerFeedback from './RentalOwnerFeedback';
import RentalOwnerView from './RentalOwnerView';
import TrollerAdd from './TrollerAdd';
import TrollerEdit from './TrollerEdit';
import TrollerFeedback from './TrollerFeedback';
import TrollerView from './TrollerView';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import ViewMFeedback from './ViewMFeedback';
import ViewRFeedback from './ViewRFeedback';
import ViewTFeedback from './ViewTFeedback';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
       
        <Route path="/" element={<><Home /><About /><Services /><Contact /></>} />
        <Route path="/about" element={<><About /><Contact /></>} />
        <Route path="/services" element={<><Services /><Contact /></>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/customer" element={<><Customer /><Contact /></>} />
        <Route path="/troller" element={<><Troller /><Contact /></>} />
        <Route path="/mechanic" element={<><Mechanic /><Contact /></>} />
        <Route path="/rentalowner" element={<><RentalOwner /><Contact /></>} />
        <Route path="/admindash" element={<Admindashbord />} />
        <Route path="/userRegiser" element={<UserRegister />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/mview" element={<MechanicView />} />
        <Route path="/rview" element={<RentalOwnerView />} />
        <Route path="/tview" element={<TrollerView />} />
        <Route path="/cview" element={<CustomerView />} />
        <Route path="/madd" element={<MechanicAdd />} />
        <Route path="/mfeed" element={<MechanicFeedback />} />
        <Route path="/radd" element={<RentalOwnerAdd />} />
        <Route path="/tadd" element={<TrollerAdd />} />
        <Route path="/tfeed" element={<TrollerFeedback />} />
        <Route path="/medit" element={<MechanicEdit />} />
        <Route path="/redit" element={<RentalOwnerEdit />} />
        <Route path="/rfeed" element={<RentalOwnerFeedback />} />
        <Route path="/tedit" element={<TrollerEdit />} />
        <Route path="/cmview" element={<CusMechanicView />} />
        <Route path="/ctview" element={<CusTrollerView/>} />
        <Route path="/crview" element={<CusRentalView/>} />
        <Route path="/maddfeed" element={<AddMFeedback/>} />
        <Route path="/taddfeed" element={<AddTFeedback/>} />
        <Route path="/raddfeed" element={<AddRFeedback/>} />
        <Route path="/mviewfeed" element={<ViewMFeedback />} />
        <Route path="/tviewfeed" element={<ViewTFeedback />} />
        <Route path="/rviewfeed" element={<ViewRFeedback />} />
      </Routes>
    </Router>
  );
};

export default App;
