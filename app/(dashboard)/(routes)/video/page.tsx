"use client"
import axios from "axios"
import * as z from "zod"
import React, { useState } from 'react'
import Heading from '@/components/heading2'
import { useRouter } from "next/navigation";
import { MessageSquare, MusicIcon, VideoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { FormSchema } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"

const VideoPage = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {

            // setMusic("");
            const response = await axios.post("/api/video", values)

            setVideo(response.data[0]);
            form.reset();


        } catch (error: any) {

            // todo : Open Pro Model
            console.log(error);

        } finally {
            router.refresh();
        }


    };


    return (
        <div className="">
            <Heading
                title="Video Generation"
                description='Turn your prompt into video.'
                icon={VideoIcon}
                iconColor='text-orange-500'
                bgColor='bg-orange-500/10'
            />
            <div className='px-4 lg:px-8 '>

                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-3xl border w-full p-2 px-1 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">

                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10" >
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Talk to Nebula"
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
                    {!video && !isLoading && (
                        <div>
                            <Empty />
                        </div>
                    )}

                    {video && (
                        <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls >
                            <source src={video} />
                        </video>
                    )}

                </div>
            </div>
        </div >
    )
}

export default VideoPage