import { Link } from 'react-router-dom';
import MS from '../../Images/MS.png';

const Mechanic = () => {
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
      <div className='text-center mb-8 mt-10'>
        <h1 className='text-6xl font-semibold'>MECHANIC SERVICES</h1>
      </div>

      {/* Main Content Section with Text and Image */}
      <div className='flex flex-col md:flex-row items-center justify-center flex-1 px-6 py-4'>

        {/* Text on the Left */}
        <div className='w-full md:w-1/2 mb-8 md:mb-0'>
          <p className='font-semibold mb-4'>
            - Vehicle Repair and Maintenance – Fixing engine issues, brake problems, and general mechanical repairs.
          </p>
          <p className='font-semibold mb-4'>- On-Location Repairs – Providing minor repairs at the breakdown site</p>
          <p className='font-semibold mb-4'>- Spare Parts Installation – Supplying and installing replacement parts.</p>
          <p className='font-semibold mb-4'>- Diagnostic Services – Identifying problems using advanced diagnostic tools</p>
          <p className='font-semibold mb-4'>- Emergency Repairs – Quick fixes during urgent situations.</p>
          <p className='font-semibold mb-4'>- Customer Messaging – Direct communication with customers through the system</p>
          <p className='font-semibold mb-4'>- Feedback Analysis – Reviewing customer ratings to improve service quality</p>
          <div className='flex gap-4 mt-6'>
            <Link to="/userLogin">
              <button className='primary-btn'>Login</button>
            </Link>
            <Link to="/userRegiser">
              <button className='primary-btn'>Register</button>
            </Link>
          </div>
        </div>

        {/* Image on the Right */}
        <div className='w-full md:w-1/2 flex justify-center'>
          <img
            src={MS}
            alt='Mechanic Service'
            className='w-[90%] md:max-h-[70vh] object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default Mechanic;
