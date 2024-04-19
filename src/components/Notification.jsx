import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

function Notification() {
  return (
    <Card className="overflow-hidden p-0">
        <CardHeader className='py-4'>
            <CardTitle className="text-base">John Deez entered the house!</CardTitle>
        </CardHeader>
        <CardFooter className='pb-2'>
            <p className='text-xs text-muted-foreground'>May 5th, 2024</p>
        </CardFooter>
    </Card>
  )
}

export default Notification