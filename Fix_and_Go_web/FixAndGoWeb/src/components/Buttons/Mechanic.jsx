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
        <p className='font-semibold'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio voluptas ipsa commodi, dignissimos iste dicta molestiae blanditiis eaque voluptatibus modi maiores ad quis. Iste totam eos excepturi in expedita vitae.
        </p>
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
