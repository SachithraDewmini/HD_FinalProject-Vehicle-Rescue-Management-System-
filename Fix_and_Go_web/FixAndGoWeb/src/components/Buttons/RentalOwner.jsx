import React from 'react';
import RS from '../../Images/RS.png';

const RentalOwner = () => {
  return (
    <div
      style={{
        background: 'radial-gradient(circle,white 30%, #FF681F 100%)',
        height: '100vh',
        width: '100%',
      }}
      className='flex flex-col justify-center'
    >
     
      <div className='text-center mb-12 mt-16'>
        <h1 className='text-6xl font-semibold'>RENTAL OWNER SERVICES</h1>
      </div>

      
      <div className='container text-center md:text-left mb-8'>
        <p className='font-semibold'>Short-Term and Long-Term Rentals – Availability of vehicles </p>
        <p className='font-semibold'>Driver Assistance – Option for rentals with professional drivers</p>
        <p className='font-semibold'>Flexible Pickup and Drop-off – Convenient vehicle collection and return options.</p>
        <p className='font-semibold'>4.	Customer Messaging – Direct communication with customers to confirm bookings</p>

        <div className='flex gap-2 items-center md:justify-start justify-center h-40'>
                    <button className='primary-btn' >
                    
                        Download App
                        </button>
                </div>
      </div>

     
      <div className='flex items-center justify-center'>
        <img src={RS} alt='Rental service image Image' className='max-w-[80%] md:max-w-[40%] lg:max-w-[30%] max-h-[40vh] object-contain' />
      </div> 
      
    </div>
  )
}

export default RentalOwner
