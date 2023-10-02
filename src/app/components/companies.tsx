'use client'
import React, { useEffect,useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation'
import { Pagination } from 'swiper/modules';
import { getPhoto } from '@/apis/company';
import { jobCompanies } from '@/apis/job';

export default function App() {
  const [companies,setcompanies]=useState<any>([])
  const [url,setImageurl]=useState<string[]>([])
  const router=useRouter()

  useEffect(()=>{
    const fecthData=async()=>{
      const res=await jobCompanies()
      setcompanies(res.data)
    }
    fecthData()
  },[])

  const getUrl=async(imageName:string)=>{
    if(imageName!=''){
      const res=await getPhoto(imageName);
    
      return res.data
    }
    
  }

  useEffect(() => {
    const fetchMessageUrls = async () => {
      
        const imageUrlPromises = companies.map(async (p:any) => {
            
          return getUrl(p.logo);
          
        
      });
  
      const resolvedUrls = await Promise.all(imageUrlPromises);
     
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
              <SwiperSlide className='companies cursor-pointer '>
              <div className='box_shadow my-3 h-72  p-5 rounded-md ' onClick={()=>router.push(`/company/${p._id}`)} >
                {url[index] && <Image src={url[index]} width={100} height={100} alt='photo' className='mt-3 h-32 w-24' /> }
                <p className='font-extrabold text-indigo-950 text-center mt-3'>{p.companyusername}</p>
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
