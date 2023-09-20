'use client'
import React, { useState,useRef,useEffect} from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import {message} from "antd"
import { getJobapplication, jobForm, updateApplication } from '../../apis/job';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';



function JobForm() {
   
  const searchParams = useSearchParams()
  const param=searchParams.get("update")
  const [job,setjob]=useState<any>()
    const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const role=useRef<HTMLInputElement>(null)
  const desc=useRef<HTMLTextAreaElement>(null);
  const experienceFrom=useRef<HTMLInputElement>(null)
  const experienceTo=useRef<HTMLInputElement>(null);
  const salaryFrom=useRef<HTMLInputElement>(null);
  const salaryTo=useRef<HTMLInputElement>(null);
  const education=useRef<HTMLTextAreaElement>(null);
  const workMode=useRef<HTMLSelectElement>(null);
  const city=useRef<HTMLInputElement>(null);
  const state=useRef<HTMLInputElement>(null);
  const country=useRef<HTMLInputElement>(null);
  
  const router=useRouter()


  const userId: string = useAppSelector((state) => state.authReducer.value.userId);


  useEffect(()=>{
     const fetchData=async ()=>{
      try{
        if(param){
         
          const res=await getJobapplication(param)
          console.log(res.data)
          setSkills(res.data.skills)
          setjob(res.data)
          let location=res.data.location.split(',')
          if(city.current && state.current && country.current){
            city.current.value=location[0];
            state.current.value=location[1]
            country.current.value=location[2];
          } 
         

        }
      }catch(err){
        throw err
      }

     }
     fetchData()
  },[])

  const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
       try{
          e.preventDefault()
           const jobData={
              company:userId,
              role:role.current?.value,
              desc:desc.current?.value,
              experience:experienceFrom.current?.value&& experienceTo.current?.value ? [parseInt(experienceFrom.current?.value),parseInt(experienceTo.current?.value)] : [0,0],
              salary:salaryFrom.current?.value&&salaryTo.current?.value ? [parseInt(salaryFrom.current?.value),parseInt(salaryTo.current?.value)] : [0,0],
              education:education.current?.value,
               workmode:workMode.current?.value,
               skills:skills,
               location:city.current?.value+","+state.current?.value+","+country.current?.value
           }

           if(job){
            const jobData={
              company:userId,
              role:role.current?.value,
              desc:desc.current?.value,
              experience:experienceFrom.current?.value&& experienceTo.current?.value ? [parseInt(experienceFrom.current?.value),parseInt(experienceTo.current?.value)] : [0,0],
              salary:salaryFrom.current?.value&&salaryTo.current?.value ? [parseInt(salaryFrom.current?.value),parseInt(salaryTo.current?.value)] : [0,0],
              education:education.current?.value,
               workmode:workMode.current?.value,
               location:city.current?.value+","+state.current?.value+","+country.current?.value,
               skills:skills,
               
           }
            if(param){
              const res=await updateApplication(param,jobData)
             console.log(res.data)
             router.push("/company")
             return
            }  
           
           }

           const res=await jobForm(jobData)
           message.success(res?.data.message)
           router.push("/company")
       }catch(err){
        console.log(err)
       }
  }
  
  

  const handleAddSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (skillInput.trim() !== '') {
      setSkills((prevSkills) => [...prevSkills, skillInput]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index:number) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
             Role
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter the job title"
            className="mt-1 block w-full p-2 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={role}
            defaultValue={job && job.role}
            required
          />
          <label htmlFor="username" className="block text-sm font-medium mt-5 text-gray-700">
             Description
          </label>
          <textarea id="w3review" name="w3review" rows={5} cols={50} className='mt-1 border-2 border-gray-400 rounded-lg overflow-x-auto p-2 w-full' defaultValue={job && job.desc} placeholder='Enter the job description' ref={desc} required></textarea>
        <label htmlFor="username" className="block mt-5 text-sm font-medium text-gray-700">
          Skills
        </label>
        <div className="flex">
          <input
            id="username"
            type="text"
            placeholder="Enter the skill"
            className="mt-1 block w-full p-2 md:p-2 lg:p-3 border-2 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <button
            className="bg-indigo-950 ml-2 px-2 text-white rounded-lg"
            onClick={handleAddSkill}
          >
            Add
          </button>
        </div>

        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-slate-300 bg-opacity-30 border mx-1 border-slate-200 rounded-xl mt-3 pl-2 inline-block backdrop-filter backdrop-blur-lg"
          >
            {skill}
            <CancelIcon
              onClick={() => handleRemoveSkill(index)}
              className="cursor-pointer ml-2 text-gray-600 hover:text-red-500"
            />
          </div>
        ))}
        <div>
        <label htmlFor="username" className="block text-sm font-medium mt-5  text-gray-700">
             Experience<span className="text-xs">(In years)</span>
          </label>
          <div className='flex'>
          <label htmlFor="username" className="block mr-3 text-sm font-medium mt-5 text-gray-700" >
             From
          </label>
          <input
            id="username"
            type="number"
            ref={experienceFrom}
            
            defaultValue={job && job.experience[0]}
            className="mt-1 block w-full p-1 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <label htmlFor="username" className="block text-sm font-medium mt-5 mx-3 text-gray-700">
             To
          </label>
          <input
            id="username"
            type="number"
            ref={experienceTo}
            defaultValue={job && job.experience[1]}
            className="mt-1 block w-full p-1 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          </div>
        </div>
        <label htmlFor="username" className="block text-sm font-medium mt-5 text-gray-700">
             Education
          </label>
          <textarea id="w3review" name="w3review" rows={3} cols={30} defaultValue={job && job.education} className='mt-1 border-2 border-gray-400 rounded-lg overflow-x-auto p-2 w-full' placeholder='Enter the job description' ref={education}></textarea>
          <label htmlFor="username" className="block text-sm font-medium mt-5  text-gray-700">
             Salary<span className="text-xs">(In lakhs)</span>
          </label>
          <div className='flex'>
          <label htmlFor="username" className="block mr-3 text-sm font-medium mt-5 text-gray-700">
             From
          </label>
          <input
            id="username"
            type="number"
            ref={salaryFrom}
            defaultValue={job && job.salary[0]}
            className="mt-1 block w-full p-1 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label htmlFor="username" className="block text-sm font-medium mt-5 mx-3 text-gray-700">
             To
          </label>
          <input
            id="username"
            type="number"
            ref={salaryTo}
            defaultValue={job && job.salary[1]}
            className="mt-1 block w-full p-1 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          </div>
          <label htmlFor="username" className="block text-sm font-medium mt-5 text-gray-700">
             Workmode
          </label>
          <select className='mt-1 block w-full p-1 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm ' ref={workMode} defaultValue={job && job.workmode}>
            {job ? <><option>{job.workmode}</option>
              <option className={(job && job.workmode)==="Remote"?"hidden":""}>Remote</option>
              <option className={(job && job.workmode)==="Hybrid"?"hidden":""}>Hybrid</option>
              <option className={(job && job.workmode)==="On-Site"?"hidden":""}>On-Site</option></>
              :<>
              <option>Remote</option>
            <option>Hybrid</option>
            <option>On-Site</option>
              </>
            }
            
          </select>
          <label htmlFor="username" className="block text-sm font-medium mt-5  text-gray-700">
             Location
          </label>
          <div className=' md:flex'>
          <label htmlFor="username" className="block mr-3 text-sm font-medium mt-5 text-gray-700">
             City
          </label>
          <input
            id="username"
            type="text"
            ref={city}
            className="mt-1 block w-full p-1 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <label htmlFor="username" className="block text-sm font-medium mt-5 md:mx-3 text-gray-700">
             State
          </label>
          <input
            id="username"
            type="text"
            ref={state}
            className="mt-1 block w-full p-1 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <label htmlFor="username" className="block text-sm font-medium mt-5 md:mx-3 text-gray-700">
             Country
          </label>
          <input
            id="username"
            type="text"
            ref={country}
            className="mt-1 block w-full p-1 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          </div>
          
          <button className='bg-indigo-950 text-white p-3 font-semibold rounded-lg mt-8 w-full' type='submit'>
            {job? "Update":"Submit"}
          </button>
      </form>
    </div>
  );
}

export default JobForm;
