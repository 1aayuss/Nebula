import React from 'react'
import { Toaster } from '@/components/ui/toaster'

const InfoLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen bg-zinc-950'>
            {children}
            <Toaster  />
        </div>
    )
}

export default InfoLayout