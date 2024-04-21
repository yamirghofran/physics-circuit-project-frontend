import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { format } from 'date-fns'

function Notification({ notification }) {
  return (
    <Card className="overflow-hidden p-0">
        <CardHeader className='py-4'>
            <CardTitle className="text-base">{notification.title}</CardTitle>
        </CardHeader>
        <CardFooter className='pb-2'>
            <p className='text-xs text-muted-foreground'>{format(new Date(notification.created_at), 'PPP')}</p>
        </CardFooter>
    </Card>
  )
}

export default Notification