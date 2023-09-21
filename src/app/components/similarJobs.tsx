import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { findSimilarJobs } from '@/apis/job';
import { getPhoto } from '@/apis/company';

function SimilarJobs({ role, location, id,skills}: { role: string; location: string; id: string,skills:string[]}) {
  const [job, setJob] = useState<any>([]);
  const [page,setpage]=useState(3);
  const [url,setImageUrl]=useState<any>([])
  const router=useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await findSimilarJobs(role,location,skills)
        const imageUrlPromises = res.data.map(async (p:any) => {
          const res=await getPhoto(p.company.logo)
        return res?.data;
        
      
    });

    const resolvedUrls = await Promise.all(imageUrlPromises);
  
    setImageUrl(resolvedUrls);
        setJob(res.data);
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, []);

  return (
    <div className="box_shadow rounded-lg p-5 mx-3">
      <div className="flex justify-between">
      <p className='text-slate-400 font-bold'>SIMILAR JOBS</p>
      {job.length===1 && <p className='text-xs'>No similar Jobs</p>}
      </div>
        
        
      {job.slice(0,page).map((p: any,index:number) => {
        if (p._id !== id) {
          return (
            <div className='cursor-pointer' onClick={()=>router.push(`/job/${p._id}`)}>
            <div className="flex justify-between my-5 items-center" key={p._id} >
              <div>
                <p>Role: {p.role}</p>
                <p>Location: {p.location}</p>
              </div>
              <div>
                <Image src={url[index]} width={60} height={60} alt="" />
              </div>
            </div>
            <hr/>
            </div>
          );
        }
        return null;
      })}
     {job.length>3 && page===3 && <button className='text-xs p-2 border-2 border-slate-600 mt-3 rounded-lg' onClick={()=>setpage(6)}>VIEW MORE</button>}
    </div>
  );
}

export default SimilarJobs;
