'use client'
import React, { useReducer,useEffect,useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Slider } from 'antd';
import {company, salray} from '../data/filterData';
import { filter, getLocations } from '../../apis/job';
import { initialState } from '../../reducer/filter/initialState';
import { filterReducer } from '../../reducer/filter/reducer';
import StarIcon from '@mui/icons-material/Star';

interface FilterProps {
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
    setjob: React.Dispatch<React.SetStateAction<never[]>>
    param:string|null;
    param1:string|null;
    param3:string|null;
    param4:string|null;
  }

function Filter({setShowFilter,setjob,param,param1,param3,param4}:FilterProps) {

    const [state,dispatch]=useReducer(filterReducer,initialState);
     const [locations,setlocation]=useState([])
    const { selectedWorkModes, selectedsalary, selectedcompany, experience, page ,selectedrating,location} = state;

    const handleWorkModeToggle = (workMode: string) => {
        dispatch({ type: 'WORK_MODE', payload: workMode });
      };
      const handlesalaryToggle = (salray: number[]) => {
        dispatch({ type: 'SALARY', payload: salray });
      };
      
      const handlecompanyToggle = (company: string) => {
        dispatch({ type: 'COMPANY', payload: company });
      };

      const handleSliderRangeChange = (value: [number, number]) => {
        dispatch({ type: 'EXPERIENCE', payload: value });
      };

      const updatePage=(page:{page1:number,page2:number,page3:number})=>{
        dispatch({ type: 'UPDATE_PAGE', payload:page });
      }

      const handleratingToggle = (rating:number) => {
        dispatch({ type: 'RATING', payload: rating });
      };

      const handlelocationToggle = (location:string) => {
        dispatch({ type: 'LOCATION', payload:location });
      };

      useEffect(()=>{
          async function fetchdata(){
            if(selectedWorkModes.length>0 || selectedsalary.length>0 ||selectedrating.length>0 || location.length>0 || selectedcompany.length>0 || (experience[0]!=0 && experience[1]!=100) ){
              const res=await filter(selectedWorkModes,selectedsalary,selectedcompany,experience,selectedrating,location)
              setjob(res.data)
            }else if(!param && !param1 && !param3 && !param4){
              const res=await filter(selectedWorkModes,selectedsalary,selectedcompany,experience,selectedrating,location)
              setjob(res.data)
            }
            
          }
           fetchdata()
        }
      ,[selectedWorkModes,selectedcompany,selectedsalary,experience,selectedrating,location])

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
    <div className='bg-white  w-1/2 md:w-80 lg:w-full overflow-auto'>
        <div className='flex justify-end m-2 lg:hidden'>
        <CloseIcon onClick={()=>{setShowFilter(false)}}/>
        </div>
        <div className='px-3 md:p-7'>
            <p className='font-bold'>All Filters</p>
            <hr className='border-2'/>
            <p className='text-sm mt-3'>WORK MODE</p>
            <div className='flex mt-5'>
            <input type='checkbox' checked={selectedWorkModes.includes("Remote")} onChange={() => handleWorkModeToggle("Remote")} />
            <p className='text-sm ml-2 text-slate-500 '>Remote</p>
            </div>
            <div className='flex mt-2'>
            <input type='checkbox' checked={selectedWorkModes.includes("Hybrid")} onChange={() => handleWorkModeToggle("Hybrid")} />
            <p className='text-sm ml-2 text-slate-500'>Hybrid</p>
            </div>
            <div className='flex mt-2'>
            <input type='checkbox' checked={selectedWorkModes.includes("On-Site")} onChange={() => handleWorkModeToggle("On-Site")} />
            <p className='text-sm ml-2 text-slate-500'>On-Site</p>
            </div>
            <hr className='border-1 mt-2'/>
            <p className='text-sm mt-3'>EXPERIENCE</p>
            <div className='flex mt-3'>
      <p className='text-xs text-slate-500'>0</p>
      <div style={{ flex: 1 }}>
        <Slider range defaultValue={[0,15]}  max={15} onChange={handleSliderRangeChange} />
      </div>
      <p className='text-xs text-slate-500'>15</p>
    </div>
    <hr className='border-1 mt-5'/>
    <p className='text-sm mt-3'>RATING</p>
             <div className='flex mt-2'>
                        <input type='checkbox' checked={selectedrating.includes(2)} onChange={()=>handleratingToggle(2)}/>
                        <p className='text-sm ml-2 text-slate-500'>2<StarIcon className='text-sm text-yellow-500'/></p>
                        </div>
                        <div className='flex mt-2' >
                        <input type='checkbox' checked={selectedrating.includes(3)} onChange={()=>handleratingToggle(3)}/>
                        <p className='text-sm ml-2 text-slate-500'>3<StarIcon className='text-sm text-yellow-500'/></p>
                        </div>
                        <div className='flex mt-2'  >
                        <input type='checkbox' checked={selectedrating.includes(4)} onChange={()=>handleratingToggle(4)}/>
                        <p className='text-sm ml-2 text-slate-500'>4<StarIcon className='text-sm text-yellow-500'/></p>
                        </div>
                        <div className='flex mt-2'>
                        <input type='checkbox' checked={selectedrating.includes(5)} onChange={()=>handleratingToggle(5)}/>
                        <p className='text-sm ml-2 text-slate-500'>5<StarIcon className='text-sm text-yellow-500'/></p>
                        </div>
            <hr className='border-1 mt-5'/>

            <p className='text-sm mt-3'>SALARY</p>
             {
                salray.slice(0,page.page1).map((p)=>{
                    return (
                        <div className='flex mt-2'>
                        <input type='checkbox' checked={selectedsalary.includes(p)} onChange={() => handlesalaryToggle(p)}/>
                        <p className='text-sm ml-2 text-slate-500'>{p[0]}-{p[1]} lakhs</p>
                        </div>
                    )
                })
             }
             <p className='text-xs mt-2 cursor-pointer' onClick={()=>{updatePage({...page,page1:9})}} >View More</p>
             <p className='text-sm mt-3'>COMPANY</p>
             {
                company.slice(0,page.page2).map((p)=>{
                    return (
                        <div className='flex mt-2'>
                        <input type='checkbox' checked={selectedcompany.includes(p)} onChange={() => handlecompanyToggle(p)}/>
                        <p className='text-sm ml-2 text-slate-500'>{p}</p>
                        </div>
                    )
                })
             }
             <p className='text-xs mt-2 cursor-pointer' onClick={()=>{updatePage({...page,page2:9})}} >View More</p>
              
             
             {
              locations.length>0 && <><p className='text-sm mt-3'>LOCATION</p>
             {
               locations  &&  locations.slice(0,page.page3).map((p)=>{
                    return (
                        <div className='flex mt-2'>
                        <input type='checkbox' checked={location.includes(p)} onChange={() => handlelocationToggle(p)}/>
                        <p className='text-sm ml-2 text-slate-500'>{p}</p>
                        </div>
                    )
                })
             }
             <p className='text-xs mt-2 cursor-pointer' onClick={()=>{updatePage({...page,page3:10})}} >View More</p>

             </>}
        </div>


    </div>
  )
}

export default Filter