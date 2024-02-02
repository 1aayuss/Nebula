"use client"
import axios from "axios"
import * as z from "zod"
import React, { useState } from 'react'
import Heading from '@/components/heading'
import { useRouter } from "next/navigation";
import { MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { FormSchema } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChatCompletionContentPart, ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"
import { useProModel } from "@/hooks/use-pro-model"

const ConversationPage = () => {
    const proModel = useProModel();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {

            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage]
            const response = await axios.post("/api/conversation", {
                messages: newMessages,
            })

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();


        } catch (error: any) {

            if (error?.response?.status === 403) {
                proModel.onOpen();
            }
        } finally {
            router.refresh();
        }
    };
    function renderChatContentPart(part: ChatCompletionContentPart): any {
        throw new Error("Function not implemented.")
    }

    return (
        <div className="">
            <Heading
                title="Conversation"
                description='Out most advanced conversation model.'
                icon={MessageSquare}
                iconColor='text-violet-500'
                bgColor='bg-violet-500/10'
            />
            <div className='px-4 lg:px-8'>

                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-xl border w-full p-2 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2 bg-white shadow-md">

                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10 md:p-0" >
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
                    {messages.length === 0 && !isLoading && (
                        <div>
                            <Empty />
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((msg) => (
                            <div key={JSON.stringify(msg.content)}
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", msg.role === "user" ? "bg-white-border border-black/10" : "bg - muted")}
                            >
                                {msg.role === "user" ? <UserAvatar /> : <BotAvatar />}

                                <p className="text-sm">
                                    {
                                        Array.isArray(msg.content) ? (
                                            msg.content.map((part) => renderChatContentPart(part))
                                        ) : (
                                            msg.content
                                        )
                                    }
                                </p>

                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div >
    )
}

export default ConversationPage