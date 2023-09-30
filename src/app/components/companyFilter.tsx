'use client'
import CloseIcon from '@mui/icons-material/Close';
import React,{useEffect,useState} from 'react'
import { company } from '../../services/data/filterData'
import StarIcon from '@mui/icons-material/Star';
import { companyFilter, getLocations, jobCompanies } from '@/apis/job';

function CompanyFilter({setcompanies,setstate}:{setcompanies: React.Dispatch<any>,setstate: React.Dispatch<React.SetStateAction<boolean>>}) {

    const [location,setlocation]=useState([]);
    const [page,setpage]=useState({
        page1:3,
        page2:3,
        page3:3
    })
    const [places,setplaces]=useState<string[]>([]);
    const [companyType,setcompanyType]=useState<string[]>([]);
    const [rating,setrating]=useState<string[]>([])
    
    

    useEffect(()=>{
      const fetchData=async()=>{
        try{
            if(places.length>0 || rating.length>0 || companyType.length>0){
                const filter=await companyFilter(places,rating,companyType)
                
                setcompanies(filter.data)
            }else{
                const filter=await jobCompanies()
                setcompanies(filter.data)
            }
            
            
            
       }catch(err){
           throw err
       }
      }
      fetchData()
    },[rating,companyType,places])


    const handleLocation = (locations: string) => {
        if (places.includes(locations)) {
            setplaces((prev:string[]) => prev.filter((p: any) => locations !== p));
        }else{
            setplaces((prev:string[])=>[...prev,locations])
        }
    };

    const handlecompanyType = (company: string) => {
        if (companyType.includes(company)) {
            setcompanyType((prev:string[]) => prev.filter((p: any) => company!== p));
        }else{
            setcompanyType((prev:string[])=>[...prev,company])
        }
    };

    const handlerating= (r: string) => {
        if (rating.includes(r)) {
            setrating((prev:string[]) => prev.filter((p: any) => r !== p));
        }else{
            setrating((prev:string[])=>[...prev,r])
        }
    };

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                 const res=await getLocations();
                 setlocation(res.data)
            }catch(err){
              throw err
            }
        }
        fetchData()
      },[])
  return (
    <div className='lg:ml-3 bg-white p-5 lg:p-0 md:w-1/4 lg:w-full'>
        <div className='flex justify-end m-2 lg:hidden'>
        <CloseIcon onClick={()=>{setstate(false)}}/>
        </div>
        <p className='font-bold'>All Filters</p>
            <hr className='border-2'/>
         <p className='text-sm mt-8'>COMPANY</p>
             {
                company.slice(0,page.page1).map((p)=>{
                    return (
                        <div className='flex mt-2'>
                        <input type='checkbox' onChange={()=>handlecompanyType(p)} checked={companyType.includes(p)}/>
                        <p className='text-sm ml-2 text-slate-500'>{p}</p>
                        </div>
                    )
                })
             }
             <p className='text-xs mt-2 cursor-pointer' onClick={() => setpage({ ...page, page1: 6 })}>View More</p>
             <hr/>
             <p className='text-sm mt-5'>RATING</p>
             <div className='flex mt-2'>
                        <input type='checkbox' onChange={()=>handlerating("2")} checked={rating.includes("2")} />
                        <p className='text-sm ml-2 text-slate-500'>2<StarIcon className='text-sm star text-yellow-500'/></p>
                        </div>
                        <div className='flex mt-2' >
                        <input type='checkbox' onChange={()=>handlerating("3")} checked={rating.includes("3")} />
                        <p className='text-sm ml-2 text-slate-500'>3<StarIcon className='text-sm star text-yellow-500'/></p>
                        </div>
                        <div className='flex mt-2'  >
                        <input type='checkbox' onChange={()=>handlerating("4")} checked={rating.includes("4")} />
                        <p className='text-sm ml-2 text-slate-500'>4<StarIcon className='text-sm star text-yellow-500'/></p>
                        </div>
                        <div className='flex mt-2'>
                        <input type='checkbox' onChange={()=>handlerating("5")} checked={rating.includes("5")}  />
                        <p className='text-sm ml-2 text-slate-500'>5<StarIcon className='text-sm star text-yellow-500'/></p>
                        </div>
            <hr className='border-1 mt-5'/>
           {location.length>0 &&  <><p className='text-sm mt-5'>LOCATIONS</p>
            {
               location &&  location.slice(1,page.page3).map((p:any)=>{
                    return (
                        <div className='flex mt-2'>
                        <input type='checkbox' onChange={()=>handleLocation(p)} checked={places.includes(p)}/>
                        <p className='text-sm ml-2 text-slate-500'>{p}</p>
                        </div>
                    )
                })
             }
             <p className='text-xs mt-2 cursor-pointer' onClick={() => setpage({ ...page, page3:6 })}>View More</p>
            </>}
    </div>
  )
}

export default CompanyFilter