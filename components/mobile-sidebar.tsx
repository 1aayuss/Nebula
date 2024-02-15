"use client"

import React, { useEffect, useState } from 'react'
import { getApiLimitCount } from '@/lib/api_limit'
import { Menu } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { usePathname } from 'next/navigation'

interface MobileSidebarProps {
    apiLimitCount: number;
}
const MobileSidebar = ({ apiLimitCount }: MobileSidebarProps) => {
    const pathname = usePathname();

    // ! Important
    const [isMounted, setIsMounted] = useState(false);

    const onOpen = useMobileSidebar((state) => state.onOpen);
    const onClose = useMobileSidebar((state) => state.onClose);
    const isOpen = useMobileSidebar((state) => state.isOpen);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    if (!isMounted) {
        return null;
    }
    return (

        <>
            <Button onClick={onOpen} variant="ghost" size="icon" className='md:hidden'>
                <Menu />
            </Button >
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className='p-0 border-0'>
                    <Sidebar apiLimitCount={apiLimitCount} />
                </SheetContent>

            </Sheet>
        </>

    )
}

export default MobileSidebar