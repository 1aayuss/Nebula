import React from 'react'
import LandingNavbar from '../(landing)/_components/navbar'
import LandingFooter from '../(landing)/_components/footer'
import { Toaster } from '@/components/ui/toaster'

const InfoLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen bg-zinc-950'>
            {children}
        </div>

    )
}

export default InfoLayout