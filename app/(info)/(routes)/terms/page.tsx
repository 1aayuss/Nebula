import MarketingLogo from '@/components/MarketingLogo';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PrivacyPage = () => {

    return (
        <div className='min-h-screen flex justify-center items-center bg-zinc-950'>
            <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 p-4 mx-4 my-6 sm:p-6 lg:p-8 pb-0 sm:pb-0 lg:pb-0 md:mx-4 lg:w-3/4 xl:w-1/2 ">
                <span
                    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
                ></span>

                <div className="text-center">
                    <Link href="/">
                        <Button size={"sm"} className="absolute left-4 top-4 border cursor-pointer">
                            <ArrowLeft size={20} className="text-gray-400" />
                        </Button>
                    </Link>
                    <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                        Terms of Service
                    </h3>
                </div>

                <div className="mt-6 text-gray-200 text-md">
                    <div className='mb-4'>
                        <p>
                            These Terms of Service ("Terms") govern your use of our website and services. Please read these Terms carefully before accessing or using our website.
                        </p>
                        <p>
                            By accessing or using any part of the site, you agree to be bound by these Terms.
                        </p>
                    </div>

                    <div className='mb-4'>
                        <h4 className='text-md font-semibold'>Credits and Payment</h4>
                        <p className='text-gray-400'>
                            You may purchase credits to use our services. Payment will be processed securely through Stripe. You agree to provide accurate and complete payment information. Your credits will be available for use immediately after successful payment.
                        </p>
                    </div>
                    <div className='mb-4'>
                        <h4 className='text-md font-semibold'>Refund Policy</h4>
                        <p className='text-gray-400'>
                            Once a purchase is completed, it is considered final and non-refundable. We do not offer refunds for any products or services, including but not limited to digital downloads, subscriptions, or memberships.

                            <br />
                            <br />
                            In certain circumstances, such as technical issues or errors on our part, we may consider providing refunds at our discretion. However, such cases will be evaluated on a case-by-case basis and are not guaranteed.
                        </p>
                    </div>

                    <div className='mb-4'>
                        <h4 className='text-md font-semibold'>Usage of Services</h4>
                        <p className='text-gray-400'>
                            You agree to use services provided by OpenAI API and Replicate API responsibly and in accordance with their terms of service. We do not store any content generated by services.

                        </p>
                    </div>

                    <div className='mb-4'>
                        <h4 className='text-md font-semibold'>Changes to Terms</h4>
                        <p className='text-gray-400'>
                            We reserve the right to update, change, or replace any part of these Terms by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                        </p>
                    </div>

                    <div>
                        <p className='text-gray-400'>
                            For more information about our Terms of Service, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:nebula.help1@outlook.com" className="text-blue-500">nebula.help1@outlook.com</a>.
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