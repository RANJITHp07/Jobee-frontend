import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { MenuProps } from 'antd';
import { Dropdown, message } from 'antd';
import { useRouter } from 'next/navigation';
import { stopRecruiting } from '@/apis/job';


function JobCover({job,showDelete}:{job:any,showDelete:(id:string)=>void}) {
    const router=useRouter()


    //to stop recruiting
     const Stop=async()=>{
        try{
           await stopRecruiting(job._id)
           message.info("Stoped Recruiting")
        }catch(err){
            throw err
        }
     }

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <p onClick={() => showDelete(job._id)}>Delete</p>
          ),
        },
        {
          key: '2',
          label: (
            <a href={`/job/form?update=${job._id}`} rel="noopener noreferrer">
              Update
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <p onClick={() =>Stop()}>
              Stop Recruiting
            </p>
          ),
        },
      ];
  return (
    <div>
        <>
            <div key={job._id} className='my-3 cursor-pointer flex justify-between'>
              <div onClick={() => { router.push(`/job/apply/${job._id}`) }}>
                <p>Role: {job.role}</p>
                <p>Location: {job.location}</p>
                
                </div>
                <div className='flex text-xs'>
                  <Dropdown menu={{items}} placement="bottomLeft">
                  <MoreVertIcon/>
      </Dropdown>
                  
                </div>
                
            </div>
            {job.recruiting ? <p className='text-xs text-red-400'>Stoped recruiting employee</p> : <p></p>}
            <hr className="my-3"/>
            </>
    </div>
  )
}

export default JobCover