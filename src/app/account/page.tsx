import { UserProfile } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
    <div className='mx-auto '>
      <UserProfile routing="hash"/>
    </div>
  )
}
