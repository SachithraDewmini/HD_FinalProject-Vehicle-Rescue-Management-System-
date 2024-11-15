import React from 'react'
import Image from '../../Images/Image.png'

const About = () => {
  return (
    <div 
      style={{
        background: 'radial-gradient(circle, #FF681F 10%, white 100%)',
        height: '100vh',
        width: '100%',
      }}  
      className='container flex flex-col justify-center'>
        
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-6xl font-semibold'>ABOUT</h1>
      </div>
                
      {/* Paragraph Section */}
      <div className='text-center md:text-left mb-8'>
        <p className='font-semibold'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio voluptas ipsa commodi, dignissimos iste dicta molestiae blanditiis eaque voluptatibus modi maiores ad quis. Iste totam eos excepturi in expedita vitae.
        </p>
      </div>
                
      {/* Image Section */}
      <div className='flex items-center justify-center mb-12'>
        <img src={Image} alt='Home Image' className='w-85 h-auto'/>
      </div>
           
    </div>
  )
}

export default About
