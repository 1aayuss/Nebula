import Navbar from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { getApiLimitCount } from '@/lib/api_limit'
import React from 'react'

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
    const apiLimitCount = await getApiLimitCount();
    return (
        <div className='h-screen bg-gradient-to-br from-zinc-950 via-blue-950 to-zinc-950'>
            {children}
        </div>

    )
}

export default Dashboardlayout