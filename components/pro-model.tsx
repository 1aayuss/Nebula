import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useProModel } from '@/hooks/use-pro-model'
import { Card } from '@/components/ui/card';
import { Code2, ImageIcon, MusicIcon, VideoIcon, MessageSquare, Check, Zap, Rocket, MinusIcon, PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { number } from 'zod';
import Image from 'next/image';
import { Value } from '@radix-ui/react-select';
import Logo from './logo';
import axios from 'axios';

export const ProModel = () => {

    const proModel = useProModel();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = React.useState(1)
    const [credits, setCredits] = React.useState(0);
    const [cost, setCost] = React.useState(0);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const newCredits = Math.max(quantity * 10, 0);
        const newCost = Math.max((quantity * 10) * 5 - 1, 0);

        setCredits(newCredits);
        setCost(newCost);

        if (inputRef.current) {
            inputRef.current.blur();
        }
    }, [quantity]);

    function onClick(adjustment: number) {
        setQuantity((prev) => Math.max(prev + adjustment, 0));
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
    }, []);

    const onSubscribe = async () => {
        try {
            setLoading(true);

            const response = await axios.post('/api/stripe', {
                quantity: quantity
            });


            window.location.href = response.data.url;
        } catch (error) {
            console.log(error, "STRIPE_CLIENT_ERROR");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
            <DialogContent className=' w-full'>
                <div className="mx-auto w-full max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Buy quantitys</DialogTitle>
                    </DialogHeader>

                    <div className="p-4 pb-0 space-y-4 flex flex-col items-center justify-center">

                        <div className='flex '>
                            <div className="relative h-12 w-12">
                                <Image fill alt="Logo" src="/Circle.svg" />
                            </div>
                        </div>

                        <div className='text-bold'>
                            {credits} credits
                        </div>

                        <div>
                            {cost} Rs.
                        </div>
                        <div className="flex items-center justify-center space-x-4 ">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border rounded-full focus:border-0 focus:outline-0 focus-visible:ring-0"
                                onClick={() => onClick(-1)}
                                disabled={quantity === 0}
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

                                value={quantity}
                                onInput={(e) => {
                                    const value: any = parseInt((e.target as HTMLInputElement).value, 10);
                                    setQuantity(value !== 0 && !isNaN(value) ? value : 1);
                                }}
                                required
                            />

                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border rounded-full focus:border-0 focus:outline-0 focus-visible:ring-0"
                                onClick={() => onClick(1)}
                                disabled={quantity >= 400}
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
                        <Button onClick={onSubscribe} className='w-full' disabled={quantity < 1}>Continue</Button>

                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
