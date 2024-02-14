'use client'
import DarkLogo from "@/components/darkLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google"
import { ArrowRight, Code2, ImageIcon, MessageSquare, MinusIcon, MusicIcon, PlusIcon, Sparkles, VideoIcon, IndianRupee } from "lucide-react";
import LandingNavbar from "./_components/navbar";
import LandingFooter from "./_components/footer";
import LandingCard from "./_components/card";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { unit_cost } from "@/constants";
import { useProModel } from "@/hooks/use-pro-model";
import { Separator } from "@/components/ui/separator"
import CreditsLogo from "@/components/creditsLogo";


const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const montserrat2 = Montserrat({ weight: "500", subsets: ["latin"] });
export default function LandingPage() {
    const proModel = useProModel();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [credits, setCredits] = useState(0);
    const [cost, setCost] = useState(0);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const newCredits = Math.max(quantity * 10, 0);
        const newCost = Math.floor(Math.max((quantity * 10) * unit_cost, 0));

        setCredits(newCredits);
        setCost(newCost);

        if (inputRef.current) {
            inputRef.current.blur();
        }
    }, [quantity]);

    function onClick(adjustment: number) {
        setQuantity((prev) => Math.max(prev + adjustment, 0));
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
    }, []);

    const onSubscribe = async () => {
        try {
            setLoading(true);

            const response = await axios.post('/api/stripe', {
                quantity: quantity
            });

            window.location.href = response.data.url;
        } catch (error) {
            console.log(error, "STRIPE_CLIENT_ERROR");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={cn("", montserrat2.className)}>

                <LandingNavbar />
                <div className="backdrop-brightness-50 backdrop-blur-3xl">
                    <div className="min-h-screen flex flex-col justify-center items-center">
                        <div className="mt-0 mb-6 p-0.5 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full ">
                            <div className="py-1.5 px-4 h-full w-full border-0 rounded-full bg-zinc-950">
                                <DarkLogo />
                            </div>
                        </div>
                        <div className={cn("text-white text-3xl md:text-5xl px-4 md:px-0 text-center mb-2 font-bold space-y-1 sm:space-y-2", montserrat.className)}>
                            <div>Explore The Universe of AI With</div>

                            <div className="inline-block">Nebula's AI Constellation <Separator />
                            </div>

                        </div>
                        <div className="mt-12 ">
                            <Button size="lg" className="bg-gray-950 hover:bg-gray-900 ">
                                <Link href="/sign-up">
                                    <div className="flex space-x-2">
                                        <div className="text-lg">Try Nebula For Free</div>
                                        <ArrowRight className="mt-1" size={22} strokeWidth={2} />
                                    </div>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>


                {/* ! Card */}
                <div id="services-section" className="h-screen pt-0 bg-zinc-950 flex flex-col items-center justify-center">
                    <div className="text-white text-center mb-12 px-8 ">
                        <div className="text-md text-gray-200">Our Services</div>
                        <div className="text-4xl text-bold">What We Offer</div>
                        <Separator />
                        <div className="text-sm text-gray-500 mt-2">
                            Empower your ideas with Text-to-Content generation AI Models,
                            <br />offering limitless creative potential at your fingertips.
                        </div>
                    </div>
                    <div className="flex flex-wrap items-start justify-center gap-4 md:gap-8">
                        <LandingCard
                            title="Talk to the smartest AI"
                            icon={MessageSquare}
                            iconColor="text-violet-500"
                            bgColor="bg-violet-500/10"
                        />
                        <LandingCard
                            title="Image Generation"
                            icon={ImageIcon}
                            iconColor="text-pink-700"
                            bgColor="bg-pink-700/10"
                        />
                        <LandingCard
                            title="Video Generation"
                            icon={VideoIcon}
                            iconColor="text-orange-500"
                            bgColor="bg-orange-500/10"
                        />
                        <LandingCard
                            title="Music Generation"
                            icon={MusicIcon}
                            iconColor="text-emerald-500"
                            bgColor="bg-emerald-500/10"
                        />
                        <LandingCard
                            title="Code Generation"
                            icon={Code2}
                            iconColor="text-green-600"
                            bgColor="bg-green-700/10"
                        />
                    </div>

                </div>

                {/* Price */}
                <div id="pricing-section" className="h-4/6 py-24 bg-zinc-950 flex flex-col items-center justify-start">
                    <div className="h-full flex flex-col justify-center items-center">
                        <div className="text-white text-center mb-12">
                            <div className="text-3xl">Price Calculator</div>
                            <Separator />

                        </div>
                        <div className="flex justify-center">
                            <Card className="bg-zinc-950 text-white border-2 h-72 w-72 flex justify-center items-center">
                                <CardContent className="w-full max-w-lg">
                                    <div className="p-4 pb-0 space-y-4 flex flex-col items-center justify-center">
                                        <CreditsLogo />
                                        <div className="font-bold">{credits} Credits</div>
                                        <div className="bg-zinc-900 px-2 py-0.5 rounded-sm">

                                            <div className="flex items-center"><IndianRupee size={18} /> {cost}</div>
                                        </div>
                                        <div className="flex items-center justify-center space-x-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="bg- h-8 w-8 border rounded-full focus:border-0 focus:outline-0 focus-visible:ring-0"
                                                onClick={() => onClick(-1)}
                                                disabled={quantity === 0}
                                            >
                                                <MinusIcon className="h-4 w-4" />
                                                <span className="sr-only">Decrease</span>
                                            </Button>
                                            <input
                                                ref={inputRef}
                                                type="number"
                                                id="quantity-input"
                                                className="bg-zinc-950 text-white flex-2 p-2 text-center w-11 text-md font-bold tracking-tighter border-2 rounded-lg [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                value={quantity}
                                                onInput={(e) => {
                                                    const value: any = parseInt((e.target as HTMLInputElement).value, 10);
                                                    setQuantity(value !== 0 && !isNaN(value) ? value : 1);
                                                }}
                                                required
                                            />
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="bg- h-8 w-8 border rounded-full focus:border-0 focus:outline-0 focus-visible:ring-0 "
                                                onClick={() => onClick(1)}
                                                disabled={quantity >= 400}
                                            >
                                                <PlusIcon className="h-4 w-4" />
                                                <span className="sr-only">Increase</span>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>

                <div>
                    <div className='min-h-screen flex justify-center items-center bg-zinc-950'>
                        <div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 px-0 py-6 mx-4 my-6 sm:p-6 lg:p-8 pb-0 sm:pb-0 lg:pb-0 md:mx-4 lg:w-3/4 xl:w-1/2">

                            <span
                                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
                            ></span>

                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white sm:text-3xl ">
                                    About Me
                                </h3>
                            </div>

                            <div id="about-section" className="mt-6 text-gray-200 text-md m-10 ">

                                <div className="h-full flex flex-col sm:flex-row items-center justify-evenly gap-8">

                                    <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full p-1  select-none pointer-events-none">
                                        <div className="bg-white rounded-full invert overflow-hidden h-48 w-48 select-none pointer-events-none ">
                                            <Image src="./profile.svg" alt="Profile" fill className="pt-1.5" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col text-center sm:text-left ">
                                        <div className="text-gray-300">Hello there!</div>
                                        <div className="text-2xl sm:text-3xl">I'm Ayush Makwana</div>
                                        <Separator />
                                        <div className="text-sm text-gray-300 mt-2 ">A Passionate individual currently pursuing Bachelor's degree in Computer Science and Engineering, actively immersed in the world of Web and Cloud Technologies.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <LandingFooter />
            </div>

        </>
    );
}
