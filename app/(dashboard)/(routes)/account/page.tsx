import { UserButton, UserProfile } from '@clerk/nextjs'

import React from 'react'

const AccountPage = () => {
    return (

        <div className='flex items-center justify-center mb-14 bg-slate-100'>
            <UserProfile />
        </div>
    )
}

export default AccountPage