'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from "next/image"
import Navbar from '../components/navbar'
import { useRouter } from 'next/navigation'
import { Searchcomapny, getPhoto} from '@/apis/company'
import { AutoComplete, Input } from 'antd';
import { Pagination } from 'antd';
import CompanyFilter from '../components/companyFilter'
import { companyFilter, jobCompanies } from '@/apis/job'
import StarIcon from '@mui/icons-material/Star';
import LoadinPage from '../components/loadinPage'


function page() {

    const [comapnies,setcomapnies]=useState<any>([])
    const [url,setImageUrl]=useState<any>([])
    const[items,setitems]=useState<any>([])
    const [search,setsearch]=useState<string>('')
    const[pagination,setpagination]=useState(1)
    const [state,setstate]=useState(false)
    const[loading,setloading]=useState(true)
    const [filter,setfilter]=useState([])
    const router=useRouter()

    const handleSearch=async()=>{
          try{
            const res=await Searchcomapny(search)
            setcomapnies(res.data)
          }catch(err){
            throw err
          }
    }

  useEffect(()=>{
    const fetchData=async()=>{
          try{
            const res=await jobCompanies()
            if(res.data){
              const c=res.data.map((p:any)=>({value:p.companyusername}))
              setitems(c)
              setcomapnies(res.data)
              setfilter(res.data)
            }
            setloading(false)
          }catch(err){
            throw err
          }
    }
    fetchData()
  },[])

  const handleSelect = (e:ChangeEvent<HTMLInputElement>) => {
    try{
       const companyFilter=comapnies.filter((p:any)=>{
         return p.companyusername.toLowerCase().includes(e.target.value.toLowerCase());
       })
       setfilter(companyFilter)
    }catch(err){
      throw err
    }
  
  };


  useEffect(() => {
    const fetchMessageUrls = async () => {
      
        const imageUrlPromises = comapnies.map(async (p:any) => {
           const res= await getPhoto(p.logo);
          return res.data
          
        
      });
  
      const resolvedUrls = await Promise.all(imageUrlPromises);
      
      setImageUrl(resolvedUrls);
    };
  
    fetchMessageUrls();
      
      
  }, [comapnies]);

  return (

    <div>
      {
        loading ? <LoadinPage/> :
      <>
       <div className='bg-indigo-950'>
            <Navbar page={true}/>
        </div>
        <button className='text-white font-bold bg-indigo-950 p-2 rounded-xl m-3 lg:hidden' onClick={()=>setstate(true)}>Filter</button>
        <div className='flex'>
        <div className='w-60 p-3 border-r-2 hidden lg:block'>
           <CompanyFilter setcompanies={setfilter} setstate={setstate}/>
        </div>
        {
           state && <div
           className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50 "
         >
           <CompanyFilter setcompanies={setfilter} setstate={setstate}/>
         </div>
        }
        
        
    <div className='w-full lg:w-3/4 mx-5'>
       
        
        <div className="my-6 mx-5 z-20">
          <input type='text' placeholder='Enter the company' onChange={(e:ChangeEvent<HTMLInputElement>)=>handleSelect(e)} className='border-2 w-full p-2 rounded-lg'/>
      
    </div>
        
        {
          filter.length>0 ? filter.slice(pagination * 4 - 4, pagination * 4).map((p:any,index:number)=>{
                return <div className="box_shadow mx-3  md:mx-5 my-5 rounded-lg p-2 cursor-pointer" onClick={()=>router.push(`/company/${p._id}`)}>
                    <div className="md:flex">
                        <div className="grid place-content-center">
                         {url[index*pagination] && <Image src={url[index*pagination]} width={200} height={200} alt=''/>}
                        </div>
                        
                        
                        <div className="mx-5 mt-3">
              <p><span className='font-bold text-slate-800'>Name:</span> {p.companyusername}</p>
              <p><span className='font-bold text-slate-800'>CompanyType:</span> {p.companyType}</p>
            <p><span className='font-bold text-slate-800'>Location:</span> {p.location}</p>
            <p><span className='font-bold text-slate-800'>Rating:</span> {p.rating}<StarIcon className='text-xs text-yellow-500'/></p>
            </div>
                        
                    </div>
                </div>
            }) :  <p className='md:text-8xl text-6xl text-center my-32 text-slate-300 font-medium mx-12'>No Companies available</p>
        }

<Pagination defaultCurrent={1} total={(Math.ceil(comapnies.length / 4) * 10)}  onChange={(e:number) => {
              setpagination(e);
            }} className='text-center mt-32 mb-5' />
    </div>
    </div>
    </>}
    </div>
  )
}

export default page