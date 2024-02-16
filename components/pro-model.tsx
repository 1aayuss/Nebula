import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useProModel } from '@/hooks/use-pro-model'
import { MinusIcon, PlusIcon, IndianRupee, AlertTriangle, Info } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import axios from 'axios';
import { unit_cost } from '@/constants';
import { Separator } from './ui/separator';
import CreditsLogo from './creditsLogo';
import { Montserrat } from "next/font/google"
import { cn } from '@/lib/utils';

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });



export const ProModel = () => {

    const proModel = useProModel();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = React.useState(1)
    const [credits, setCredits] = React.useState(0);
    const [cost, setCost] = React.useState(0);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const newCredits = Math.max(quantity * 10, 0);
        const newCost = Math.floor(Math.max((quantity * 10) * unit_cost, 0));

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
                <div className={cn("mx-auto w-full max-w-lg")}>
                    <DialogHeader>
                        <DialogTitle className='font-bold'>Buy Credits</DialogTitle>
                    </DialogHeader>

                    <div className="p-4 pb-0 space-y-4 flex flex-col items-center justify-center">

                        <CreditsLogo />

                        <div className='font-bold font-md'>
                            {credits} credits
                        </div>

                        <div className="bg-zinc-200 px-2 py-0.5 rounded-sm ">
                            <div className="flex items-center font-bold"><IndianRupee strokeWidth={2} size={18} /> {cost}</div>
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
                                className="flex-2 p-2 text-center w-11 text-md font-bold tracking-tighter border-2 rounded-lg [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"

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

                    <DialogFooter className='mt-6 bottom-0'>

                        <DialogClose asChild className='mt-2 sm:mt-0'>
                            <Button className='border-2 bg-white text-black hover:bg-black/10 '>Cancel</Button>
                        </DialogClose>
                        <Button onClick={onSubscribe} className='w-full' disabled={quantity < 1}>Continue</Button>

                    </DialogFooter>
                </div>

                <div className='bg-amber-100 text-black rounded-md px-4 py-2 flex items-start'>
                    <Info size={2} strokeWidth={2} className='h-4 w-4 mr-2 mt-0.5 flex-shrink-0' />
                    <div className='text-sm font-medium'>
                        The Payment System is currently in Test mode, thus no Live Transactions are being processed at this time.
                    </div>
                </div>

                <Separator className='absolute inset-x-0 bottom-0 h-2 rounded-b-lg overflow-hidden' />
            </DialogContent>

        </Dialog>
    )
}
