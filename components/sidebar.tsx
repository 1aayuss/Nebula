"use client";
import React from 'react'
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from './logo';
import { Code2, Home, ImageIcon, MessagesSquare, MusicIcon, Settings, VideoIcon } from 'lucide-react';
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
            color: "text-sky-400"
        },
        {
            label: 'Conversation',
            icon: MessagesSquare,
            href: '/conversation',
            color: "text-purple-400"
        },
        {
            label: 'Image Generation',
            icon: ImageIcon,
            href: '/image',
            color: "text-rose-400"
        },
        {
            label: 'Video Generation',
            icon: VideoIcon,
            href: '/video',
            color: "text-amber-400"
        },
        {
            label: 'Music Generation',
            icon: MusicIcon,
            href: '/music',
            color: "text-orange-400"
        },
        {
            label: 'Code Generation',
            icon: Code2,
            href: '/code',
            color: "text-green-400"
        },
        {
            label: 'Settings',
            icon: Settings,
            href: '/settings',
            color: "text-white"
        }
    ];

    return (
        <div className="space-y-4 py-4 flex flex-col justify-between h-full bg-gradient-to-t from-gray-950 to-slate-900  ">
            {/* bg-[#111827] bg-gray-950 */}
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

            <FreeCounter apiLimitCount={apiLimitCount} />
        </div>
    );
};