"use client"
import axios from "axios"
import * as z from "zod"
import React, { useState } from 'react'
import Heading from '@/components/heading'
import { useRouter } from "next/navigation";
import Image from "next/image"
import { Download, Eye, ImageIcon, MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { FormSchema, amountOptions, resolutionOptions } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useProModel } from "@/hooks/use-pro-model"
import { UserButton } from "@clerk/nextjs"

const ImagePage = () => {
    const proModel = useProModel();
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {

            setImages([]);
            console.log(values);

            const response = await axios.post("/api/image", values);
            const urls = response.data.map((image: { url: string }) => image.url);
            setImages(urls);
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
                    title="Image Generation"
                    description="Out most advanced Image model."
                    icon={ImageIcon}
                    iconColor="text-rose-500"
                    bgColor="bg-rose-600/10"
                />
                <div className='hidden md:flex'>
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>

            <div className='px-6 md:px-4 lg:px-8 mt-4 md:mt-2'>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-xl border w-full p-2 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2 bg-white shadow-md">

                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6" >
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Enter your prompt"
                                                {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}>

                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}>

                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                            <div className="p-20">
                                <Loader />
                            </div>
                        )
                    }
                    {images.length === 0 && !isLoading && (
                        <div>
                            <Empty />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) => (
                            <Card
                                key={src} className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square ">
                                    <Image
                                        alt="Image"
                                        fill
                                        src={src}
                                    />
                                </div>


                                <CardFooter className="p-2">
                                    <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                                        <Eye className="h-4 w-4 mr-2" />
                                        Preview
                                    </Button>
                                </CardFooter>

                            </Card>
                        ))}
                    </div>

                </div>
            </div >
        </div >
    )
}

export default ImagePage