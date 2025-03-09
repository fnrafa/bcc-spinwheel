"use client";
import React from "react";
import Background from "@/components/layout/Background";
import SpinWheel from "@/components/SpinWheel";
import {useSpinContext} from "@/context/SpinContext";
import Heading from "@/components/common/Heading";
import Badge from "@/components/common/Badge";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
    const {title} = useSpinContext();

    return (
        <Background>
            <div className="min-h-screen z-10 flex flex-col">
                <Header/>
                <main className="flex-grow px-4 pt-8 md:pt-0">
                    <div className="flex flex-col items-center justify-center relative w-full gap-4">
                        <Heading text="Spin the Wheel!" size={92}/>
                        <Badge text={title} size={16}/>

                        <div className="flex relative justify-center items-center w-full mt-2 px-4">
                            <div
                                className="absolute w-[32%] md:w-[38%] left-8 md:left-0 lg:left-[-8%] md:bottom-[10%]
                        top-[-3%] md:top-auto flex justify-center"
                            >
                                <Image
                                    src="/assets/male.png"
                                    alt="Character Left"
                                    width={720}
                                    height={720}
                                    priority
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="relative w-[80%] md:w-[60%] flex justify-center z-20">
                                <SpinWheel/>
                            </div>
                            <div
                                className="absolute w-[32%] md:w-[38%] right-8 md:right-0 lg:right-[-8%] md:bottom-[10%]
                        top-[-3%] md:top-auto flex justify-center transform scale-x-[-1]"
                            >
                                <Image
                                    src="/assets/male.png"
                                    alt="Character Right"
                                    width={720}
                                    height={720}
                                    priority
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </Background>
    );
}
