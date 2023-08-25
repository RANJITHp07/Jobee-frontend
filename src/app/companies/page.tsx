'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from "next/image"
import Navbar from '../components/navbar'
import { useRouter } from 'next/navigation'
import { Searchcomapny} from '@/api/company'
import { AutoComplete, Input } from 'antd';
import { Pagination } from 'antd';
import CompanyFilter from '../components/companyFilter'
import { jobCompanies } from '@/api/job'
import StarIcon from '@mui/icons-material/Star';


function page() {

    const [comapnies,setcomapnies]=useState<any>([])
    const[items,setitems]=useState<any>([])
    const [search,setsearch]=useState<string>('')
    const[pagination,setpagination]=useState(1)
    const [state,setstate]=useState(false)
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
            }
            
          }catch(err){
            throw err
          }
    }
    fetchData()
  },[])

  const handleSelect = (value: string) => {
    setsearch(value); 
  
  };

  return (

    <div>
       <div className='bg-indigo-950'>
            <Navbar page={true}/>
        </div>
        <button className='text-white font-bold bg-indigo-950 p-2 rounded-xl m-3 lg:hidden' onClick={()=>setstate(true)}>Filter</button>
        <div className='flex'>
        <div className='w-60 p-3 border-r-2 hidden lg:block'>
           <CompanyFilter setcompanies={setcomapnies} setstate={setstate}/>
        </div>
        {
           state && <div
           className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50 "
         >
           <CompanyFilter setcompanies={setcomapnies} setstate={setstate}/>
         </div>
        }
        
        
    <div className='w-full lg:w-3/4 mx-5'>
       
        
        <div className="my-3 mx-5">
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        className="w-full text-center my-auto"
        style={{ width: '100%', maxWidth: '1000px', background: '#f0f0f0', borderRadius: '8px' }}
        options={items}
        onSelect={handleSelect}
        
      >
        <Input.Search size="large" placeholder="Search Your Company" onChange={(e:ChangeEvent<HTMLInputElement>)=>setsearch(e.target.value)} onPressEnter={handleSearch} />
      </AutoComplete>
    </div>
        
        {
          comapnies.length>0 ? comapnies.slice(pagination * 4 - 4, pagination * 4).map((p:any)=>{
                return <div className="box_shadow mx-3  md:mx-5 my-5 rounded-lg p-2 cursor-pointer" onClick={()=>router.push(`/company/${p._id}`)}>
                    <div className="md:flex">
                        <div className="grid place-content-center">
                        <Image src={p.logo} width={200} height={200} alt=''/>
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
    </div>
  )
}

export default page