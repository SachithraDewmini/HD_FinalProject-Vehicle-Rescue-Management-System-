import React from 'react'
import { Link } from 'react-router-dom'
import Customer from '../../Images/Customer.png'
import Mechanic from '../../Images/Mechanic.png'
import RentalOwner from '../../Images/RentalOwner.png'
import Troller from '../../Images/Troller.png'

const Services = () => {
  return (
    <div className='container py-20'>
     <div className='text-center'>
        <h1 className='text-6xl font-semibold mb-6'>SERVICES</h1>
        </div> 
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div>
                <img src={Customer} alt='Customer' className='w-50 h-40 object-cover'  />
                <div className='flex gap-2 items-center md:justify-start justify-center h-40'>
                    <button className='primary-btn'>
                    <Link to="/customer">
                        Customer Services
                        </Link></button>
                </div>
            </div>
            <div>
            <img src={Mechanic} alt='Mechanic' className='w-50 h-40 object-cover' />
                <div className='flex gap-2 items-center md:justify-start justify-center h-40'>
                    <button className='primary-btn'>
                    <Link to="/mechanic">
                        Mechanic Services
                    </Link></button>
                </div>
               </div>
            <div>
            <img src={Troller} alt='Troller' className='w-50 h-40 object-cover' />
                <div className='flex gap-2 items-center md:justify-start justify-center h-40'>
                    <button className='primary-btn'>
                    <Link to="/troller">
                    Troller Services
                    </Link></button>
                </div>
            </div>
            <div>
            <img src={RentalOwner} alt='RentalOwner' className='w-50 h-40 object-cover'/>
                <div className='flex gap-2 items-center md:justify-start justify-center h-40'>
                    <button className='primary-btn' >
                    <Link to="/rentalowner">
                        Rental Owner Services
                        </Link></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services
