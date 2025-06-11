"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

const Page = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors , isSubmitting },
      } = useForm();

      const [message, setMessage] = useState("");
      const [isError, setIsError] = useState(false);

      async function onSubmit(data) {
        setMessage(""); // Clear previous messages
        setIsError(false); // Clear previous error state

        try {
          const response = await fetch("http://127.0.0.1:1337/api/contact-forms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();

          if (response.ok) {
            setMessage(result.message || "Contact form submitted successfully!");
            reset(); // Clear the form after successful submission
          } else {
            setIsError(true);
            setMessage(result.message || "Failed to send message.");
          }
        } catch (error) {
          setIsError(true);
          setMessage("An unexpected error occurred. Please try again.");
          console.error("Submission error:", error);
        }
      }
  return (

      <div className="mt-24 container mx-auto p-6 max-w-2xl">
      {message && (
        <div className={`p-4 mb-4 rounded-md ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium">Name</label>
          <input
            id="fullName"
            className="w-full p-2 border rounded-md"
            {...register("FullName", { 
              required: true, 
              minLength: 3,
              maxLength: 50 
            })} 
          />
          {errors.FullName?.type === "required" && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
          {errors.FullName?.type === "minLength" && (
            <p className="text-red-500 text-sm">Name must be at least 3 characters</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
          <input
            id="phone"
            type="tel"
            className="w-full p-2 border rounded-md"
            {...register("Number", {
              pattern: /^[0-9]{10}$/
            })} 
          />
          {errors.Number?.type === "pattern" && (
            <p className="text-red-500 text-sm">Please enter a valid 10-digit phone number</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded-md"
            {...register("Email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            })} 
          />
          {errors.Email?.type === "required" && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
          {errors.Email?.type === "pattern" && (
            <p className="text-red-500 text-sm">Please enter a valid email address</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea
            id="message"
            className="w-full p-2 border rounded-md h-32"
            {...register("Message", {
              required: true,
              minLength: 10
            })} 
          />
          {errors.Message?.type === "required" && (
            <p className="text-red-500 text-sm">Message is required</p>
          )}
          {errors.Message?.type === "minLength" && (
            <p className="text-red-500 text-sm">Message must be at least 10 characters</p>
          )}
        </div>

        <div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? "bg-slate-600 opacity-50 cursor-not-allowed" : "bg-blue-500"} text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors`}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>

  )
}

export default Page
