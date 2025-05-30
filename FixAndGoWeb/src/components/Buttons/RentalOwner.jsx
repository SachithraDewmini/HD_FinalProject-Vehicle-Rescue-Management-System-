import { Link } from 'react-router-dom';
import RS from '../../Images/RS.png';

const RentalOwner = () => {
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
        <h1 className='text-6xl font-semibold'>RENTAL OWNER SERVICES</h1>
      </div>

      {/* Content and Image Side by Side */}
      <div className='flex flex-col md:flex-row items-center justify-center flex-1 px-6'>

        {/* Image Section on the Left */}
        <div className='w-full md:w-1/2 flex justify-center mb-8 md:mb-0'>
          <img
            src={RS}
            alt='Rental Service'
            className='w-[85%] md:max-h-[70vh] object-contain'
          />
        </div>

        {/* Text Section on the Right */}
        <div className='w-full md:w-1/2'>
          <p className='font-semibold mb-4'>- Short-Term and Long-Term Rentals – Availability of vehicles</p>
          <p className='font-semibold mb-4'>- Driver Assistance – Option for rentals with professional drivers</p>
          <p className='font-semibold mb-4'>- Flexible Pickup and Drop-off – Convenient vehicle collection and return options.</p>
          <p className='font-semibold mb-4'>- Customer Messaging – Direct communication with customers to confirm bookings</p>

          <div className='flex gap-4 mt-6 md:justify-start justify-center'>
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

export default RentalOwner;
