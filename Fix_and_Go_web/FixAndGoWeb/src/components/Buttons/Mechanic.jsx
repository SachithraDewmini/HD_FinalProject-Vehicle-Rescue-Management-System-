import React from 'react';
import MS from '../../Images/MS.png';

const Mechanic = () => {
  return (
    <div
      style={{
        background: 'radial-gradient(circle, white 30%, #FF681F 100%)',
        height: '100vh',
        width: '100%',
      }}
      className='flex flex-col justify-between'
    >
      {/* Title Section */}
      <div className='text-center mb-12 mt-16'>
        <h1 className='text-6xl font-semibold'>MECHANIC SERVICES</h1>
      </div>

      {/* Content Section */}
      <div className='container text-center md:text-left mb-8'>
      <p className='font-semibold mb-8'>
        Vehicle Repair and Maintenance – Fixing engine issues, brake problems, and general mechanical repairs.
        </p>
        <p className='font-semibold mb-8'>On-Location Repairs – Providing minor repairs at the breakdown site</p>
        <p className='font-semibold mb-8'>Spare Parts Installation – Supplying and installing replacement parts.</p>
        <p className='font-semibold mb-8'>Diagnostic Services – Identifying problems using advanced diagnostic tools</p>
        <p className='font-semibold mb-8'>Emergency Repairs – Quick fixes during urgent situations.</p>
        <p className='font-semibold mb-8'>Customer Messaging – Direct communication with customers through the system</p>
        <p className='font-semibold mb-8'>Feedback Analysis – Reviewing customer ratings to improve service quality</p>
        <div className='flex gap-2 items-center md:justify-start justify-center'>
          <button className='primary-btn'>Download App</button>
        </div>
      </div>

      {/* Image Section */}
      <div className='flex items-center justify-center mb-12'>
        <img
          src={MS}
          alt='Mechanic Service'
          className='max-w-[80%] md:max-w-[40%] lg:max-w-[30%] max-h-[40vh] object-contain'
        />
      </div>
    </div>
  );
};

export default Mechanic;
