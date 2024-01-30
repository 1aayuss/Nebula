import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
import { getApiLimitCount } from '@/lib/api_limit';

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount();

    return (
        <div className='flex items-center p-4'>

            <MobileSidebar apiLimitCount={apiLimitCount} />
            <div className='flex w-full justify-end h-8'>
                <UserButton afterSignOutUrl='/' />
            </div>

        </div>
    )
}

export default Navbar