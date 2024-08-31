"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { CornerUpRight, CornerUpLeft, ArrowUp, CircleArrowUp, CloudSunRain, TriangleAlert, AlertTriangle } from "lucide-react";

interface TrafficWidgetProps {
  directionValues: Direction[];
  duration?: number;
}

interface Direction {
  distance: number;
  direction: string;
  to: string;
  iconType: React.ElementType;
}

interface WeatherData {
  temperature: number;
  apparent_temperature: number;
}

export const trafficDirectionData: Direction[] = [
  {
    distance: 350,
    direction: "right",
    to: "Gurkha St.",
    iconType: CornerUpRight,
  },
  {
    distance: 700,
    direction: "left",
    to: "Rounding St.",
    iconType: CornerUpLeft,
  },
  {
    distance: 100,
    direction: "left",
    to: "Fulbari marga",
    iconType: CornerUpLeft,
  },
  {
    distance: 1000,
    direction: "straight",
    to: "hwy 16",
    iconType: ArrowUp,
  },
];

const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData | null> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    const response = await axios.get(url);
    return response.data.current_weather;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

const WeatherWidget: React.FC<{ latitude: number; longitude: number }> = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeatherData(latitude, longitude);
      setWeatherData(data);
      setLoading(false);
    };

    getWeather();
  }, [latitude, longitude]);

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (!weatherData) {
    return <div>Error fetching weather data.</div>;
  }

  return (
    <div className="flex flex-col rounded-lg bg-white p-4 shadow-lg">
      <div className="flex flex-col gap-2 text-gray-800">
        <p className="opacity-70">Location</p>
        <div className="flex items-center">
          <CloudSunRain className="h-10 w-10 text-blue-500" />
          <p className="text-5xl font-black">{weatherData.temperature}°</p>
        </div>
        <p className="opacity-70">Feels like {weatherData.apparent_temperature}°</p>
      </div>
      {/* You can add more weather details here as needed */}
    </div>
  );
};

const TrafficWidget: React.FC<TrafficWidgetProps> = ({ directionValues = trafficDirectionData, duration = 5000 }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [iconState, setIconState] = React.useState({
    prevIconType: directionValues[directionValues.length - 1].iconType,
    currentIconType: directionValues[0].iconType,
    nextIconType: directionValues[1].iconType,
  });
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const changeDirectionInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % directionValues.length;
        const prev = newIndex === 0 ? directionValues[directionValues.length - 1].iconType : directionValues[newIndex - 1].iconType;
        const next = newIndex === directionValues.length - 1 ? directionValues[0].iconType : directionValues[newIndex + 1].iconType;
        setIconState({
          prevIconType: prev,
          currentIconType: directionValues[newIndex].iconType,
          nextIconType: next,
        });
        return newIndex;
      });
      setProgress(0);
    }, duration);

    const progressIncrement = 100 / (duration / 100);
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + progressIncrement));
    }, 100);

    return () => {
      clearInterval(changeDirectionInterval);
      clearInterval(progressInterval);
    };
  }, [directionValues, duration]);

  const renderIcon = (IconComponent: React.ElementType, size = 52, color = "text-gray-300") => (
    <IconComponent size={size} className={color} />
  );

  const currentDirection = directionValues[currentIndex];

  return (
    <div className="flex items-center justify-between rounded-lg bg-black p-4 text-white shadow-lg">
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <p className="text-3xl font-bold">
          {currentDirection.distance}
          <span className="text-opacity-50">m</span>
        </p>
        <p className="animate-pulse">{renderIcon(iconState.currentIconType, 52, "text-white")}</p>
        <p className="text-md text-center text-gray-400">{currentDirection.to}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-[100px]">
        <div className="relative flex flex-col justify-evenly">
          <div className="absolute inset-0 shadow" style={{ boxShadow: "inset 0px -30px 20px 0px black" }} />
          {renderIcon(iconState.prevIconType, 32)}
          {renderIcon(iconState.currentIconType, 32, "text-green-300")}
          {renderIcon(iconState.nextIconType, 32)}
        </div>
        <div className="flex h-full w-[6px] items-end rounded-xl bg-gray-400">
          <div className="w-full rounded-xl bg-green-300" style={{ height: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default function KnowYourLocalitySection() {
  const riskValue = "139 532",
    securityTime = "30m",
    numberOfIssues = 2,
    accidentRisk = "High",
    accidentTime = "15m",
    numberOfAccidents = 3;

  // Example coordinates for Tokyo
  const latitude = 35.682839; // Tokyo Latitude
  const longitude = 139.759455; // Tokyo Longitude

  return (
    <section className="py-16 bg-yellow-100 text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Know Your Locality</h2>
        <p className="text-lg text-center mb-12 text-gray-600">Stay informed about your surroundings with the latest alerts and updates.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Weather Widget */}
          <WeatherWidget latitude={latitude} longitude={longitude} />

          {/* Security Alert Widget */}
          <div className="flex flex-col rounded-lg bg-red-900 p-4 shadow-lg">
            <div className="flex flex-col gap-2 text-white">
              <p className="text-lg">Security Alert</p>
              <p className="text-4xl font-bold">{riskValue}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm">{securityTime} ago</p>
                <div className="rounded-lg bg-gray-800 px-3 py-1 text-sm">Quick scan</div>
              </div>
              <div className="mt-auto flex items-center justify-center gap-2 rounded-lg border-2 border-red-600 px-10 py-2 font-bold">
                <TriangleAlert className="fill-red-500 stroke-red-800" />
                <p className="text-red-500">{numberOfIssues} Items</p>
              </div>
            </div>
          </div>

          {/* Accident Alert Widget */}
          <div className="flex flex-col rounded-lg bg-yellow-500 p-4 shadow-lg">
            <div className="flex flex-col gap-2 text-white">
              <p className="text-lg">Accident Alert</p>
              <p className="text-4xl font-bold">{accidentRisk}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm">{accidentTime} ago</p>
                <div className="rounded-lg bg-yellow-700 px-3 py-1 text-sm">View details</div>
              </div>
              <div className="mt-auto flex items-center justify-center gap-2 rounded-lg border-2 border-yellow-600 px-10 py-2 font-bold">
                <AlertTriangle className="fill-yellow-500 stroke-yellow-800" />
                <p className="text-yellow-500">{numberOfAccidents} Reported</p>
              </div>
            </div>
          </div>

          {/* Traffic Widget */}
          <TrafficWidget directionValues={trafficDirectionData} />
        </div>
      </div>
    </section>
  );
}  