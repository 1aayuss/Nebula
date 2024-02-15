import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LandingCardProps {
    title: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

const LandingCard: React.FC<LandingCardProps> = ({ title, icon: Icon, iconColor, bgColor }: LandingCardProps) => {
    return (
        <div className="flex items-center justify-center mb-4">

            <div className='rounded-lg transition-all duration-500 bg-gray-500 hover:bg-gradient-to-r hover:from-green-400 hover:via-blue-500 hover:to-purple-600 transform hover:scale-105 p-0.5 select-none' style={{ width: '125px', height: '125px' }}>

                <div className={cn("h-full w-full flex flex-col items-center justify-evenly border-0 rounded-lg text-white text-center bg-zinc-950 p-0.5 ")}>

                    <div className={cn("p-1.5 m-1.5  rounded-md bg-zinc-900")}>
                        <Icon className={cn("w-8 h-8", iconColor)} />
                    </div>
                    <div className="text-sm m-2">{title}</div>
                </div>


            </div>
        </div>
    );
};

export default LandingCard;
