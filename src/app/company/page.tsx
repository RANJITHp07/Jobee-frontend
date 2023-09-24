'use client'
import React, { useEffect, useState,useCallback,useMemo} from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/navbar';
import {getCompany, getPhoto} from '@/apis/company';
import AddIcon from '@mui/icons-material/Add';
import Footer from '../components/footer';
import LoadingPage from '../components/loadinPage';
import CompanyPanel from '../components/companyPanel';
import MenuIcon from '@mui/icons-material/Menu';
import {deleteJob, getJobs, stopRecruiting} from "../../apis/job"
import {Modal } from 'antd';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ReviewPage from '../components/reviewPage';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';



function Page() {
  const userId: string = useAppSelector((state) => state.authReducer.value.userId);
  const token=useAppSelector((state)=>state.authReducer.value.token)
  const [loading,setloading]=useState(true)
  const [company, setCompany] = useState<any>();
  const [id,setid]=useState<string>('')
  const { confirm } = Modal;
  const [jobs,setjobs]=useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [url,seturl]=useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuProps, setMenuProps] = useState<MenuProps>({
    items: [],
  });




  useEffect(() => {
    console.log("Updated id:", id);
    const newItems: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <p onClick={() => showDeleteConfirm(id)}>Delete</p>
        ),
      },
      {
        key: '2',
        label: (
          <a href={`/job/form?update=${id}`} rel="noopener noreferrer">
            {id}
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <p onClick={() => console.log(id)}>
            Stop Recruiting
          </p>
        ),
      },
    ];
    
    setMenuProps({
      ...menuProps,
      items: newItems,
    });
  },[id,menuProps])


  useEffect(()=>{
    const fetchData=async()=>{
      if(company){
        const response=await getPhoto(company.logo)
        
        seturl(response.data)
      }
     
    }
    fetchData()
    
  },[company])


  
  
   function showDeleteConfirm(id:string){
    confirm({
      title: 'Are you sure delete this job application?',
      icon: <ExclamationCircleFilled />,

      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        setjobs((prevJobs) => prevJobs.filter((job:any) => job._id !== id));
        await deleteJob(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  
   

  const showModal = () => {
    setIsModalOpen(true);
  };

 
  const router = useRouter();

 // job listing page
  const jobListings = useMemo(() => (
    <div className='box_shadow rounded-lg p-3  lg:w-10/12 lg:mx-auto mt-12 mx-2 lg:1/4' id='job'>
        <p className='font-bold text-slate-500'>JOBS</p>
        <hr />
        {jobs.map((p: any) => (
          <>
            <div key={p._id} className='my-3 cursor-pointer flex justify-between'>
              <div onClick={() => { router.push(`/job/apply/${p._id}`) }}>
                <p>Role: {p.role}</p>
                <p>Location: {p.location}</p>
                
                </div>
                <div className='flex text-xs'>
                  {/* <DeleteIcon className='mx-3 text-md cursor-pointer' onClick={()=>showDeleteConfirm(p._id)}/>
                  <ModeEditOutlineIcon className='cursor-pointer' onClick={()=>router.push(`/job/form?update=${p._id}`)}/> */}
                  <Dropdown menu={menuProps} placement="bottomLeft">
                  <MoreVertIcon  onClick={() =>
                    setid(p._id)      
                     }/>
      </Dropdown>
                  
                </div>
                
            </div>
            <hr className="my-3"/>
            </>
        ))}
    </div>
), [jobs, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        if(userId){
          const res = await getCompany(userId)
          
          if (res.data === null){
            router.push('/company/details');
          } else {
            setCompany(res.data);
            setloading(false)
          }
        }
        
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [userId]);

  useEffect(()=>{
    async function fetchData(){
      try {
        if(userId){
          const res=await getJobs(userId)
          
          if(res?.data.length===0){
            showModal()
          }
        
            setjobs(res?.data)
        
         
        }
        
        
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[userId])

  return (
    <div>
      
      <div className="hidden">
        <Navbar page={false} />
      </div>
      {
        loading ? <LoadingPage/> :<>
        <Modal  open={isModalOpen} footer={null} onCancel={()=>{setIsModalOpen(false)}}>
         <p className='text-sm font-semibold p-3'>Welcome to Jobee!! Make your first job applicaion</p>
      </Modal>
        <div className="bg-indigo-950 p-5 w-screen flex justify-between">
        <p className='text-white font-extrabold text-2xl'>Jobee</p>
        <MenuIcon className="flex lg:hidden text-white" onClick={()=>{
          setShowFilter(true);
          }}/>
        </div>
        {  showFilter &&
             <div className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50">
             <CompanyPanel setShowFilter={setShowFilter} company={true}/>
            </div>
        }
        <div className="flex">
        <div className="hidden lg:block w-72 pl-5 pt-5 border-r-2 ">
                <CompanyPanel setShowFilter={setShowFilter} company={true}/>
            </div>
            <div className="w-screen">
            <div className="my-3 mx-2 flex justify-end">
        <Link href="/payment" className="bg-indigo-950 text-white rounded-lg p-2 font-semibold " ><AddIcon/>Add Post</Link>
        </div>
    
        
        <div className=" md:mx-5 lg:mx-20 relative">
          <div className="lg:w-full" id='company'>
      <div className="md:flex mt-5 mb-3  p-3 m-1 box_shadow rounded-lg mx-3 lg:w-10/12 lg:mx-auto">
        
        {company && (<>
         <div className="grid place-content-center">
            <Image src={url} width={200} height={200} alt="photo" />
          </div>
          <div className="mx-5 mt-3">
              <p><span className='font-bold text-slate-800'>Name:</span> {company.companyId.username}</p>
              <p><span className='font-bold text-slate-800'>Website:</span> {company.website}</p>
            <p><span className='font-bold text-slate-800'>Location:</span> {company.location}</p>
            </div>
        </> 
        )}
      </div>
       <div>
         {
          company && <>
           <div className='box_shadow rounded-lg p-3 mx-3 lg:w-10/12 lg:mx-auto'>
              <p className='font-bold' >Description</p>
              <div className='bg-slate-100 p-3 rounded-lg mt-3'>
              <p>{company.desc}</p>
              </div>
           </div>
          </>
         }
       </div>
       </div>
       {
        jobs.length > 0 && jobListings
       }
        </div>
           <div className="md:flex  mb-3  md:p-3 mt-3  rounded-lg md:mx-3  lg:w-9/12 lg:mx-auto">
           <ReviewPage id={userId} page={false}/>
           </div>
              
            </div>
        </div>
        <div className="mt-12">
        <Footer/>
        </div>
        
        </>
      }
      
        
    </div>
  );
}

export default Page;
