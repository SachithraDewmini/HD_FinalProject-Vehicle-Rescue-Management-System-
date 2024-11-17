import React from 'react';
import CS from '../../Images/CS.png';

const Customer = () => {
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
      <div className='text-center mt-16'>
        <h1 className='text-6xl font-semibold'>CUSTOMER SERVICES</h1>
      </div>

      {/* Content Section */}
      <div className='container text-center md:text-left my-8'>
        <p className='font-semibold mb-8'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio voluptas ipsa commodi, dignissimos iste dicta molestiae blanditiis eaque voluptatibus modi maiores ad quis. Iste totam eos excepturi in expedita vitae.
        </p>
        <div className='flex gap-2 items-center md:justify-start justify-center'>
          <button className='primary-btn'>Download App</button>
        </div>
      </div>

      {/* Image Section */}
      <div className='flex items-center justify-center mb-12'>
        <img
          src={CS}
          alt='Customer Service'
          className='max-w-[100%] max-h-[60vh] object-contain'
        />
      </div>
    </div>
  );
};

export default Customer;
