"use client";

import { useState } from "react";
import CheckMark from "@/app/components/loaders/checkMark";
import RegistrationForm from "./RegistrationForm";
import LegalCheck from "./LegalCheck";

const Registration = () => {
  // Define state variables for username, email, password, message, and isSuccess
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [terms, setTerms] = useState(false);
  const [isLegalCheckOpen, setIsLegalCheckOpen] = useState(false);
  

  const handleTermsClick = (e) => {
    e.preventDefault();
    setIsLegalCheckOpen(true); // Set isLegalCheckOpen to true when the terms are clicked
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsSuccess(false);
    // Call registration API
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      // If registration is successful
      if (data.status === 201) {
        setIsSuccess(true);
        setMessage("Registrierung erfolgreich. Bitte überprüfen Sie Ihre E-Mails und bestätigen Sie Ihre E-Mail-Adresse.");
      } else {
        // Registration error
        setMessage(data.message || "Error during registration");
      }
    } catch (error) {
      // API error
      console.error("Registration error", error);
      setMessage("Server error.");
    }
  };

  // Render the registration form and checkmark component if registration is successful
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col bumpup w-[335px]">
        <h1 className="text-2xl text-center mt-5">Register</h1>
        {isSuccess ? (
          <CheckMark message={message} />
        ) : (
          <RegistrationForm
            username={username}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            message={message}
            handleTermsClick={handleTermsClick}
            terms={terms}
            setTerms={setTerms}
          />
        )}
      </div>
      <LegalCheck isOpen={isLegalCheckOpen} onClose={() => setIsLegalCheckOpen(false)} />
    </div>
  );
};

export default Registration;