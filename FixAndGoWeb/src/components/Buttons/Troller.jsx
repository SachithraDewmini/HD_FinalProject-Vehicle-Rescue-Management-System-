import { Link } from 'react-router-dom';
import TS from '../../Images/TS.png';

const Troller = () => {
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
        <h1 className='text-6xl font-semibold'>TROLLER SERVICES</h1>
      </div>

      {/* Main Content Section: Text Left, Image Right */}
      <div className='flex flex-col md:flex-row items-center justify-center flex-1 px-6'>

        {/* Text Section */}
        <div className='w-full md:w-1/2 mb-8 md:mb-0'>
          <p className='font-semibold mb-4'>- Emergency Towing – Immediate assistance for vehicle breakdowns or accidents</p>
          <p className='font-semibold mb-4'>- Flatbed Towing – Safe transport of vehicles requiring flatbeds.</p>
          <p className='font-semibold mb-4'>- Long-Distance Towing – Transporting vehicles across cities or regions.</p>
          <p className='font-semibold mb-4'>- Specialized Towing – Handling bikes, trucks, and heavy vehicles.</p>
          <p className='font-semibold mb-4'>- Accident Recovery Services – Clearing and transporting vehicles from accident sites.</p>
          <p className='font-semibold mb-4'>- Customer Messaging – Communication with customers about towing needs.</p>
          <div className='flex gap-4 mt-6'>
            <Link to="/userLogin">
              <button className='primary-btn'>Login</button>
            </Link>
            <Link to="/userRegiser">
              <button className='primary-btn'>Register</button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className='w-full md:w-1/2 flex justify-center'>
          <img
            src={TS}
            alt='Troller Service'
            className='w-[90%] md:max-h-[65vh] object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default Troller;
