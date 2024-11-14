import React from 'react';
import HomeImage from '../Images/Home_Image.png';


const Home = () => {
  return (
    <div>
        <div className='container grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]'>
            {/*tet section  */} 
                <div className='flex flex-col justify-center gap-5 text-center md:text-left pt-24 md:p-0 pb-10'>
                <h1 className='text-3xl font-semibold'>FIX & GO</h1>
                <p className='font-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio voluptas ipsa commodi, dignissimos iste dicta molestiae blanditiis eaque voluptatibus modi maiores ad quis. Iste totam eos excepturi in expedita vitae.</p>
                <div className='flex gap-4 items-center md:justify-start justify-center'>
                    <button className='primary-btn'>Download</button>
                </div>
                </div>
             {/*image section  */}   
             <div className='flex flex-col justify-center'>
             <img src={HomeImage} alt='Home Image'  />
            </div> 
            </div>
           
    </div>
    
  )
}

export default Home
