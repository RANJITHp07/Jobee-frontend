'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import data from '../data/categoryData';
import Link from 'next/link';


export default function Slider(){
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        initialSlide={3}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >

      {
        data.map((p)=>{
          return (
            <SwiperSlide>
              <Link href={`/job?category=${p.name}`}>
              <div className='bg-indigo-950 text-white grid place-content-center py-5 px-12 rounded-xl p-12'>
               < p.icon className='text-8xl md:mx-12 md:mt-6 lg:mt-8' />
               <p className='text-lg  text-center md:fond-extrabold md:mb-6 lg:mb-8'>{p.name}</p>
            </div>
              </Link>
          </SwiperSlide>
          )
        })
      }

        
      </Swiper>
    </>
  );
}
