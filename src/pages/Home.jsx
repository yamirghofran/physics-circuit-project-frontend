import React from 'react'
import PeopleTable from '@/components/PeopleTable'
import Notifications from '@/components/Notifications'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full'>
        <h1 className='text-2xl font-semibold text-center mt-12'>The Best Physics Project</h1>
        <h2 className='text-center text-base my-2'>Yousef Amirghofran, Anze Zgon, Mia Dragovic, Borja Albers, and Lucas Van Zyl</h2>
        <div className='flex justify-center'>
        <div className='grid grid-cols-3 gap-4 mt-6'>
          <Link target='_blank' to='https://amrgh.me/physics-project-presentation'>
            <Button variant='outline' size='sm' className='w-full'>
              Presentation
            </Button>
          </Link>
          <Link target='_blank' to='/jaxon-report.pdf'>
            <Button variant='outline' size='sm' className='w-full'>
              Report
            </Button>
          </Link>
          <Link target='_blank' to='https://amrgh.me/physics-project-github'>
            <Button variant='outline' size='sm' className='w-full'>
              Github
            </Button>
          </Link>
        </div>
        </div>
        
        <div className='flex w-full gap-x-4 px-4 mt-6'>
          <PeopleTable />
          <Notifications />
        </div>
    </div>
  )
}

export default Home