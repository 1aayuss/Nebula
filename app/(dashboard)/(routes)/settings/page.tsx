import { UserButton, UserProfile } from '@clerk/nextjs'

import React from 'react'

const SettingsPage = () => {
    return (

        <div className='flex items-center justify-center mb-14 border-4'>
            <UserProfile />
        </div>
    )
}

export default SettingsPage