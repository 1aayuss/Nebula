"use client";
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button';
import { MAX_FREE_COUNTS } from '@/constants';
import { Rocket } from 'lucide-react';
import { PremiumButton } from '@/components/premium-button';
import { useProModel } from '@/hooks/use-pro-model';
import CreditsLogo from '@/components/creditsLogo';

interface FreeCounterProps {
    apiLimitCount: number;
};

export const FreeCounter = ({ apiLimitCount = MAX_FREE_COUNTS }: FreeCounterProps) => {
    const proModel = useProModel();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className='px-3'>
            <Card className='bg-white/10 border-0'>
                <CardContent className='py-4'>
                    <div className='text-center flex flex-col items-center text-sm text-white mb-4 space-y-2'>
                        <CreditsLogo />
                        <p>
                            {apiLimitCount} Credits
                        </p>
                        {/* <Progress className='h-2' value={(apiLimitCount / MAX_FREE_COUNTS) * 100} /> */}
                    </div>
                    <PremiumButton />
                </CardContent>

            </Card>
        </div>
    )
}
