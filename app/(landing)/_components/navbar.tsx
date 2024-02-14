import React, { useState, useEffect } from 'react';
import DarkLogo from "@/components/darkLogo";
import Link from 'next/link';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Menu } from 'lucide-react';

const LandingNavbar: React.FC = () => {

    const handleScrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <nav className={'fixed top-0 z-40 pt-0 px-4 w-full h-16 flex items-center justify-between text-slate-300 backdrop-blur-xl'}>
            <div className='flex'>
                <div className='mx-1 mr-8 md:block hidden'>
                    <DarkLogo />
                </div>
                <div className='mx-1 mr-8 block md:hidden'>
                    <Popover>
                        <PopoverTrigger>
                            <Menu />
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className='flex flex-col justify-center items-center space-y-2 text-white'>
                                <a className='cursor-pointer' onClick={() => handleScrollToSection('services-section')}>Services</a>
                                <a className='cursor-pointer' onClick={() => handleScrollToSection('pricing-section')}>Pricing</a>
                                <a className='cursor-pointer' onClick={() => handleScrollToSection('about-section')}>About</a>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='space-x-8 mt-1 mx-1 mr-8 hidden md:block'>
                    <a className='cursor-pointer' onClick={() => handleScrollToSection('services-section')}>Services</a>
                    <a className='cursor-pointer' onClick={() => handleScrollToSection('pricing-section')}>Pricing</a>
                    <a className='cursor-pointer' onClick={() => handleScrollToSection('about-section')}>About</a>
                </div>
            </div>

            <div>
                <div className='md:space-x-6 space-x-4 mt-1 md:text-md text-sm'>
                    <Link href="/sign-in" >Log In</Link>
                    <Link href="/sign-up" className='border-2 md:px-2 md:py-1 py-0.5 px-1 rounded-md'>Sign Up</Link>
                </div>
            </div>
        </nav>
    )
}

export default LandingNavbar;
