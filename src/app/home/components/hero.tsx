"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin"; // Import the TextPlugin
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const HeroSection: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Title and Subtitle animation
        if (textRef.current) {
            // Title typing animation
            gsap.fromTo(
                textRef.current.querySelector("h1"),
                {
                    opacity: 0,
                    y: 100,
                    scale: 0.8,
                    rotation: -10,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current.querySelector("h1"),
                        start: "top 80%",
                        end: "top 50%",
                        scrub: true,
                    },
                }
            );

            // Subtitle typing animation
            gsap.fromTo(
                textRef.current.querySelector("p"),
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: textRef.current.querySelector("p"),
                        start: "top 80%",
                        end: "top 50%",
                        scrub: true,
                    },
                }
            );

            // Typing effect for title
            gsap.to(textRef.current.querySelector("h1"), {
                duration: 4, // Adjust duration for typing speed
                text: {
                    value: "Stay Safe, Stay Alert with Alertify",
                    delimiter: ""
                },
                ease: "power3.inOut",
                delay: 0.5,
            });
        }

        // Image animation with a slight parallax effect
        if (imageRef.current) {
            gsap.fromTo(
                imageRef.current,
                { opacity: 0, y: 50, scale: 1.1 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: true,
                    },
                }
            );
        }

        // Buttons animation
        if (buttonsRef.current) {
            gsap.fromTo(
                buttonsRef.current.querySelectorAll("a"),
                { opacity: 0, y: 20, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: buttonsRef.current,
                        start: "top 95%",
                        end: "top 55%",
                        scrub: true,
                    },
                }
            );
        }
    }, []);

    return (
        <section ref={heroRef} className="px-2 py-24 bg-yellow-100 md:px-0">
            <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                <div className="flex flex-wrap items-center sm:-mx-3">
                    <div className="w-full md:w-1/2 md:px-3">
                        <div
                            ref={textRef}
                            className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-6 xl:space-y-8 sm:pr-5 lg:pr-0 md:pb-0"
                        >
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                                <span className="block xl:inline">
                                    Stay Safe, Stay Alert
                                </span>
                                <span className="block text-indigo-600 xl:inline">
                                    {" "}with Alertify
                                </span>
                            </h1>
                            <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                                {/* Your paragraph text here */}
                            </p>
                            <div
                                ref={buttonsRef}
                                className="relative flex flex-col sm:flex-row sm:space-x-4"
                            >
                                <Link
                                    href="/report"
                                    className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                                >
                                    Report Incident
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 ml-1"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                                <Link
                                    href="/women"
                                    className="flex items-center w-full px-6 py-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                                >
                                    Women Safety
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div
                            ref={imageRef}
                            className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl"
                        >
                            <img src="/images/alert.jpg" alt="Hero Image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
