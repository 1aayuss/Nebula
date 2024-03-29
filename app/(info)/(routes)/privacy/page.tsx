'use client'
import MarketingLogo from '@/components/MarketingLogo';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const PrivacyPage = () => {
    const router = useRouter();
    return (
        <div className='min-h-screen flex justify-center items-center bg-zinc-950'>
            <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 p-4 mx-4 my-6 sm:p-6 lg:p-8 pb-0 sm:pb-0 lg:pb-0 md:mx-4 lg:w-3/4 xl:w-1/2 ">
                <span
                    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
                ></span>

                <div className="text-center">

                    <Button size={"sm"} className="absolute left-4 top-4 border cursor-pointer" onClick={() => router.back()}>
                        <ArrowLeft size={20} />
                    </Button>

                    <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                        Privacy Policy
                    </h3>
                </div>

                <div className="mt-6 text-gray-200 text-md">
                    <div className='mb-4'>
                        <p>
                            This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Nebula.
                        </p>
                    </div>

                    <div className='mb-4'>
                        <h4 className='text-md font-semibold'>Personal Information We Collect</h4>
                        <p className='text-md text-gray-400'>
                            When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                        </p>
                    </div>

                    <div className='mb-4'>
                        <h4 className='text-md font-semibold'>Sharing Your Personal Information</h4>
                        <p className='text-md text-gray-400'>
                            We do not share your Personal Information with third parties, except as necessary to provide you with the services offered on our website. For example, we use Stripe to power our online payment processing. We also use OpenAI&apos;s and Replicate&apos;s services to generate content based on prompts provided by users.
                        </p>
                    </div>

                    <div className='mb-4'>
                        <h4 className='text-md font-semibold'>Data Storage and Retention</h4>
                        <p className='text-md text-gray-400'>
                            We do not retain your personal data generated by our services. The API response is not storeded in database and will be lost every time you refresh the page.
                        </p>
                    </div>

                    <div>
                        <p className='text-md text-gray-400'>
                            For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:nebula.help1@outlook.com" className="text-blue-500">nebula.help1@outlook.com</a>.
                        </p>
                    </div>
                </div>

                <div className="mt-6 mb-2 text-center">
                    <div className="text-sm font-medium text-gray-600 flex justify-between items-start sm:gap-6">
                        <div className='text-left'>
                            <dt>Published</dt>
                            <dd className="text-xs text-gray-500">13th Fab, 2024</dd>
                        </div>
                        <div className='mb-0'>
                            <MarketingLogo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPage;
