'use client'
import Navbar from '@/app/components/navbar'
import React,{ChangeEvent,useState,useRef,useEffect,FormEvent} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { company } from '../../data/filterData';
import { message } from 'antd';
import Image from 'next/image';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { uploadlogo,createCompany, getCompany, updateCompany } from '@/api/company';

function page() {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const token=useAppSelector((state)=>state.authReducer.value.token)
  const [Company,setcompany]=useState<any>()
  const [file, setFile] = useState<File | null>(null);
  const [loading,setloading]=useState(true)
  const companyType=useRef<HTMLInputElement>(null);
  const desc=useRef<HTMLTextAreaElement>(null);
  const website=useRef<HTMLInputElement>(null);
  const location=useRef<HTMLInputElement>(null);
  const router=useRouter();


  useEffect(()=>{
    const fetchData=async()=>{
      try{
        if(userId){
          const res=await getCompany(userId)
          setcompany(res.data)
          
          setloading(false)
        }
        setloading(false)
      }catch(err){
       throw err
      }
    }
     fetchData()
  },[userId])


  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if(Company){
        let response
        const data :any={
          website:website.current?.value,
          desc:desc.current?.value,
          companyType:companyType.current?.value,
          location:location.current?.value,
       }
        if(file){
          const formData = new FormData();
          formData.append('file', file);
            response = await uploadlogo(formData,token)
            data.logo=response.data
        }
        
        const res=await updateCompany(Company._id,data,token)
        console.log(res.data)
        router.push("/company")
    }
     if (file) {
        
        const formData = new FormData();
        formData.append('file', file);
          const response = await uploadlogo(formData,token)
        console.log(response.data)
         
        const data={
          companyId:userId,
           website:website.current?.value,
           desc:desc.current?.value,
           companyType:companyType.current?.value,
           location:location.current?.value,
           logo:response.data
        }
       
        console.log(data)
        const res=await createCompany(data,token)
        console.log(res.data)
        message.success("Form succesfully completed")
        router.push("/company")
        
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div >
      <div className="hidden">
        <Navbar page={true}/>
      </div>
        <div className="bg-indigo-950 p-5 w-screen">
        <p className='text-white font-extrabold text-2xl'>Jobee</p>
        </div>
        <form onSubmit={handleUpload}>
        <div className="box_shadow md:w-11/12 mx-auto p-5 md:mt-12  lg:w-1/2">
        <div className="bg-cover mt-8 mb-5 p-2 border-4 border-dotted border-slate-400 grid place-content-center mx-auto  ">
            <label htmlFor="file">
            {file? (
          <Image src={URL.createObjectURL(file)} width={200} height={200} alt="photo" className="rounded-xl" />
        ) : (
          <Image src={Company? Company.logo :"/uploads.jpg"}width={200} height={200} alt="photo" className="rounded-xl" />
        )}
            </label>
            <input type="file" name="file" id="file" accept=".jpg,.jpeg,.webp3" onChange={(e: ChangeEvent<HTMLInputElement>) => { if (e.target.files) setFile(e.target.files[0]) }} className='hidden'/>
          </div>
          <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
             Website
          </label>
          <input
            id="username"
            defaultValue={Company && Company.website}
            type="text"
            placeholder="Enter the company website"
            className=" block w-full p-2 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={website}
            required
          />
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mt-3">
             ComapnyType
          </label>
          <Autocomplete
      
      id="combo-box-demo"
      options={company}
      sx={{ width: 327 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={Company ? Company.companyType : "CompanyType"}
          inputRef={companyType}
          sx={{ border:0 }}
          className="border-none rounded-lg"
        />
      )}
      className=" border-2 border-gray-400 rounded-lg w-full"
    />
          <label htmlFor="username" className="mt-5 block text-sm font-medium text-gray-700">
             Location
          </label>
          <input
            id="username"
            defaultValue={Company && Company.location}
            type="text"
            placeholder="Enteryour location"
            className=" block w-full p-2 md:p-2 lg:p-3 border-2  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ref={location}
            required
          />
          <label htmlFor="username" className="block mt-3 text-sm font-medium text-gray-700">
             Description
          </label>
          <textarea id="w3review" defaultValue={Company && Company.desc} name="w3review" rows={5} cols={50} className='mt-1 border-2 border-gray-400 rounded-lg overflow-x-auto p-2 w-full' placeholder='Enter the  description' ref={desc}></textarea>
          
          </div>
          <button className="bg-indigo-950 text-white px-2 py-2 rounded-xl" type='submit'>{Company ?"Update":"Submit"}</button>
        </div>
        </form>
    </div>
  )
}

export default page