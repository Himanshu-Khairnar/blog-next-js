import { RedirectToUserProfile, SignUp } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
    <div>
      <SignUp />
      <RedirectToUserProfile />
    </div>
  )
}
