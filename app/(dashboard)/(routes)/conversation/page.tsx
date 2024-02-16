"use client"
import axios from "axios"
import * as z from "zod"
import React, { useEffect, useRef, useState } from 'react'
import Heading from '@/components/heading'
import { useRouter } from "next/navigation";
import { MessageSquare, SendHorizontal } from 'lucide-react'
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
import { UserButton } from "@clerk/nextjs"

const ConversationPage: React.FC = () => {
    const proModel = useProModel();
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/conversation", {
                messages: newMessages,
            });

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

    const renderChatContentPart = (part: ChatCompletionContentPart) => {
        throw new Error("Function not implemented.");
    };

    return (
        <div className="flex flex-col h-full bg-slate-100">

            <div className="relative flex items-start justify-between pt-0 px-6 md:p-5 lg:px-8">
                <Heading
                    title="Conversation"
                    description="Out most advanced conversation model."
                    icon={MessageSquare}
                    iconColor="text-purple-500"
                    bgColor="bg-purple-600/10"
                />
                <div className='hidden md:flex'>
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>

            <div className=" px-4 lg:px-8 flex-grow overflow-auto ">
                <div className="space-y-4 mt-4 ">


                    <div className="flex flex-col gap-y-4">
                        {messages.map((msg) => (
                            <div
                                key={JSON.stringify(msg.content)}
                                className={cn(
                                    "p-4 md:p-8 w-full flex gap-x-4 md:gap-x-8 rounded-lg",
                                    msg.role === "user"
                                        ? "bg-transparent flex items-end justify-end"
                                        : "bg-gray-200 flex items-start"
                                )}
                            >
                                {msg.role !== "user" ? <BotAvatar /> : null}


                                <p className={cn("text-sm md:text-md font-medium", msg.role === "user" ? "mb-1.5" : "mt-1.5")}>
                                    {Array.isArray(msg.content)
                                        ? msg.content.map((part) => renderChatContentPart(part))
                                        : msg.content}
                                </p>
                                {msg.role === "user" ? <UserAvatar /> : null}

                            </div>
                        ))}
                    </div>
                    {isLoading && (
                        <div className="p-8 bottom-0 rounded-lg w-full flex items-center justify-center">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <div>
                            <Empty />
                        </div>
                    )}


                    <div ref={messagesEndRef} />
                </div>
            </div>


            <div className="px-4 lg:px-8 mb-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-xl w-full p-2 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2 bg-white shadow-md"
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10 md:p-0">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Talk to Nebula"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            className="col-span-12 lg:col-span-2 w-full"
                            disabled={isLoading}
                        >
                            Send
                            <SendHorizontal size={18} className="ml-1.5" />
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ConversationPage;