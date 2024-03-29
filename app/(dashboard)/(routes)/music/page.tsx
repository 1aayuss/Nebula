"use client"
import axios from "axios"
import * as z from "zod"
import React, { useState } from 'react'
import Heading from '@/components/heading2'
import { useRouter } from "next/navigation";
import { MessageSquare, MusicIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { FormSchema } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"
import { useProModel } from "@/hooks/use-pro-model"
import { UserButton } from "@clerk/nextjs"

const MusicPage = () => {
    const proModel = useProModel();
    const router = useRouter();
    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {

            const response = await axios.post("/api/music", values)

            setMusic(response.data.audio);
            form.reset();


        } catch (error: any) {

            if (error?.response?.status === 403) {
                proModel.onOpen();
            }
            console.log(error);

        } finally {
            router.refresh();
        }


    };


    return (
        <div className="flex flex-col h-full bg-slate-100">
            <div className="relative flex items-start justify-between pt-0 px-6 md:p-5 lg:px-8">

                <Heading
                    title="Music Generation"
                    description='Turn your prompt into music.'
                    icon={MusicIcon}
                    iconColor='text-blue-500'
                    bgColor='bg-blue-600/10'
                />
                <div className='hidden md:flex'>
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
            <div className='px-6 md:px-4 lg:px-8 mt-4 md:mt-2 '>

                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-xl border w-full p-2 px-2 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2 bg-white shadow-md">

                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10" >
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Enter your prompt"
                                                {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button className="col-span-12 lg:col-span-2
                            w-full" disabled={isLoading}>Generate</Button>

                        </form>
                    </Form>
                </div>


                <div className="space-y-4 mt-4">

                    {
                        isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                                <Loader />
                            </div>
                        )
                    }
                    {!music && !isLoading && (
                        <div>
                            <Empty />
                        </div>
                    )}

                    {music && (
                        <audio controls className="w-full mt-8">
                            <source src={music} />
                        </audio>
                    )}

                </div>
            </div>
        </div >
    )
}

export default MusicPage