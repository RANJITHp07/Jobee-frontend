import React from 'react'

function Detail() {
  return (
    <div className='md:flex md:justify-center my-16 lg:my-32' data-aos="fade-right">
        <div className='box_shadow mx-12 rounded-xl p-8 my-5 lg:px-16'>
           <p className='text-center text-2xl font-bold text-indigo-950'> 500+</p>
           <p className='text-center font-bold text-indigo-950'> Companies To Hire</p>
           <p className='text-center text-sm text-slate-500'>Connecting Talent and <br className='hidden lg:block'/> Opportunities </p>
        </div>
        <div className='box_shadow mx-12 rounded-xl p-8 my-5'>
           <p className='text-center text-2xl font-bold text-indigo-950'> 700+</p>
           <p className='text-center font-bold text-indigo-950'> Happy Employer</p>
           <p className='text-center text-sm text-slate-500'>Empowering Workforce Success<br className='hidden lg:block'/> and happiness</p>
        </div>
        <div className='box_shadow mx-12 rounded-xl p-8 my-5 md:px-9'>
           <p className='text-center text-2xl font-bold text-indigo-950'> 250+</p>
           <p className='text-center font-bold text-indigo-950'>Featured Companies</p>
           <p className='text-center text-sm text-slate-500'>Exceptional Industry Leaders</p>
        </div>
        
    </div>
  )
}

export default Detail