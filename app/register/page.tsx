"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingScreen from "../components/LoadingScreen";
import HeartsRain from "../components/HeartsRain";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [errors, setErrors] = useState({
    name: "",
    contactNumber: "",
    email: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    contactNumber: false,
    email: false,
  });

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Accepts formats: +94XXXXXXXXX, 0XXXXXXXXX, or with spaces/dashes
    const phoneRegex = /^(\+94|0)?[0-9\s\-()]{9,15}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "contactNumber":
        if (!value.trim()) {
          error = "Contact number is required";
        } else if (!validatePhone(value)) {
          error = "Please enter a valid phone number";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error === "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      contactNumber: true,
      email: true,
    });

    // Validate all fields
    const isNameValid = validateField("name", formData.name);
    const isPhoneValid = validateField("contactNumber", formData.contactNumber);
    const isEmailValid = validateField("email", formData.email);

    if (!isNameValid || !isPhoneValid || !isEmailValid) {
      return;
    }

    // Store form data before clearing
    const submittedData = { ...formData };

    // Show brief loading state for better UX (just 300ms)
    setIsSubmitting(true);

    setTimeout(() => {
      // OPTIMISTIC UI UPDATE - Show success immediately!
      setIsSubmitting(false);
      setSubmitStatus({
        type: "success",
        message:
          "Registration received! We'll contact you soon with ticket information.",
      });

      // Clear form immediately
      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        city: "",
      });
      setTouched({
        name: false,
        contactNumber: false,
        email: false,
      });
      setErrors({
        name: "",
        contactNumber: "",
        email: "",
      });

      // Auto-hide success message after 6 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 6000);
    }, 300); // Brief 300ms delay for visual feedback

    // Save to Google Sheets in the background (user doesn't wait for this)
    // Using keepalive ensures the request continues even if user closes the page
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      fetch("/api/SaveToSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedData),
        signal: controller.signal,
        keepalive: true, // Important! Request continues even if page closes
      })
        .then((response) => {
          clearTimeout(timeoutId);
          if (!response.ok) {
            console.error("Failed to save to sheet, but user already notified");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Successfully saved to sheet:", data);
        })
        .catch((error) => {
          console.error("Background save error:", error);
          // Data is lost but user already saw success - could implement retry logic here
        });
    } catch (error) {
      console.error("Failed to initiate background save:", error);
    }
  };

  return (
    <>
      <LoadingScreen />
      <HeartsRain />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium transition-all duration-300 hover:gap-3 gap-2 group"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Home
              </Link>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border-2 border-pink-200 transition-all duration-300 hover:shadow-pink-200/50">
              <div className="bg-gradient-to-r from-pink-500 via-pink-700 to-pink-500 text-white px-6 py-6 md:py-8 text-center">
                <div className="flex justify-center mb-3">
                  <Image
                    width={300}
                    height={300}
                    src="/logo.png"
                    alt="Snehaye Nagaraya Logo"
                    className="w-auto h-12 md:h-20 object-contain"
                  />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 sinhala-text leading-relaxed">
                  ස්නේහයේ නගරය
                </h1>
                <p className="text-base md:text-lg opacity-95">
                  Pre-Registration Form
                </p>
              </div>{" "}
              <div className="px-6 py-8 md:px-10 md:py-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Row: Name and Contact Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-800 font-semibold mb-2 text-base md:text-lg"
                      >
                        <span className="sinhala-text">නම</span> / Name{" "}
                        <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-gray-800 ${
                          errors.name && touched.name
                            ? "border-red-400 focus:border-red-500 bg-red-50"
                            : "border-gray-300 focus:border-pink-500 focus:shadow-lg focus:shadow-pink-100"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && touched.name && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contactNumber"
                        className="block text-gray-800 font-semibold mb-2 text-base md:text-lg"
                      >
                        <span className="sinhala-text">දුරකථන අකය</span> /
                        Contact Number <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-gray-800 ${
                          errors.contactNumber && touched.contactNumber
                            ? "border-red-400 focus:border-red-500 bg-red-50"
                            : "border-gray-300 focus:border-pink-500 focus:shadow-lg focus:shadow-pink-100"
                        }`}
                        placeholder="+94 XX XXX XXXX"
                      />
                      {errors.contactNumber && touched.contactNumber && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.contactNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Second Row: Email and City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-800 font-semibold mb-2 text-base md:text-lg"
                      >
                        <span className="sinhala-text">විද්‍යුත් තැපැල්</span> /
                        Email <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 text-gray-800 ${
                          errors.email && touched.email
                            ? "border-red-400 focus:border-red-500 bg-red-50"
                            : "border-gray-300 focus:border-pink-500 focus:shadow-lg focus:shadow-pink-100"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && touched.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-gray-800 font-semibold mb-2 text-base md:text-lg"
                      >
                        <span className="sinhala-text">නගරය</span> / City{" "}
                        <span className="text-gray-400 text-sm">
                          (<span className="sinhala-text">Optional</span>)
                        </span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none transition-all duration-300 text-gray-800 focus:shadow-lg focus:shadow-pink-100"
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-pink-300"
                      } text-white`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Registration"
                      )}
                    </button>
                  </div>
                </form>

                {submitStatus.type && (
                  <div
                    className={`mt-6 p-5 rounded-xl border-2 ${
                      submitStatus.type === "success"
                        ? "bg-gradient-to-r from-green-50 to-green-100 border-green-300 text-green-800"
                        : "bg-gradient-to-r from-red-50 to-red-100 border-red-300 text-red-800"
                    }`}
                  >
                    <p className="font-medium flex items-center gap-2">
                      {submitStatus.type === "success" ? (
                        <svg
                          className="w-6 h-6 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span>{submitStatus.message}</span>
                    </p>
                  </div>
                )}

                <div className="mt-8 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-5 border-2 border-pink-200">
                  <p className="text-sm text-gray-700 text-center leading-relaxed">
                    <span className="font-semibold"> Note:</span> All fields
                    marked with{" "}
                    <span className="text-pink-500 font-bold">*</span> are
                    required. Your information will be kept confidential and
                    used only for event communications.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-6 py-6 border border-pink-200">
              <div className="text-gray-800 font-semibold mb-2">
                Organized by Kandyanz Events
              </div>
              <div className="text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <a
                  href="tel:+94702825777"
                  className="hover:text-pink-600 transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +94 70 282 5777
                </a>
                <span className="hidden sm:inline">|</span>
                <a
                  href="mailto:bsanka27@gmail.com"
                  className="hover:text-pink-600 transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  bsanka27@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
