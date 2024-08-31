"use client";
import { CloudCog } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const ComplaintRegistration: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [step, setStep] = useState(1);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadScript = (url: string) => {
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) return; // Prevent loading the script multiple times

      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = url;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => {
        if (location && mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: location,
            zoom: 15,
          });

          new google.maps.Marker({
            position: location,
            map: map,
            title: 'Your Location',
          });
        }
      };
    };

    if (!window.google) {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDehItHvkHlTaReBG1ym1_AjWxhPA9wxTE`);
    } else {
      if (location && mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: location,
          zoom: 15,
        });

        new google.maps.Marker({
          position: location,
          map: map,
          title: 'Your Location',
        });
      }
    }
  }, [location]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        () => {
          alert('Unable to retrieve your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle form submission logic here
      console.log({
        location,
        incidentType,
        description,
        isAnonymous,
      });
      // Reset form
      setLocation(null);
      setIncidentType('');
      setDescription('');
      setIsAnonymous(false);
      setStep(1);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen text-black flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Report an Incident
        </h2>

        {/* Progress Bar */}
        <div className="flex mb-4">
          <div className={`flex-1 h-1 ${step >= 1 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
          <div className={`flex-1 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
          <div className={`flex-1 h-1 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
        </div>

        <form onSubmit={handleNext}>
          {step === 1 && (
            <div className="mb-4">
              <label htmlFor="location" className="block font-medium mb-2">
                Location
                <span className="text-xs text-gray-500 ml-1">(Click to get your location)</span>
              </label>
              <button
                type="button"
                onClick={getLocation}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
              >
                Get My Location
              </button>
              {location && (
                <div className="mt-2">
                  <p>Latitude: {location.lat}</p>
                  <p>Longitude: {location.lng}</p>
                </div>
              )}
              <div
                ref={mapRef}
                className="w-full h-64 border rounded-md mt-4"
              />
            </div>
          )}

          {step === 2 && (
            <div className="mb-4">
              <label htmlFor="incidentType" className="block font-medium mb-2">
                Incident Type
              </label>
              <select
                id="incidentType"
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-purple-600"
                required
              >
                <option value="">Select incident type</option>
                <option value="harassment">Harassment</option>
                <option value="assault">Assault</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          {step === 3 && (
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-2">
                Description
                <span className="text-xs text-gray-500 ml-1">(Provide details about the incident)</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-purple-600"
                rows={4}
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isAnonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="form-checkbox h-5 w-5 text-purple-600 mr-2"
            />
            <label htmlFor="isAnonymous" className="text-gray-700">
              Submit anonymously
            </label>
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md w-full"
          >
            {step < 3 ? 'Next' : 'Submit Complaint'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintRegistration;
