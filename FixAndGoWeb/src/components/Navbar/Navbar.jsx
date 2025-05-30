import React from 'react';
import { Link } from 'react-router-dom';
import AdminLog from '../../Images/AdminLog.png';
import FixAndGo from '../../Images/FixAndGoLogo.png';
import logout from '../../Images/logout.png';

const Navbar = () => {
  return (
    <div className='py-4 bg-orange-400'>
      <div className='container flex justify-between items-center'>
        {/* Logo Section */}
        <div className='flex items-center'>
          <img src={FixAndGo} alt='Fix & Go logo' className='w-14' />
          <p className='text-3xl font-semibold text-white'>
            FIX<span className='text-6xl'> & </span>GO
          </p>
        </div>

        {/* Menu Section */}
        <div className='flex justify-center items-center gap-5'>
          <ul className='flex gap-5 text-white'>
            <Link to="/">
              <li className='hover:border-b-2 border-white uppercase cursor-pointer'>
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className='hover:border-b-2 border-white uppercase cursor-pointer'>
                About
              </li>
            </Link>
            <Link to="/services">
              <li className='hover:border-b-2 border-white uppercase cursor-pointer'>
                Services
              </li>
            </Link>
          </ul>
        </div>

        {/* Login & Logout Section */}
        <div className='flex items-center gap-4'>
          {/* Login Icon */}
          <Link to="/userLogin">
            <img src={AdminLog} alt='Admin login icon' className='w-11 rounded-full' />
          </Link>
          {/* Logout Icon */}
          <Link to="/logout">
            <img src={logout} alt='Logout icon' className='w-11 rounded-full' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
