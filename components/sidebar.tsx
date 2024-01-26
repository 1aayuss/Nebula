"use client";
import React from 'react'
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from './logo';
import { Code2, Home, ImageIcon, MessagesSquare, MusicIcon, Settings, VideoIcon } from 'lucide-react';
import Link from 'next/link';


export const Sidebar = () => {
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
            color: "text-violet-500"
        },
        {
            label: 'Image Generation',
            icon: ImageIcon,
            href: '/image',
            color: "text-pink-500"
        },
        {
            label: 'Video Generation',
            icon: VideoIcon,
            href: '/video',
            color: "text-orange-500"
        },
        {
            label: 'Music Generation',
            icon: MusicIcon,
            href: '/music',
            color: "text-orange-500"
        },
        {
            label: 'Code Generation',
            icon: Code2,
            href: '/code',
            color: "text-orange-500"
        },
        {
            label: 'Settings',
            icon: Settings,
            href: '/settings',
            color: "text-white"
        }
    ];

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] ">
            <div className="px-3 py-2 ">
                <Logo />
                <div className="space-y-1">
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
        </div>
    );
};