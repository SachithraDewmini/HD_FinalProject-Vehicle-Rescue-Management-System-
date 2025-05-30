import { Link } from 'react-router-dom';
import CS from '../../Images/CS.png';

const Customer = () => {
  return (
    <div
      style={{
        background: 'radial-gradient(circle, white 30%, #FF681F 100%)',
        height: '100vh',
        width: '100%',
      }}
      className='flex flex-col'
    >
      {/* Title Section */}
      <div className='text-center mt-8'>
        <h1 className='text-6xl font-semibold'>CUSTOMER SERVICES</h1>
      </div>

      {/* Main Content Section with Image and Text */}
      <div className='flex flex-col md:flex-row items-center justify-center flex-1 px-6 py-4'>
        
        {/* Image on the Left */}
        <div className='w-full md:w-1/2 flex justify-center mb-6 md:mb-0'>
          <img
            src={CS}
            alt='Customer Service'
            className='w-[100%] h-auto md:max-h-[85vh] object-contain'
          />
        </div>

        {/* Text on the Right */}
        <div className='w-full md:w-1/2'>
          <p className='font-semibold mb-4'>- Vehicle Repair and Maintenance – Fixing engine issues, brake problems, and general mechanical repairs.</p>
          <p className='font-semibold mb-4'>- On-Location Repairs – Providing minor repairs at the breakdown site</p>
          <p className='font-semibold mb-4'>- Spare Parts Installation – Supplying and installing replacement parts.</p>
          <p className='font-semibold mb-4'>- Diagnostic Services – Identifying problems using advanced diagnostic tools</p>
          <p className='font-semibold mb-4'>- Emergency Repairs – Quick fixes during urgent situations.</p>
          <p className='font-semibold mb-4'>- Customer Messaging – Direct communication with customers through the system</p>
          <p className='font-semibold mb-4'>- Feedback Analysis – Reviewing customer ratings to improve service quality</p>
          
          {/* Buttons */}
          <div className='flex gap-4 mt-6'>
            <Link to="/userLogin">
              <button className='primary-btn'>Login</button>
            </Link>
            <Link to="/userRegiser">
              <button className='primary-btn'>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
