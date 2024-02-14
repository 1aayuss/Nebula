"use client"
import MarketingLogo from '@/components/MarketingLogo';
import { useToast } from "@/components/ui/use-toast"
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCheck, CheckIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();


const ContactPage = () => {

    const { toast } = useToast()

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Message: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {

        try {
            e.preventDefault();
            const response = await axios.post('/api/info', {
                FirstName: formData.FirstName,
                LastName: formData.LastName,
                Email: formData.Email,
                Message: formData.Message,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                await toast({
                    title: "✅ Response has been submitted successfully",
                    description: "We will contact you soon.",
                });
            }
            setFormData({
                FirstName: '',
                LastName: '',
                Email: '',
                Message: '',
            });
        } catch (error) {
            console.log(error, "Error in submitting form");
        }
    }
    return (
        <div className='min-h-screen flex justify-center items-center bg-zinc-950 '>
            <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 p-4 mx-4 my-6 sm:p-6 lg:p-8 pb-0 sm:pb-0 lg:pb-0 md:mx-4 lg:w-3/4 xl:w-1/2 ">
                <span
                    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
                ></span>

                <div className="text-center">
                    <Link href="/">
                        <Button size={"sm"} className="absolute left-4 top-4 border cursor-pointer">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                        Contact Us
                    </h3>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="mt-6 text-gray-200 text-base">
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='flex flex-col'>
                                <label htmlFor="first-name" className="text-white">First Name*</label>
                                <input required type="text" id="first-name" name="FirstName" value={formData.FirstName} onChange={handleChange} className="p-1 bg-zinc-900 border-2 rounded-sm border-zinc-900 text-white w-full" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="last-name" className="text-white">Last Name*</label>
                                <input required type="text" id="last-name" name="LastName" value={formData.LastName} onChange={handleChange} className="p-1 bg-zinc-900 border-2 rounded-sm border-zinc-900 text-white w-full" />
                            </div>
                        </div>

                        <div className='mt-4 flex flex-col'>
                            <label htmlFor="email" className="text-white">Email*</label>
                            <input required type="email" id="email" name="Email" value={formData.Email} onChange={handleChange} className="p-1 bg-zinc-900 border-2 rounded-sm border-zinc-900 text-white w-full" />
                        </div>

                        <div className='mt-4 flex flex-col'>
                            <label htmlFor="message" className="text-white">Message*</label>
                            <textarea required id="message" name="Message" value={formData.Message} onChange={handleChange} cols={30} rows={5} className="p-1 bg-zinc-900 border-2 rounded-sm border-zinc-900 text-white w-full"></textarea>
                        </div>

                        <div className='mt-4'>
                            <Button type="submit">
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>

                <div className="mt-6 mb-2 text-center">
                    <div className="text-sm font-medium text-gray-600 flex justify-center items-start sm:gap-6">
                        <div className='mb-0'>
                            <MarketingLogo />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ContactPage;
