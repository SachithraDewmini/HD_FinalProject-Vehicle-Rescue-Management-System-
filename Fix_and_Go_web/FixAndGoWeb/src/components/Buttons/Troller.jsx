import React from 'react';
import { Link } from 'react-router-dom';
import TS from '../../Images/TS.png';

const Troller = () => {
  return (
    <div
    style={{
      background: 'radial-gradient(circle, white 30%, #FF681F 100%)',
      height: '100vh',
      width: '100%',
    }}
    className='flex flex-col justify-center'
  >
   
    <div className='text-center mb-12 mt-16'>
      <h1 className='text-6xl font-semibold'>TROLLER SERVICES</h1>
    </div>

    
    <div className='container text-center md:text-left mb-8'>
      <p className='font-semibold'>Emergency Towing – Immediate assistance for vehicle breakdowns or accidents</p>
      <p className='font-semibold'>Flatbed Towing – Safe transport of vehicles requiring flatbeds.</p>
      <p className='font-semibold'>Long-Distance Towing – Transporting vehicles across cities or regions.</p>
      <p className='font-semibold'>Specialized Towing – Handling bikes, trucks, and heavy vehicles.</p>
      <p className='font-semibold'>Accident Recovery Services – Clearing and transporting vehicles from accident sites.</p>
      <p className='font-semibold'>Customer Messaging – Communication with customers about towing needs.</p>
      <div className='flex gap-2 items-center md:justify-start justify-center h-40'>
                          <button className='primary-btn'><Link to="/userLogin">
                                                            Login
                                                        </Link></button>
                                    <button className='primary-btn'>
                                                        <Link to="/userRegiser">
                                                            Register
                                                        </Link></button>
                      </div>
    </div>

   
    <div className='flex items-center justify-center'>
      <img src={TS} alt='Home Image' className='max-w-[80%] md:max-w-[40%] lg:max-w-[30%] max-h-[40vh] object-contain' />
    </div> 
    
  </div>
  )
}

export default Troller
