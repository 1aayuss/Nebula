import React from 'react'
import Image from 'next/image';

interface EmptyProps {
    label: string;
}

export const Empty = () => {
    return (
        <div className='h-full p-20 flex flex-col items-center justify-center select-none pointer-events-none' >
            <div className='relative h-32 w-32 h'>
                <Image alt="Empty" fill src="/empty.png" />
            </div>
            <p className='text-muted-foreground text-sm text-center'>
                Let's begin your AI journey
            </p>
        </div>
    )
}
