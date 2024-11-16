import React from 'react';
import { CiYoutube } from "react-icons/ci";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <div className='bg-black'>
      
      <div className='text-center text-white py-3'>
        <h1 className='text-4xl font-semibold mb-10'>CONTACT US</h1>
      </div>

      
      <div className='flex justify-center items-center mb-8 py-0'>
        <ul className='flex items-center gap-8 text-white'>
         
          <li className='text-2xl flex items-center hover:text-blue-500'>
            <FaFacebook className='mr-2 text-4xl' />
            <a 
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
            >
             
            </a>
          </li>

          
          <li className='text-2xl flex items-center hover:text-red-600'>
            <CiYoutube className='mr-2 text-4xl' />
            <a 
              href='https://www.youtube.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
            >
              
            </a>
          </li>

        
          <li className='text-2xl flex items-center hover:text-green-500'>
            <FaWhatsapp className='mr-2 text-3xl' />
            <a 
              href='https://www.whatsapp.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
            >
            
            </a>
          </li>
        </ul>
      </div>

     
      <div>
        <p className='text-white text-center py-1'>© ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default Contact;
