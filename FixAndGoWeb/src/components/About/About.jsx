import React from 'react';
import Image from '../../Images/Image.png';

const About = () => {
  return (
    <div 
      className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-500 to-white'
    >
      {/* About Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-5xl md:text-6xl font-bold text-gray-800'>ABOUT</h1>
      </div>

      {/* About Description */}
      <div className='container max-w-4xl text-center md:text-left mb-10 px-6'>
        
        <p className='text-gray-700 leading-relaxed font-bold'>
          Fix & Go is a comprehensive web and mobile platform designed to provide seamless vehicle breakdown assistance. Whether you need a mechanic, towing service, or a rental vehicle, we connect you with trusted providers quickly and efficiently. Our app features secure user registration, real-time communication, and service ratings to ensure transparency and trust. From mechanics and towing companies to rental vehicle owners, service providers can easily manage profiles, respond to customer inquiries, and enhance their services based on user feedback. At Fix & Go, we prioritize your convenience, safety, and peace of mind, helping you get back on the road with ease.
        </p>
      </div>

      {/* Image Section */}
      <div className='flex items-center justify-center mb-12'>
        <img src={Image} alt='About Us' className='w-full max-w-lg h-auto rounded-md shadow-lg' />
      </div>
    </div>
  );
};

export default About;
