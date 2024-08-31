"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SafetyMeasures: React.FC = () => {
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        cardRefs.current.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    opacity: 0,
                    y: 100,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%", // Trigger animation when the card is near the viewport
                        end: "top 50%",
                        scrub: true,
                    },
                    delay: index * 0.2, // Stagger the animations
                }
            );
        });

        // Section heading animation
        if (sectionRef.current) {
            gsap.fromTo(
                sectionRef.current.querySelector("h1"),
                {
                    opacity: 0,
                    y: -50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%", // Trigger animation when the section is near the viewport
                        end: "top 40%",
                        scrub: true,
                    },
                }
            );
        }
    }, []);

    return (
        <div
            ref={sectionRef}
            className="min-h-screen bg-yellow-100 text-gray-900 p-8"
        >
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-12 text-center text-indigo-600">
                    Safety Measures
                </h1>
                <p className="text-lg mb-12 text-center text-gray-700">
                    Alertify provides comprehensive safety measures to help keep
                    you and your loved ones secure.
                </p>
                <div className="space-y-10">
                    {[
                        {
                            title: "Personal Safety Tips",
                            description:
                                "Stay alert, trust your instincts, and be prepared. Carry a personal safety alarm and learn self-defense techniques.",
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-10 h-10 text-indigo-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            ),
                        },
                        {
                            title: "Home Security Measures",
                            description:
                                "Install security cameras, use deadbolt locks, and keep your home well-lit. Consider a home security system for added protection.",
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-10 h-10 text-indigo-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 7v4a4 4 0 004 4h10a4 4 0 004-4V7m0 0l-7-4-7 4m0 0v4a4 4 0 004 4h10a4 4 0 004-4V7"
                                    />
                                </svg>
                            ),
                        },
                        {
                            title: "Women's Safety",
                            description:
                                "Alertify provides specialized features and resources to help keep women safe, including emergency contacts, self-defense tips, and access to local support services.",
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-10 h-10 text-indigo-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 14l9-5-9-5-9 5-9-5z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 14v10"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 24L3 19m9 5l9-5m-9 0v10"
                                    />
                                </svg>
                            ),
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el && !cardRefs.current.includes(el)) {
                                    cardRefs.current.push(el);
                                }
                            }}
                            className="flex items-start space-x-6 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-500 ease-in-out hover:-translate-y-2"
                        >
                            <div className="text-indigo-600">{item.icon}</div>
                            <div>
                                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                                    {item.title}
                                </h2>
                                <p className="text-lg text-gray-700">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SafetyMeasures;
