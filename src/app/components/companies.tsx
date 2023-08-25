'use client'
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          680: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        
        <SwiperSlide>
          <div className='p-5 w-44 box_shadow md:w-56 lg:w-72 my-3  rounded-xl '>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='p-5 w-44 box_shadow md:w-56 lg:w-72 my-3 rounded-xl'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='p-5 w-44 box_shadow md:w-56 lg:w-72 my-3'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='p-5 w-44 box_shadow md:w-56 lg:w-72 my-3'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='p-5 w-44 box_shadow md:w-56 lg:w-72 my-3'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='p-5 w-44 box_shadow md:w-56 lg:w-72 my-3'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='p-5 w-44 box_shadow md:w-56 lg:w-72 my-3'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        
        
        
        
        
      </Swiper>
    </>
  );
}
