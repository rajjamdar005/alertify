"use client";
import React from "react";
import Link from "next/link";
import { CircleArrowUp, CloudSunRain, TriangleAlert, AlertTriangle } from "lucide-react";

export default function Cardnew() {
  const riskValue = "139 532",
    securityTime = "30m",
    numberOfIssues = 2,
    accidentRisk = "High",
    accidentTime = "15m",
    numberOfAccidents = 3;

  return (
    <div className="bg-yellow-100 flex justify-between items-center gap-6 p-4">
      {/* Weather Widget */}
      <div className="flex size-52 flex-col rounded-3xl bg-opacity-10 bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter dark:from-gray-700 dark:to-gray-900">
        <div className="flex flex-1 flex-col gap-2 dark:text-white">
          <p className="city opacity-70">Tokyo</p>
          <div className="flex items-center">
            <CloudSunRain className="h-10 w-10" />
            <p className="text-5xl font-black">19&deg;</p>
          </div>
          <p className="feels-like opacity-70">Feels like 21&deg;</p>
        </div>
        <div className="flex justify-between rounded-xl bg-gray-400 bg-opacity-30 bg-clip-padding py-1 backdrop-blur-lg backdrop-filter">
          <div className="flex items-center gap-1 px-2 text-orange-500 dark:text-orange-200">
            <CircleArrowUp className="h-5 w-5" />
            24&deg;
          </div>
          <p className="text-black opacity-50">|</p>
          <div className="flex items-center gap-1 px-3 text-green-800 dark:text-green-200">
            <CircleArrowUp className="h-5 w-5 rotate-180" />
            9&deg;
          </div>
        </div>
        
      </div>
      

      {/* Security Alert Widget */}
      <div className="flex size-52 flex-col items-center gap-1 overflow-hidden rounded-3xl bg-black">
        <div className="h-5 w-full bg-striped" />
        <div className="flex h-full flex-col gap-1 px-4 pb-4">
          <div className="mt-1 px-4 text-lg text-gray-300">Security is at Risk</div>
          <div className="w-full text-center text-2xl font-bold text-white">{riskValue}</div>
          <div className="my-1 flex w-full flex-1 items-center justify-center gap-2">
            <div className="text-sm text-gray-400">{securityTime} ago</div>
            <div className="rounded-lg bg-zinc-600 px-2 py-1 text-sm text-gray-300">Quick scan</div>
          </div>
          <div className="mt-auto flex animate-blink-red items-center justify-center gap-2 rounded-2xl border-2 border-red-500 px-10 py-2 font-bold">
            <TriangleAlert className="fill-red-500 stroke-red-800" />
            <div className="text-red-500">{numberOfIssues} Items</div>
          </div>
        </div>
      </div>

      {/* Accident Alert Widget */}
      <div className="flex size-52 flex-col items-center gap-1 overflow-hidden rounded-3xl bg-red-900">
        <div className="h-5 w-full bg-striped bg-gradient-to-r from-red-500 to-yellow-500" />
        <div className="flex h-full flex-col gap-1 px-4 pb-4">
          <div className="mt-1 px-4 text-lg text-gray-200">Accident Alert</div>
          <div className="w-full text-center text-2xl font-bold text-white">{accidentRisk}</div>
          <div className="my-1 flex w-full flex-1 items-center justify-center gap-2">
            <div className="text-sm text-gray-300">{accidentTime} ago</div>
            <div className="rounded-lg bg-red-700 px-2 py-1 text-sm text-gray-100">View details</div>
          </div>
          <div className="mt-auto flex animate-blink-red items-center justify-center gap-2 rounded-2xl border-2 border-yellow-500 px-10 py-2 font-bold">
            <AlertTriangle className="fill-yellow-500 stroke-red-800" />
            <div className="text-yellow-500">{numberOfAccidents} Reported</div>
          </div>
        </div>
      </div>
    </div>
  );
}
