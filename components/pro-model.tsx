import React, { useEffect, useRef } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useProModel } from '@/hooks/use-pro-model'
import { Card } from '@/components/ui/card';
import { Code2, ImageIcon, MusicIcon, VideoIcon, MessageSquare, Check, Zap, Rocket, MinusIcon, PlusIcon, Goal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { number } from 'zod';
import Image from 'next/image';
import { Value } from '@radix-ui/react-select';
import Logo from './logo';

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-red-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Code Generation",
        icon: Code2,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },

]
export const ProModel = () => {

    const proModel = useProModel();
    const [goal, setGoal] = React.useState(1)
    const inputRef = useRef<HTMLInputElement | null>(null);

    function onClick(adjustment: number) {
        setGoal((prev) => prev + adjustment)
    }
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
    }, []);

    return (
        <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
            <DialogContent className=' w-full'>
                <div className="mx-auto w-full max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Buy credits</DialogTitle>
                    </DialogHeader>

                    <div className="p-4 pb-0 space-y-4 flex flex-col items-center justify-center">

                        <div className='flex '>
                            <div className="relative h-12 w-12">
                                <Image fill alt="Logo" src="/Circle.svg" />
                            </div>
                        </div>

                        <div className='text-bold'>
                            {Math.max(goal * 10, 0)} Credits
                        </div>

                        <div>
                            {Math.max(goal * 10 * 5 - 1, 0)} Rs.
                        </div>
                        <div className="flex items-center justify-center space-x-4 ">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border rounded-full focus:border-0 focus:outline-0 focus-visible:ring-0"
                                onClick={() => onClick(-1)}
                                disabled={goal === 0}
                            >
                                <MinusIcon className="h-4 w-4" />
                                <span className="sr-only">Decrease</span>
                            </Button>

                            <input
                                ref={inputRef}
                                type="number"
                                id="quantity-input"
                                data-input-counter
                                aria-describedby="helper-text-explanation"
                                className="flex-2 p-2 text-center w-11 text-md font-bold tracking-tighter border-2 rounded-lg"

                                value={goal}
                                onInput={(e) => {
                                    const value: any = parseInt((e.target as HTMLInputElement).value, 10);
                                    setGoal(value !== 0 && !isNaN(value) ? value : 1);
                                }}
                                required
                            />

                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border rounded-full focus:border-0 focus:outline-0 focus-visible:ring-0"
                                onClick={() => onClick(1)}
                                disabled={goal >= 400}
                            >
                                <PlusIcon className="h-4 w-4" />
                                <span className="sr-only">Increase</span>
                            </Button>
                        </div>
                    </div>

                    <DialogFooter className='mt-6'>

                        <DialogClose asChild className=''>
                            <Button className='border-2 bg-white text-black hover:bg-black/10 '>Cancel</Button>
                        </DialogClose>
                        <Button className='w-full' disabled={goal < 1}>Continue</Button>

                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
