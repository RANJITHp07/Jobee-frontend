'use client'
import { getCompany, getPhoto} from '@/apis/company';
import Image from 'next/image';
import dynamic from "next/dynamic"
import Navbar from '@/app/components/navbar'
import React,{useEffect,useState,useMemo} from 'react'
import { useRouter } from 'next/navigation';
import LoadinPage from '@/app/components/loadinPage';
import { getcompanyJob } from '@/apis/job';


const CompanyPanel = dynamic(() => import('@/app/components/companyPanel'), {
  loading: () => <LoadinPage />,
});
const ReviewPage = dynamic(() => import('@/app/components/reviewPage'), {
  loading: () => <LoadinPage />,
});

function page({ params }: { params: { id: string } }) {

   const [url,seturl]=useState<string>('')
    const [showFilter, setShowFilter] = useState(false);
    const [jobs,setjobs]=useState([]);
    const [loading,setloading]=useState(true)
    const [company,setcompany]=useState<any>()
    const router = useRouter();

    useEffect(()=>{
       const fetchData=async()=>{
           try{
            const res = await getCompany(params.id)
            console.log(res.data)
            setcompany(res.data)
            setloading(false)
           }catch(err){
            throw err
           }
       }
       fetchData()
    },[])

    const companyPanelComponent = useMemo(() => (
      <div className="hidden lg:block w-72 pl-5 pt-5 border-r-2">
          <CompanyPanel setShowFilter={setShowFilter} company={false} />
      </div>
  ), [showFilter]);

  const reviewPageComponent = useMemo(() => (
      <div>
          <ReviewPage id={params.id} page={true} />
      </div>
  ), [params.id]);

    useEffect(()=>{
      async function fetchData() {
        try {
          const res=await getcompanyJob(params.id)

          setjobs(res.data)
          
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    },[])

    useEffect(()=>{
      const fetchData=async()=>{
        if(company){
          const response=await getPhoto(company.logo)
          console.log(response.data)
          seturl(response.data)
        }
       
      }
      fetchData()
      
    },[company])
    

  return (
    <div>
        <div className="bg-indigo-950">
        <Navbar page={true}/>
        </div>
        {loading ? <LoadinPage/> :<>
        <button className="bg-indigo-950 p-2 m-3 text-white font-semibold rounded-lg lg:hidden" onClick={()=>{setShowFilter(!showFilter)}}>MENU</button>
        {  showFilter &&
             <div className="fixed top-0 left-0 right-0 bottom-0 flex  bg-black bg-opacity-50 z-50">
             {companyPanelComponent}
            </div>
        }
        <div className="flex">
            
                {companyPanelComponent}
           
            <div className="w-full md:w-10/12 md:mx-auto mx-3 my-10">
            <div className="md:flex mt-5 mb-3  p-3 m-1 box_shadow rounded-lg   lg:w-10/12 mx-auto">
            {company && (<>
         <div className="grid place-content-center">
            <Image src={url} width={200} height={200} alt="photo" />
          </div>
          <div className="mx-5 mt-3">
              <p><span className='font-bold text-slate-800'>Name:</span> {company.companyId.username}</p>
              <p><span className='font-bold text-slate-800'>Website:</span><a href={ `http://${company.website}`} target="_blank" className='hover:text-blue-400 cursor-pointer'> {company.website}</a></p>
            <p><span className='font-bold text-slate-800'>Location:</span> {company.location}</p>
            </div>
        </> 
        )}
            </div>
            <div>
         {
          company && <>
           <div className='box_shadow rounded-lg p-3  lg:w-10/12 lg:mx-auto'>
              <p className='font-bold'>Description</p>
              <div className='bg-slate-100 p-3 rounded-lg mt-3'>
              <p>{company.desc}</p>
              </div>
           </div>
          </>
         }
       </div>
       <div className='box_shadow rounded-lg p-3  lg:w-10/12 lg:mx-auto mt-12 lg:1/4' id='job'>
          <p className='font-bold text-slate-500'>JOBS</p>
          <hr/>
          {
            jobs.map((p:any)=>{
              return (<>
              <div className='my-3 cursor-pointer' onClick={()=>{router.push(`/job/${p._id}`)}}>
            <p>Role: {p.role}</p>
            <p>Location :{p.location} </p>
          </div>
          <hr/>
              </>
              )
            })
          }
        </div>
        <div>
            {reviewPageComponent}
        </div>
            </div>
          
        </div>
        </>}
    </div>
  )
}

export default page