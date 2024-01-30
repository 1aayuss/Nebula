"use client"

import React, { useEffect, useState } from 'react'
import { getApiLimitCount } from '@/lib/api_limit'
import { Menu } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface MobileSidebarProps {
    apiLimitCount: number;
}
const MobileSidebar = ({ apiLimitCount = 0 }: MobileSidebarProps) => {

    // ! Important
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className='md:hidden'>
                    <Menu />
                </Button >
            </SheetTrigger>

            <SheetContent side="left" className='p-0 border-0'>
                <Sidebar apiLimitCount={apiLimitCount} />

            </SheetContent>

        </Sheet>

    )
}

export default MobileSidebar