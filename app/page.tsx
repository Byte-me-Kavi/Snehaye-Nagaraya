"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import HeartsRain from "./components/HeartsRain";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const artists = [
    {
      name: "Amarasiri Peiris",
      title: "Legendary Vocalist",
      image: "/amarasiri pieris.jpg",
    },
    {
      name: "Kasun Kalhara",
      title: "Contemporary Icon",
      image: "/kasun kalhara.jpg",
    },
    {
      name: "Sunil Edirisinghe",
      title: "Master of Melody",
      image: "/Sunil Edirisinghe.jpg",
    },
    {
      name: "Karunarathna Divulgane",
      title: "Classical Virtuoso",
      image: "/karunarathne divulgane.jpg",
    },
    {
      name: "Shashika Nisansala",
      title: "Voice of the Youth",
      image: "/shashika nisansala.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % artists.length);
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(timer);
  }, [artists.length]);
  return (
    <>
      <LoadingScreen />
      <HeartsRain />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-pink-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-6 md:py-5 text-center">
                <div className="flex justify-center mb-3">
                  <Image
                    width={300}
                    height={300}
                    src="/logo.png"
                    alt="Snehaye Nagaraya Logo"
                    className="w-auto h-16 md:h-24 object-contain"
                  />
                </div>
                {/* <h1 className="text-2xl md:text-4xl font-bold mb-2 sinhala-text leading-relaxed">
                  ස්නේහයේ නගරය
                </h1> */}
                <div className="text-lg md:text-xl font-semibold mb-1">
                  Snehaye Nagaraya
                </div>
                <div className="text-base md:text-lg opacity-95">
                  Live in Concert - Colombo
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6 md:px-10 md:py-8">
                {/* Tagline */}
                <div className="text-center mb-6">
                  <p className="text-xl md:text-2xl sinhala-text text-pink-700 font-medium leading-relaxed mb-2">
                    ප්‍රේමණීය සිත්සතන් ස්නේහයෙන්
                  </p>
                  <p className="text-xl md:text-2xl sinhala-text text-pink-700 font-medium leading-relaxed">
                    මුණගස්සන මායාකාරී හවස් වරුව ❤
                  </p>
                </div>

                {/* Featured Artists */}
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
                    Featured Artists
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 text-center mb-6">
                    Legendary voices unite for an unforgettable evening
                  </p>

                  {/* Auto-Sliding Carousel with Card Dimensions */}
                  <div className="relative mb-10">
                    {/* Desktop: Auto-sliding single card */}
                    <div className="hidden md:block">
                      <div className="relative max-w-md mx-auto">
                        <div className="relative h-80 overflow-hidden rounded-2xl">
                          {artists.map((artist, index) => (
                            <div
                              key={index}
                              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                index === currentSlide
                                  ? "opacity-100 scale-100"
                                  : "opacity-0 scale-95"
                              }`}
                            >
                              <div className="group relative h-full w-full bg-gradient-to-br from-pink-50 to-white rounded-2xl overflow-hidden border-2 border-pink-200 shadow-xl">
                                {/* Artist Image */}
                                <div className="relative h-full w-full overflow-hidden">
                                  <Image
                                    src={artist.image}
                                    alt={artist.name}
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                    sizes="448px"
                                    priority={index === 0}
                                  />
                                  {/* Gradient Overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                  {/* Decorative Glow */}
                                  <div className="absolute top-4 right-4 w-16 h-16 bg-pink-500/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                </div>

                                {/* Artist Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                  <h3 className="text-xl font-bold mb-1 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                                    {artist.name}
                                  </h3>
                                  <p className="text-sm text-pink-200 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                                    {artist.title}
                                  </p>
                                </div>

                                {/* Hover Effect Border Glow */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-pink-600/20"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Navigation Dots */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                          {artists.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                  ? "bg-pink-500 w-8"
                                  : "bg-pink-300 hover:bg-pink-400"
                              }`}
                              aria-label={`Go to ${artists[index].name}`}
                            />
                          ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                          onClick={() =>
                            setCurrentSlide(
                              (prev) =>
                                (prev - 1 + artists.length) % artists.length
                            )
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 rounded-full transition-all duration-300 z-20 shadow-lg hover:scale-110"
                          aria-label="Previous artist"
                        >
                          <svg
                            className="w-5 h-5"
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
                        </button>
                        <button
                          onClick={() =>
                            setCurrentSlide(
                              (prev) => (prev + 1) % artists.length
                            )
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 rounded-full transition-all duration-300 z-20 shadow-lg hover:scale-110"
                          aria-label="Next artist"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Mobile: Auto-sliding single card */}
                    <div className="md:hidden">
                      <div className="relative max-w-xs mx-auto">
                        <div className="relative h-96 overflow-hidden rounded-2xl">
                          {artists.map((artist, index) => (
                            <div
                              key={index}
                              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                index === currentSlide
                                  ? "opacity-100 scale-100"
                                  : "opacity-0 scale-95"
                              }`}
                            >
                              <div className="group relative h-full w-full bg-gradient-to-br from-pink-50 to-white rounded-2xl overflow-hidden border-2 border-pink-200 shadow-xl">
                                {/* Artist Image */}
                                <div className="relative h-full w-full overflow-hidden">
                                  <Image
                                    src={artist.image}
                                    alt={artist.name}
                                    fill
                                    className="object-cover object-top"
                                    sizes="320px"
                                    priority={index === 0}
                                  />
                                  {/* Gradient Overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                  {/* Decorative Glow */}
                                  <div className="absolute top-4 right-4 w-16 h-16 bg-pink-500/40 rounded-full blur-2xl"></div>
                                </div>

                                {/* Artist Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                  <h3 className="text-xl font-bold mb-1">
                                    {artist.name}
                                  </h3>
                                  <p className="text-sm text-pink-200">
                                    {artist.title}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Navigation Dots */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                          {artists.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                  ? "bg-pink-500 w-8"
                                  : "bg-pink-300 hover:bg-pink-400"
                              }`}
                              aria-label={`Go to ${artists[index].name}`}
                            />
                          ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                          onClick={() =>
                            setCurrentSlide(
                              (prev) =>
                                (prev - 1 + artists.length) % artists.length
                            )
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 rounded-full transition-all duration-300 z-20 shadow-lg"
                          aria-label="Previous artist"
                        >
                          <svg
                            className="w-5 h-5"
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
                        </button>
                        <button
                          onClick={() =>
                            setCurrentSlide(
                              (prev) => (prev + 1) % artists.length
                            )
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-600 p-2 rounded-full transition-all duration-300 z-20 shadow-lg"
                          aria-label="Next artist"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">
                    <p className="text-sm md:text-base text-gray-700 text-center leading-relaxed italic">
                      &ldquo;The stage awaits the echo of legends. An evening
                      where music becomes eternal.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="bg-gradient-to-br from-pink-100 to-white rounded-xl p-4 mb-6 border-2 border-pink-300">
                  <div className="flex flex-col md:flex-row md:justify-around md:items-center gap-3 text-center">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Venue</div>
                      <div className="text-sm md:text-base font-semibold text-gray-800">
                        Musaeus College Auditorium
                      </div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-pink-300"></div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Date</div>
                      <div className="text-sm md:text-base font-semibold text-gray-800">
                        December 13, 2025
                      </div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-pink-300"></div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Time</div>
                      <div className="text-sm md:text-base font-semibold text-gray-800">
                        7:30 PM onwards
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mb-6">
                  <Link
                    href="/register"
                    className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold text-base md:text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Pre-register Now
                  </Link>
                  <p className="text-xs text-gray-600 mt-2">
                    Click to leave your details and receive early notifications
                  </p>
                </div>

                {/* Why Pre-register */}
                <div className="border-t-2 border-pink-200 pt-5 mb-5">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 text-center">
                    Why pre-register?
                  </h2>
                  <ul className="space-y-2 text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2 text-lg flex-shrink-0">
                        ✓
                      </span>
                      <span>
                        Secure your interest and receive early ticket
                        notifications
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2 text-lg flex-shrink-0">
                        ✓
                      </span>
                      <span>
                        Exclusive VIP offers and early-bird deals for
                        registrants
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-500 mr-2 text-lg flex-shrink-0">
                        ✓
                      </span>
                      <span>
                        Helps us share important event updates (venue, timings,
                        safety)
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Photo Gallery */}
                <div className="border-t-2 border-pink-200 pt-5 mb-5">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 text-center">
                    Event Highlights
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <Image
                        src="/1.jpg"
                        alt="Event Photo 1"
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <Image
                        src="/2.jpg"
                        alt="Event Photo 2"
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <Image
                        src="/3.jpg"
                        alt="Event Photo 3"
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <Image
                        src="/4.jpg"
                        alt="Event Photo 4"
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Privacy Note */}
                <div className="bg-gray-50 rounded-lg p-3 mb-5 border border-gray-200">
                  <p className="text-xs md:text-sm text-gray-600 text-center">
                    <span className="font-semibold">🔒 Privacy Protected:</span>{" "}
                    Only the event admin can download the registration list
                    (password protected)
                  </p>
                </div>

                {/* Share Section */}
                <div className="border-t-2 border-pink-200 pt-5">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 text-center">
                    Share & Spread the Love
                  </h2>
                  <p className="text-sm text-gray-700 text-center">
                    Share this page with friends on WhatsApp, Facebook, or
                    Instagram. Use it as the official pre-registration page for
                    &ldquo;Snehaye Nagaraya&rdquo;.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center bg-white rounded-xl shadow-md px-6 py-6 border border-pink-200">
              <div className="text-gray-800 font-semibold mb-2">
                Organized by Kandyanz Events
              </div>
              <div className="text-gray-600">
                <a
                  href="tel:+94702825777"
                  className="hover:text-pink-600 transition-colors"
                >
                  +94 70 282 5777
                </a>
                {" | "}
                <a
                  href="mailto:bsanka27@gmail.com"
                  className="hover:text-pink-600 transition-colors"
                >
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
