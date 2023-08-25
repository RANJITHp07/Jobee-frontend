import AdminSignin from '@/app/components/adminSignin'
import React from 'react'

function page() {
  return (
    <div>
        <div className="bg-indigo-950">
            <p className='text-4xl text-white font-bold p-5'>Jobee</p>
        </div>
        <div className="flex justify-center items-center mt-12">
            <AdminSignin page={true}/>
        </div>
    </div>
  )
}

export default page