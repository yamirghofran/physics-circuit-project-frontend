import React from 'react'
import PeopleTable from '@/components/PeopleTable'
import Notifications from '@/components/Notifications'

function Home() {
  return (
    <div className='w-full'>
        <h1 className='text-2xl font-semibold text-center mt-6'>The Best Physics Project</h1>
        <h2 className='text-center text-xl my-2'>Yousef Amirghofran, Anze Zgon, Mia Dragovic, Borja Albers, and Lucas Van Zyl</h2>
        <div className='flex w-full gap-x-4 px-4 mt-6'>
          <PeopleTable />
          <Notifications />
        </div>
    </div>
  )
}

export default Home