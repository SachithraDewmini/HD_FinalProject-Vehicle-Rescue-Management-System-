import React from 'react';
import AdminLog from '../../Images/AdminLog.png';
import FixAndGo from "../../Images/FixAndGoLogo.png";




const Navbar = () => {
  return (
    <div className='py-4'>
        <div className='container flex justify-between items-center
        '>
            {/* logo section*/}
            <div>
            <img src={FixAndGo} alt='Fix & Go logo' className='w-20 rounded-full' />
                <p className='text-lg font-semibold'>FIX<span className='text-primary text-4xl'>&</span>GO</p>
            </div>
            {/* menu section*/}
            <div className='flex justify-center items-center gap-5'>
                <ul className='flex gap-5'>
                    <li className='hover:border-b-2 border-primary uppercase'>Home</li>
                    <li className='hover:border-b-2 border-primary uppercase'>About</li>
                    <li className='hover:border-b-2 border-primary uppercase'>Services</li>
                    <li className='hover:border-b-2 border-primary uppercase'>Contact</li>  
                </ul>
            </div>
            {/* login section*/}
            <div>
                <img src={AdminLog} alt='Admin log' className='w-8 rounded-full' />
            </div>
        </div>
      
    </div>
  )
}

export default Navbar
