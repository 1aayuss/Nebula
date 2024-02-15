"use client"
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Code2, Home, ImageIcon, MusicIcon, Settings, VideoIcon, MessageSquare, ArrowRight } from 'lucide-react';
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"
import { UserButton } from "@clerk/nextjs";

interface UserData {
    firstName: string;
    imageUrl: string
}
const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-red-500",
        bgColor: "bg-violet-500/10",
        href: "/image"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/video"
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/music"
    },
    {
        label: "Code Generation",
        icon: Code2,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/code"
    },

]

export default function DashboardPage() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [greeting, setGreeting] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userData) {
                    const response = await axios.get<UserData>('/api/user');
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [userData]);

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);


    return (
        <>
            <div className='px-4 lg:px-8 flex items-center gap-x-3 mb-8 '>

                {userData ? (
                    <>
                        <div className='p-2 w-fit rounded-md bg-sky-400/10 '>
                            <Home className="w-8 h-8 md:w-12 md:h-12 stroke-sky-500"></Home>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold">{greeting}, {userData.firstName}</h1>
                    </>
                ) : (
                    <>
                        <div className="p-2 rounded-md">
                            <Skeleton className="w-8 h-8 md:w-12 md:h-12 bg-gray-200" />
                        </div>
                        <div>
                            <Skeleton className="h-10 w-[300px] bg-gray-200" />
                        </div>
                    </>
                )}
            </div>

        </>
    );
}
