"use client"
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Code2, Home, ImageIcon, MusicIcon, Settings, VideoIcon, MessageSquare, ArrowRight, MessagesSquare } from 'lucide-react';
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"

interface UserData {
    firstName: string;
    imageUrl: string
}
const tools = [
    {
        label: 'Conversation',
        icon: MessagesSquare,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        href: "/conversation"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-rose-500",
        bgColor: "bg-rose-500/10",
        href: "/image"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
        href: "/video"
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        href: "/music"
    },
    {
        label: "Code Generation",
        icon: Code2,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        href: "/code"
    },

]

export default function DashboardPage() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [greeting, setGreeting] = useState<string>('');
    const router = useRouter();

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
            <div className="flex flex-col h-full">

                <div className='flex items-center justify-start p-3 px-4 md:px-6 md:p-5 lg:px-8 space-x-2 md:space-x-4'>

                    {userData ? (
                        <>
                            <div className='p-2 w-fit rounded-md bg-sky-200/50 '>
                                <Home className="w-8 h-8 md:w-12 md:h-12 stroke-sky-500"></Home>
                            </div>
                            <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold">{greeting}, {userData.firstName}</h1>

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
                <div className="mb-4 md:mb-6 lg:mb-8">
                    <p className="text-muted-foreground font-light text-md md:text-xl text-center">
                        Explore our AI services
                    </p>
                </div>
                <div className="px-4 md:px-20 lg:px-32 space-y-4">
                    {tools.map((tool) => (
                        <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-3 md:p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                                </div>
                                <div className="font-semibold">
                                    {tool.label}
                                </div>

                            </div>
                            <ArrowRight className="w-5 h-5" />
                        </Card>
                    ))}
                </div>
            </div>

        </>
    );
}
