import React from 'react'
import Customer from '../../Images/Customer.png'
import Mechanic from '../../Images/Mechanic.png'
import RentalOwner from '../../Images/RentalOwner.png'
import Troller from '../../Images/Troller.png'

const Services = () => {
  return (
    <div className='container py-14'>
     <div className='text-center'>
        <h1 className='text-4xl font-semibold'>SERVICES</h1>
        </div> 
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div>
                <img src={Customer} alt='Customer' className='w-50 h-40 object-cover'  />
                <div className='flex gap-2 items-center md:justify-start justify-center h-40'>
                    <button className='primary-btn'>Customer Services</button>
                </div>
            </div>
            <div>
            <img src={Mechanic} alt='Mechanic' className='w-50 h-40 object-cover' />
                <div className='flex gap-2 items-center md:justify-start justify-center h-40'>
                    <button className='primary-btn'>Mechanic Services</button>
                </div>
               </div>
            <div>
            <img src={Troller} alt='Troller' className='w-50 h-40 object-cover' />
                <div className='flex gap-2 items-center md:justify-start justify-center h-40'>
                    <button className='primary-btn'>Troller Services</button>
                </div>
            </div>
            <div>
            <img src={RentalOwner} alt='RentalOwner' className='w-50 h-40 object-cover'/>
                <div className='flex gap-2 items-center md:justify-start justify-center h-40'>
                    <button className='primary-btn' >Rental Owner Services</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services
