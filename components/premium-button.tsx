import { Sparkles } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useProModel } from '@/hooks/use-pro-model';

export const PremiumButton = () => {
    const proModel = useProModel();

    return (
        <a onClick={proModel.onOpen} className="relative inline-flex items-center justify-center w-full px-6 py-2 overflow-hidden text-white rounded-md shadow-2xl group cursor-pointer">
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 group-hover:opacity-100"></span>
            {/* <!-- Top glass gradient --> */}
            <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
            {/* <!-- Bottom gradient --> */}
            <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
            {/* <!-- Left gradient --> */}
            <span className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
            {/* <!-- Right gradient --> */}
            <span className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
            <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-5"></span>
            <span className="relative text-sm text-bold flex">Buy Credits<Sparkles className='w-4 h-4 ml-1.5 mt-0.5 ' /> </span>
        </a>

    )
}
