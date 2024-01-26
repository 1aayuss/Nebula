import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })
const Logo = () => {
    return (
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
            <div className="relative h-8 w-8 mr-4">
                <Image fill alt="Logo" src="/logo.svg" />
            </div>
            <h1 className={cn("text-white text-2xl font-bold", montserrat.className)}>
                Nebula
            </h1>
        </Link>
    );
};

export default Logo