"use client"
import axios from "axios"
import * as z from "zod"
import React, { useState } from 'react'
import ReactMarkdown from "react-markdown"
import Heading from '@/components/heading'
import { useRouter } from "next/navigation";
import { Code2, MessageSquare } from 'lucide-react'
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

function renderChatContentPart(part: ChatCompletionContentPart): string {
    if (typeof part === "string") {
        return part;
    } else if (Array.isArray(part)) {
        return part.map(subPart => renderChatContentPart(subPart)).join("");
    } else {
        // Handle other cases if needed
        return ""; // Return an empty string as a fallback
    }
}

const CodePage = () => {
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
            const response = await axios.post("/api/code", {
                messages: newMessages,
            })

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();


        } catch (error: any) {

            // todo : Open Pro Model
            console.log(error);

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
                title="Code Generation"
                description='Generate code using descriptive text'
                icon={Code2}
                iconColor='text-green-700'
                bgColor='bg-green-700/10'
            />
            <div className='px-4 lg:px-8'>

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

                                <ReactMarkdown components={{
                                    pre: ({ node, ...props }) => (

                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props} />
                                        </div>
                                    ),

                                    code: ({ node, ...props }) => (
                                        <code className="bg-black/10 rounded-lg p-1" {...props} />
                                    )
                                }} className="text-sm overflow-hidden leading-7">

                                    {
                                        Array.isArray(msg.content) ? (
                                            msg.content.map((part) => renderChatContentPart(part)).join("")
                                        ) : (
                                            msg.content
                                        )
                                    }
                                </ReactMarkdown>

                            </div>
                        ))}

                    </div>

                </div>
            </div >
        </div >
    )
}

export default CodePage