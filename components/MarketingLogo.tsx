import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })
const MarketingLogo = () => {
    return (
        <div className="flex items-center px-3 mb-6 select-none pointer-events-none">
            <div className="relative h-8 w-8 mr-2">
                <Image fill alt="Logo" src="/DarkLogo.svg" />
            </div>
            <h1 className={cn("text-white text-2xl font-bold", montserrat.className)}>
                Nebula
            </h1>
        </div>
    );
};

export default MarketingLogo