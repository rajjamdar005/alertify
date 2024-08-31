"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const EmergencyContactForm: React.FC = () => {
  const [contacts, setContacts] = useState<string[]>(["", "", ""]);
  const [showNumberInputs, setShowNumberInputs] = useState<boolean>(false);
  const [numbersAdded, setNumbersAdded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    const newContacts = [...contacts];
    newContacts[index] = value;
    setContacts(newContacts);
  };

  const addNumbers = async () => {
    if (contacts.every((contact) => contact.trim() !== "")) {
      try {
        await addDoc(collection(db, "mobilenumbers"), {
          emergencyNumber: contacts[0].trim(),
          policeNumber: contacts[1].trim(),
          authorityNumber: contacts[2].trim(),
          timestamp: new Date(),
        });

        setNumbersAdded(true);
        alert("Mobile numbers added successfully!");
        router.push("/home");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error adding mobile numbers. Check the console for details.");
      }
    } else {
      alert("Please enter all three mobile numbers.");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="mb-5 text-4xl font-bold text-gray-800 text-center">
          Stay Safe with Alertify
        </h1>
        <p className="mb-5 text-gray-600 text-center">
          Quick alerts can save lives. Add your emergency contacts and be prepared for any situation.
        </p>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="flex flex-col items-center space-y-4">
          {!numbersAdded ? (
            <>
              <button
                className="btn btn-primary bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
                onClick={() => setShowNumberInputs(true)}
              >
                Add Emergency Contacts
              </button>
              {showNumberInputs && (
                <div className="space-y-2 w-full">
                  <input
                    type="text"
                    placeholder="Emergency number"
                    className="input input-bordered w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => handleInputChange(0, e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Local Police Number"
                    className="input input-bordered w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => handleInputChange(1, e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Local Authority Number"
                    className="input input-bordered w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => handleInputChange(2, e.target.value)}
                  />
                  <button
                    className="btn btn-primary bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                    onClick={addNumbers}
                  >
                    Save Numbers
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-green-500">Contacts saved successfully!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactForm;
