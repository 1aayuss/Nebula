import Navbar from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { getApiLimitCount } from '@/lib/api_limit'
import { Info } from 'lucide-react'
import React from 'react'

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
    const apiLimitCount = await getApiLimitCount();
    return (
        <div className='h-full relative color bg-[#111827] overflow-hidden'>
            <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900'>
                <Sidebar apiLimitCount={apiLimitCount} />
            </div>
            <div className='h-screen md:ml-72 overflow-auto bg-white md:rounded-3xl md:border-white '>
                <main>
                    <Navbar />
                    {children}
                </main>
            </div>
        </div>

    )
}

export default Dashboardlayout