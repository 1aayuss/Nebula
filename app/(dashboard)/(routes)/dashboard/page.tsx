"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Code2, Home, ImageIcon, MessagesSquare, MusicIcon, Settings, VideoIcon } from 'lucide-react';
import { MessageSquare, ArrowRight } from "lucide-react";

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
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation"
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation"
    },
    {
        label: "Code Generation",
        icon: Code2,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation"
    },

]

export default function DashboardPage() {
    return (
        <>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Expolore the Power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Chat with the smartest AI - Experience the power of AI
                </p>
            </div>

            <div className="px-4 md:px-20 lg:px-32 space-y-4">

                {
                    tools.map((tool) => (
                        <Card
                            key={tool.href}
                            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                        >
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

                    ))
                }
            </div>
        </>

    );
}
