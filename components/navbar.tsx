import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
import { getApiLimitCount } from '@/lib/api_limit';

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount();

    return (
        <div className='h-10 md:h-1 md:mt-1.5 mx-4 mt-2'>
            <div className='flex items-center justify-between md:hidden'>
                <MobileSidebar apiLimitCount={apiLimitCount} />
                <div className='flex md:hidden'>
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
        </div>
    )
}

export default Navbar