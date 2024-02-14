import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google"
import { Sparkles } from "lucide-react";


const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })
const CreditsLogo = () => {
    return (
        <div className="flex items-center select-none pointer-events-none">
            <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full">
                <Sparkles size={32} color="white" className="p-1" />
            </div>
        </div>
    );
};

export default CreditsLogo