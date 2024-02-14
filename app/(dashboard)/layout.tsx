import Navbar from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { getApiLimitCount } from '@/lib/api_limit'
import { Info } from 'lucide-react'
import React from 'react'

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
    const apiLimitCount = await getApiLimitCount();
    return (
        <div className='h-screen'>
            <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 '>
                <Sidebar apiLimitCount={apiLimitCount} />
            </div>
            <div className='h-full flex flex-col justify-between md:ml-72 bg-slate-100 md:border-white '>
                <Navbar />
                <div className='h-full'>
                    {children}
                </div>
            </div>
        </div>

    )
}

export default Dashboardlayout