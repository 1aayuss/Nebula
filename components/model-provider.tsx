"use client";
import React, { useEffect, useState } from 'react'
import { ProModel } from '@/components/pro-model';


export const ModelProvider = () => {
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <ProModel />
        </>
    )
}
