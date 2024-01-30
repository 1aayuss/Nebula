import { cn } from '@/lib/utils';
import Image from "next/image";
import { LucideIcon } from 'lucide-react';
import React from 'react'
import Link from 'next/link';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Info } from 'lucide-react';

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;

}
const Heading = ({ title, description, icon: Icon, iconColor, bgColor }: HeadingProps) => {
    return (

        <div className='px-4 lg:px-8 flex items-center  gap-x-3 mb-8 '>

            <div className={cn("p-2 w-fit rounded-md ", bgColor)}>
                <Icon className={cn("w-8 h-8 md:w-12 md:h-12", iconColor)}></Icon>
            </div>

            <div className='flex flex-col items-start justify-start '>

                <h1 className='text-xl md:text-4xl font-bold'>{title}</h1>

                <div className='relative h-6 w-28 mt-1 '>
                    <Link href="https://openai.com/">
                        <Image fill alt="Logo" src="/OpenAI_Light.svg" />

                    </Link>
                </div>
            </div>


        </div>



    )
}

export default Heading