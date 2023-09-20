'use client'
import React,{useState,useEffect, ChangeEvent} from 'react'
import AdminPanel from '../components/adminPanel'
import MenuIcon from '@mui/icons-material/Menu';
import LoadinPage from '../components/loadinPage';
import { Pagination } from 'antd';
import { getAdmin, getEmail, getrole } from '@/api/auth';
import { useRouter } from 'next/navigation';



function Page() {
    const [loading,setloading]=useState(true)
    const router=useRouter()
    const [pagination,setpagination]=useState(1)
    const [showFilter, setShowFilter] = useState(false);
    const [email,setemail]=useState<any>()
    const [user,setuser]=useState<any>([])
    const [company,setcompany]=useState<any>([])
    const[page,setpage]=useState({
      page1:true,
      page2:false
    })


    
   //to search an user using his email Id
    const handleSearch = async()=>{
         try{
          let to=localStorage.getItem("token")
          if(to){
            const token=JSON.parse(to).user.token
           
             const res=await getEmail(email,token)
              console.log(res.data)
              if(!res.data){
                setuser([]);
                setcompany([])
              }
             if(res.data.role==='employer'){
              res.data ? setuser([res.data]) :setuser([])
             }else if(res.data.role==='recruiter'){
              res.data ? setcompany([res.data]):setcompany([])
             }
            }
         }catch(err){
          throw err
         }
    } 

    useEffect(()=>{
      const fetchData=async()=>{
        try{
          let to=localStorage.getItem("token")
          if(to){
            const token=JSON.parse(to)
            const  res=await getAdmin(token.user.userId)
            console.log(res.data)
            if(!res.data.admin){
               router.push("/admin/login")
            }else{
              setloading(false)
            }
          }else{
            router.push("/admin/login")
          }
       }catch(err){
          throw err
       }
      }
      fetchData()

    },[])

    useEffect(()=>{
      const fetchData=async()=>{
         try{
          let to=localStorage.getItem("token")
          if(to){
            const token=JSON.parse(to).user.token
           
            const res=await getrole('employer',token)
           
            setuser(res.data)
          }
         }catch(err){
           throw err
         }
      }
      fetchData()
    },[])

    useEffect(()=>{
      const fetchData=async()=>{
         try{
          let to=localStorage.getItem("token")
          if(to){
            const token=JSON.parse(to).user.token
            const res=await getrole("recruiter",token)
            console.log(res.data)
            setloading(false)
            setcompany(res.data)
          }
         }catch(err){
           throw err
         }
      }
      fetchData()
    },[])



  return (
    <div>
        { loading ? <LoadinPage/>  : <>
        <div className="bg-indigo-950 p-5 flex justify-between">
        <p className='text-white  sm:w-max font-extrabold text-2xl'>Jobee</p>
         <p className="block md:hidden"><MenuIcon className="text-white" onClick={()=>{setShowFilter(true)}}/></p>
        </div>
        {  showFilter &&
             <div className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50">
             <AdminPanel setShowFilter={setShowFilter} setpage={setpage} page={page}/>
            </div>
        }<div className='flex justify-end lg:hidden'><button className='bg-indigo-950 text-white p-2 m-2 rounded-lg' onClick={()=>{setShowFilter(true)}}>Dashboard</button></div>
        
        <div className="flex">
            <div className="hidden lg:block w-72 pl-5 pt-5 border-r-2">
                <AdminPanel setShowFilter={setShowFilter} setpage={setpage} page={page}/>
            </div>
            <div className=" w-full">
            <div className='flex lg:mx-44'><input type='text' placeholder='Search the user using email' onChange={(e:ChangeEvent<HTMLInputElement>)=>{setemail(e.target.value)}} className='w-full p-2 border-2 rounded-md my-3 ml-5'/><button className='bg-indigo-950 text-white p-2 my-3 mx-2 rounded-md' onClick={()=>handleSearch()}>Search</button></div>
            <div>
              {page.page1 && <p className='font-bold text-center text-2xl mb-5 mt-7'>DETAILS OF ALL USERS</p>}
              {page.page2 && <p className='font-bold text-center text-2xl mb-5 mt-7'>DETAILS OF ALL COMPANIES</p>}
  { page.page1 && <table className="table-auto  mx-auto w-10/12 md:w-10/12  rounded-lg border-2">
    <thead className='bg-slate-300 rounded-lg'>
      <tr>
        { user.length >0 && <><th className="px-4 py-2 border-2">ID</th>
        <th className="px-4 py-2 border-2">Username</th>
        <th className="px-4 py-2 border-2">Email</th>
        <th className="px-4 py-2 border-2 hidden md:block">Date of signIn</th>
        <th className="px-4 py-2 border-2 hidden md:block">Updated At</th>
        </>
  }
      </tr>
    </thead>
    <tbody>
      {user.length >0 ? user.slice(pagination * 7 - 7, pagination * 7).map((p: any,index:number) => (
        <tr key={p.id}>
          <td className="border md:px-4 py-2">{index+1}</td>
          <td className="border md:px-4 py-2">{p.username}</td>
          <td className="border md:px-4 py-2">{p.email}</td>
          <td className="border px-4 py-2 hidden md:block">{new Date(p.createdAt).toLocaleDateString()}</td>
          <td className="border px-4 py-2 hidden md:block">{new Date(p.updatedAt).toLocaleDateString()}</td>
        </tr>
      )) : <p className='md:text-8xl text-6xl text-center my-32 text-slate-300 font-medium'>No such User</p>}
    </tbody>
  </table>
}

{ page.page2 && <table className="table-auto  mx-auto w-10/12 md:w-10/12  rounded-lg border-2">
    <thead className="bg-slate-300">
      <tr>
        <th className="px-4 py-2  border-2">ID</th>
        <th className="px-4 py-2 border-2">ComapnyName</th>
        <th className="px-4 py-2 border-2">Email</th>
        <th className="px-4 py-2 border-2 hidden md:block">Date of signIn</th>
        <th className="px-4 py-2 border-2 hidden md:block ">Updated At</th>
      </tr>
    </thead>
    <tbody>
      {company.length >0 ? company.slice(pagination * 7 - 7, pagination * 7).map((p: any,index:number) => (
        <tr key={p.id}>
          <td className="border px-4 py-2">{index+1}</td>
          <td className="border md:px-4 py-2">{p.username}</td>
          <td className="border md:px-4 py-2">{p.email}</td>
          <td className="border px-4 py-2 hidden md:block">{new Date(p.createdAt).toLocaleDateString()}</td>
          <td className="border px-4 py-2 hidden md:block">{new Date(p.updatedAt).toLocaleDateString()}</td>
          
        </tr>
      )) : <p className=' text-6xl text-center my-32 lg:mx-56 text-slate-300 font-medium'>No such Company</p>}
    </tbody>
  </table>
}
<div></div>

</div>
<Pagination defaultCurrent={1} total={page.page1?(Math.ceil(user.length / 7) * 10):(Math.ceil(company.length / 7) * 10)}  onChange={(e:number) => {
              setpagination(e);
            }} className='text-center mt-32 mb-5' />
            </div>
        </div>
        </>}
    </div>
  )
}

export default Page