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
        
        <SwiperSlide className='companies'>
  <div className='box_shadow my-3  p-5 '>
    <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5' />
    <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
    <p className='text-center text-slate-500 mb-5'>Start Up</p>
  </div>
</SwiperSlide >
        <SwiperSlide className='companies'>
          <div className='  box_shadow p-5   my-3 '>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='companies'>
          <div className='  box_shadow   p-5  my-3'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='companies'>
          <div className='  box_shadow   p-5  my-3'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='companies'>
          <div className='  box_shadow   my-3'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='companies'>
          <div className='  box_shadow   my-3'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className='companies'>
          <div className='  box_shadow   my-3'>
            <Image src={'/background.png'} width={200} height={200} alt='photo' className='mt-5 '/>
            <p className='font-extrabold text-indigo-950 text-center mt-3'>Intech Spark</p>
            <p className='text-center text-slate-500 mb-5'>Start Up</p>
          </div>
        </SwiperSlide>
        
        
        
        
        
      </Swiper>
    </>
  );
}
