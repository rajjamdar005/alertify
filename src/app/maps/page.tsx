import React, { useEffect, useRef, useState } from 'react';

const LocationCapture: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (location) {
      const map = new google.maps.Map(mapRef.current!, {
        center: location,
        zoom: 15,
      });

      new google.maps.Marker({
        position: location,
        map: map,
        title: 'Your Location',
      });
    }
  }, [location]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Capture Your Location</h2>
      <button
        onClick={getLocation}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mb-4"
      >
        Get My Location
      </button>
      <div
        ref={mapRef}
        className="w-full h-64 border rounded-md"
      />
      {location && (
        <div className="mt-4">
          <p>Your Location:</p>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}
    </div>
  );
};

export default LocationCapture;