import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

export default function EventCard() {
  return (
    <div>
        <Card className='w-full h-full '>
        <Image 
            src={'/images/9cb106030ddb6e6761ba6e6237de936e.png'} 
            alt={''} 
            width={1920} 
            height={1080}
            className='w-1fr aspect-square object-cover mx-auto'
        />
        </Card>
    </div>
  )
}
