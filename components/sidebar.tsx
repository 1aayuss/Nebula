"use client";
import React from 'react'
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from './logo';
import { Code2, Home, ImageIcon, MessagesSquare, MusicIcon, Settings, VideoIcon, CircleUserRound } from 'lucide-react';
import Link from 'next/link';
import { FreeCounter } from '@/components/free-counter';

interface SidebarProps {
    apiLimitCount: number;
};
export const Sidebar = ({ apiLimitCount = 0 }: SidebarProps) => {
    const pathname = usePathname();

    const routes = [
        {
            label: 'Dashboard',
            icon: Home,
            href: '/dashboard',
            color: "text-sky-500"
        },
        {
            label: 'Conversation',
            icon: MessagesSquare,
            href: '/conversation',
            color: "text-purple-500"
        },
        {
            label: 'Image Generation',
            icon: ImageIcon,
            href: '/image',
            color: "text-rose-500"
        },
        {
            label: 'Video Generation',
            icon: VideoIcon,
            href: '/video',
            color: "text-yellow-500"
        },
        {
            label: 'Music Generation',
            icon: MusicIcon,
            href: '/music',
            color: "text-blue-500"
        },
        {
            label: 'Code Generation',
            icon: Code2,
            href: '/code',
            color: "text-green-500"
        },
        {
            label: 'Account',
            icon: CircleUserRound,
            href: '/account',
            color: "text-slate-100"
        }
    ];

    return (
        <div className=" h-full bg-gradient-to-tr from-zinc-950 via-blue-950 to-zinc-950  ">
            <div className='h-full w-full space-y-4 pt-4 flex flex-col justify-between backdrop-brightness-50 backdrop-blur-xl'>
                <div className="px-3 py-2">
                    <Logo />
                    <div className="space-y-1 pl-1">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                    pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                                )}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                    {route.label}
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>

                <div className='text-gray-500 m-2'>
                    <FreeCounter apiLimitCount={apiLimitCount} />
                    <div className='flex justify-center items-center space-x-4 m-1.5 text-xs font-semibold'>
                        <Link href={"/privacy"} className='hover:underline hover:text-gray-400 '>Privacy</Link>
                        <div>·</div>
                        <Link href={"/terms"} className='hover:underline hover:text-gray-400 '>Terms</Link>
                        <div>·</div>
                        <Link href={"/contact"} className='hover:underline hover:text-gray-400 '>Support</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};