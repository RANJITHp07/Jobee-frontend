'use client'
import React, { useEffect,useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { getAllcompanies, getPhoto } from '@/apis/company';

export default function App() {
  const [companies,setcompanies]=useState<any>([])
  const [url,setImageurl]=useState<string[]>([])

  useEffect(()=>{
    const fecthData=async()=>{
      const res=await getAllcompanies()
      setcompanies(res.data)
    }
    fecthData()
  },[])

  const getUrl=async(imageName:string)=>{
    if(imageName!=''){
      const res=await getPhoto(imageName);
      console.log(res.data)
      return res.data
    }
    
  }

  useEffect(() => {
    const fetchMessageUrls = async () => {
      
        const imageUrlPromises = companies.map(async (p:any) => {
            
          return getUrl(p.logo);
          
        
      });
  
      const resolvedUrls = await Promise.all(imageUrlPromises);
      console.log(resolvedUrls)
      setImageurl(resolvedUrls);
    };
  
    fetchMessageUrls();

      
      
  }, [companies]);



  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
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
        
        {
          companies.map((p:any,index:number)=>{
            return (
              <SwiperSlide className='companies'>
              <div className='box_shadow my-3 h-72  p-5 '>
                <Image src={url[index]} width={100} height={100} alt='photo' className='mt-3 h-32 w-24' />
                <p className='font-extrabold text-indigo-950 text-center mt-3'>{p.companyId.username}</p>
                <p className='text-center text-slate-500 mb-5'>{p.companyType}</p>
              </div>
            </SwiperSlide >
            )
          })
        }
        
        
        
        
        
        
        
      </Swiper>
    </>
  );
}
