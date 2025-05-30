import { CiYoutube } from "react-icons/ci";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <div className='bg-black py-4'>
      <div className='max-w-md mx-auto text-white text-center'>

        {/* Title */}
        <h1 className='text-2xl font-semibold mb-4'>CONTACT US</h1>

        {/* Social Icons */}
        <ul className='flex justify-center items-center gap-4 mb-4 text-sm'>
          {/* Facebook */}
          <li className='flex items-center hover:text-blue-500'>
            <FaFacebook className='text-2xl mr-1' />
            <a 
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
            >
              Facebook
            </a>
          </li>

          {/* YouTube */}
          <li className='flex items-center hover:text-red-600'>
            <CiYoutube className='text-2xl mr-1' />
            <a 
              href='https://www.youtube.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
            >
              YouTube
            </a>
          </li>

          {/* WhatsApp */}
          <li className='flex items-center hover:text-green-500'>
            <FaWhatsapp className='text-2xl mr-1' />
            <a 
              href='https://www.whatsapp.com'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
            >
              WhatsApp
            </a>
          </li>
        </ul>

        {/* Footer */}
        <p className='text-xs'>© ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
};

export default Contact;
