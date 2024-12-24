import { RedirectToUserProfile, SignIn } from '@clerk/nextjs'
import React from 'react'

export default function page() {
    return (
        <div>
            <SignIn  signUpForceRedirectUrl='/'/>
            <RedirectToUserProfile />

        </div>
    )
}
