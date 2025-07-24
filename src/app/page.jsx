"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  ClipboardCheck,
  ShieldCheck,
  UsersIcon,
  Award,
  ClipboardList,
  Search,
  BarChart2,
} from "lucide-react";

function CountUp({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) return;
    const timer = setTimeout(() => {
      setHasStarted(true);
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;
      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * end);
        setCount(currentCount);
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();
    }, 100);
    return () => clearTimeout(timer);
  }, [end, duration, hasStarted]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const images = [
  "/images/bay.png",
  "/images/costa.png",
  "/images/resort.jpg",
  "/images/casa.png",
  "/images/baler.png",
  "/images/l-sirene-boutique-resort.png",
  "/images/playa-azul-baler.png",
  "/images/Riverstone.png",
  "/images/m.png",
  "/images/caption.png",
];

function StartupScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const phases = [
      () => setAnimationPhase(1),
      () => setAnimationPhase(2),
      () => setAnimationPhase(3),
      () => setAnimationPhase(4),
      () => setAnimationPhase(5),
    ];

    phases.forEach((phase, index) => {
      setTimeout(phase, index * 600);
    });

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 overflow-hidden"
        >
          {/* 3D Floating particles */}
          {animationPhase >= 3 && (
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.random() * 400 - 200],
                    y: [0, Math.random() * 400 - 200],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                  className={`absolute w-3 h-3 rounded-full ${
                    i % 4 === 0
                      ? "bg-blue-400"
                      : i % 4 === 1
                      ? "bg-green-400"
                      : i % 4 === 2
                      ? "bg-purple-400"
                      : "bg-yellow-400"
                  }`}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: 0 }}
              animate={
                animationPhase >= 1
                  ? {
                      scale: animationPhase >= 2 ? [1, 1.1, 1] : 1,
                      opacity: 1,
                    }
                  : {}
              }
              transition={{
                scale: { duration: 1, times: [0, 0.5, 1] },
                opacity: { duration: 0.6 },
              }}
              className="relative mb-8"
            >
              <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
                <Image
                  src="/images/lap.png"
                  alt="ATDMS Logo"
                  width={120}
                  height={120}
                  className="drop-shadow-2xl"
                />
              </div>
              {animationPhase >= 2 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 border-4 border-blue-400 rounded-full"
                />
              )}
            </motion.div>

            {animationPhase >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6"
              >
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl font-bold text-gray-800 mb-2"
                >
                  ATDMS
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-gray-600"
                >
                  Central Aurora Tourism Management System
                </motion.p>
              </motion.div>
            )}

            {animationPhase >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "250px" }}
                  transition={{ duration: 0.5 }}
                  className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-4"
                >
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-400 via-green-500 to-purple-500 rounded-full relative"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-gray-600 text-sm font-medium"
                >
                  Loading Resources
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ATDMS() {
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("home");

  // Ensure component is mounted before running client-side effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setIsImageTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsImageTransitioning(false);
      }, 500);
    }, 5000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const sections = {
        home: document.querySelector(".hero-section"),
        features: document.querySelector("#features"),
        process: document.querySelector("#process"),
        contact: document.querySelector("#contact"),
      };

      const scrollPosition = window.scrollY + 100;

      Object.entries(sections).forEach(([key, section]) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ATDMS...</p>
        </div>
      </div>
    );
  }

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const features = [
    {
      icon: ClipboardCheck,
      title: "Streamlined Inspections",
      description:
        "Reduce inspection time by 60% with our digital checklists. Ensure thorough room-by-room evaluations without the paperwork hassle. Our intuitive interface allows inspectors to quickly navigate through tasks, capture photos, and add notes on the go.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance Assurance",
      description:
        "Stay updated with the latest hospitality regulations. Our system adapts to new guidelines, keeping your property compliant and guest-ready. Receive automatic updates on regulatory changes and ensure your inspections meet the highest standards.",
    },
    {
      icon: UsersIcon,
      title: "Admin Management",
      description:
        "Centralized control for administrators to oversee inspection processes, review submissions, and manage client establishments effectively. Gain insights through detailed reports and analytics to make informed decisions and improve operational efficiency.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "Maintain consistently high standards across all accommodations through systematic pre-inspection processes and administrative oversight. Track performance metrics and identify areas for improvement to ensure exceptional guest experiences.",
    },
  ];

  const inspectionSteps = [
    {
      icon: ClipboardList,
      title: "Pre-Inspection",
      description:
        "Get ready for inspections by setting up schedules and checklists. We'll help you prepare everything you need for a smooth evaluation process.",
      videoUrl: "/videos/pre-inspection.mp4",
    },
    {
      icon: Search,
      title: "On-Site Inspection",
      description:
        "Conduct thorough property inspections using our easy-to-use web platform. Take photos, add notes, and rate different areas all in one place.",
      videoUrl: "/videos/on-site-inspection.mp4",
    },
    {
      icon: BarChart2,
      title: "Follow-up & Improvement",
      description:
        "Track how well improvements are being made. Set deadlines, assign tasks to team members, and keep an eye on progress to help your property get better.",
      videoUrl: "/videos/follow-up-improvement.mp4",
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(
      sectionId === "home" ? ".hero-section" : `#${sectionId}`
    );
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <StartupScreen />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
        {/* 3D Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Floating 3D shapes */}
          <div
            className="absolute top-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-40 animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "4s" }}
          ></div>
          <div
            className="absolute top-40 right-20 w-12 h-12 bg-green-200 rounded-full opacity-35 animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "5s" }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-20 h-20 bg-purple-200 rounded-full opacity-30 animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "6s" }}
          ></div>
          <div
            className="absolute bottom-20 right-40 w-24 h-24 bg-yellow-200 rounded-full opacity-25 animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-8 h-8 bg-pink-200 rounded-full opacity-30 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/3 w-14 h-14 bg-indigo-200 rounded-full opacity-25 animate-pulse"
            style={{ animationDelay: "2.5s" }}
          ></div>
        </div>

        {/* Header - Updated Navbar without dropdown */}
        <motion.header
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg"
              : "bg-white/90 backdrop-blur-sm"
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center">
              {/* Logo Section - Positioned absolutely to the left */}
              <motion.div
                className="absolute left-4 flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/" className="flex items-center space-x-2">
                  <div className="relative">
                    <Image
                      src="/images/lap.png"
                      alt="ATDMS Logo"
                      width={45}
                      height={45}
                      className="hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-800">
                      ATDMS
                    </span>
                    <div className="text-xs text-gray-500 -mt-1">
                      Tourism Management
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Center Navigation - Now truly centered */}
              <motion.nav
                className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {[
                  {
                    id: "home",
                    label: "Dashboard",
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    ),
                  },
                  {
                    id: "features",
                    label: "Features",
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    id: "process",
                    label: "Inspections",
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    ),
                  },
                  {
                    id: "gallery",
                    label: "Gallery",
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                  },
                  {
                    id: "contact",
                    label: "Support",
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                      activeSection === item.id
                        ? "text-white bg-gradient-to-r from-green-500 to-blue-500 shadow-lg"
                        : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                    }`}
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        activeSection === item.id
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </motion.nav>

              {/* Mobile Menu Button - Positioned absolutely to the right */}
              <div className="absolute right-4 lg:hidden">
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="pt-20">
          {/* Hero Section with 3D elements */}
          {/* Hero Section - New Clean Design */}
          <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
            </div>

            <div className="container mx-auto px-4 z-10 relative">
              <div className="flex items-center justify-center">
                <div className="max-w-4xl text-center">
                  {/* Left Content - now centered */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Tourism Management System
                      </motion.div>

                      <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        Welcome To
                        <br />
                        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          ATDMS
                        </span>
                      </motion.h1>

                      <motion.p
                        className="text-xl text-gray-600 max-w-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        Think of a place, We'll manage it for you. A
                        comprehensive accommodation inspection management system
                        that streamlines quality control processes.
                      </motion.p>
                    </div>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <Link href="/login">
                        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          Get Started
                          <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 bg-transparent"
                        onClick={openVideoModal}
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Watch Demo
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
          {/* Features Section with 3D styling */}
          <section id="features" className="py-20 relative bg-white">
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Choose your Adventure
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover powerful features designed to streamline your
                  accommodation inspection process
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full rounded-3xl">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="bg-gradient-to-br from-green-100 to-blue-100 p-4 rounded-2xl mb-6 inline-block">
                          <feature.icon size={32} className="text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm flex-grow mb-6">
                          {feature.description}
                        </p>
                        <Button
                          variant="outline"
                          className="border-green-200 text-green-600 hover:bg-green-50 rounded-full w-full bg-transparent"
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section with 3D styling */}
          <section
            id="process"
            className="py-20 relative bg-gradient-to-br from-blue-50 to-green-50"
          >
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Inspection Process
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  A streamlined three-step process to ensure quality and
                  compliance
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {inspectionSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full rounded-3xl">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="text-green-600 text-2xl font-bold mb-4">
                          0{index + 1}
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-2xl mb-6 inline-block">
                          <step.icon size={32} className="text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm flex-grow mb-6">
                          {step.description}
                        </p>
                        <Button
                          variant="outline"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-full w-full bg-transparent"
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery Section with 3D styling */}
          <section
            id="gallery"
            className="py-20 relative overflow-hidden bg-gradient-to-br from-white to-blue-50"
          >
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Property Gallery
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Explore the beautiful accommodations and tourism destinations
                  managed through our ATDMS platform
                </p>
              </motion.div>

              {/* Gallery Categories with 3D buttons */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {["All", "Resorts", "Hotels", "Beaches", "Restaurants"].map(
                  (category, index) => (
                    <motion.button
                      key={category}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg ${
                        index === 0
                          ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-xl"
                          : "bg-white text-gray-600 border border-gray-300 hover:bg-green-50 hover:border-green-300"
                      }`}
                    >
                      {category}
                    </motion.button>
                  )
                )}
              </motion.div>

              {/* Main Gallery Grid with 3D cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    src: "/images/bay.png",
                    title: "Dingalan Bay",
                    category: "Beaches",
                    description: "Pristine waters and scenic views",
                  },
                  {
                    src: "/images/costa.png",
                    title: "Costa Pacifica",
                    category: "Resorts",
                    description: "Luxury beachfront resort",
                  },
                  {
                    src: "/images/resort.jpg",
                    title: "Aurora Resort",
                    category: "Resorts",
                    description: "Family-friendly accommodation",
                  },
                  {
                    src: "/images/casa.png",
                    title: "Casa Esperanza",
                    category: "Hotels",
                    description: "Boutique hotel experience",
                  },
                  {
                    src: "/images/baler.png",
                    title: "Baler Coastline",
                    category: "Beaches",
                    description: "Famous surfing destination",
                  },
                  {
                    src: "/images/l-sirene-boutique-resort.png",
                    title: "L'Sirene Boutique Resort",
                    category: "Resorts",
                    description: "Elegant boutique accommodation",
                  },
                  {
                    src: "/images/playa-azul-baler.png",
                    title: "Playa Azul Baler",
                    category: "Hotels",
                    description: "Beachfront hotel with modern amenities",
                  },
                  {
                    src: "/images/Riverstone.png",
                    title: "Riverstone Resort",
                    category: "Resorts",
                    description: "Riverside luxury resort",
                  },
                  {
                    src: "/images/m.png",
                    title: "Marina Restaurant",
                    category: "Restaurants",
                    description: "Fine dining with ocean views",
                  },
                  {
                    src: "/images/caption.png",
                    title: "Captain's Lodge",
                    category: "Hotels",
                    description: "Nautical-themed accommodation",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group cursor-pointer"
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full rounded-3xl">
                      <div className="relative overflow-hidden">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="inline-block px-3 py-1 bg-green-500 text-xs rounded-full mb-2">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Featured Properties with 3D styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  Featured Properties
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer"
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-3xl">
                      <div className="relative">
                        <Image
                          src="/images/costa.png"
                          alt="Costa Pacifica Resort"
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-green-500 text-sm rounded-full">
                              5★ Rating
                            </span>
                            <span className="px-3 py-1 bg-blue-500 text-sm rounded-full">
                              Premium Resort
                            </span>
                          </div>
                          <h4 className="text-2xl font-bold mb-2">
                            Costa Pacifica Resort
                          </h4>
                          <p className="text-gray-200">
                            Luxury beachfront resort with world-class amenities
                            and stunning ocean views
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer"
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-3xl">
                      <div className="relative">
                        <Image
                          src="/images/baler.png"
                          alt="Baler Surfing Beach"
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-orange-500 text-sm rounded-full">
                              Surfing Paradise
                            </span>
                            <span className="px-3 py-1 bg-purple-500 text-sm rounded-full">
                              Adventure
                            </span>
                          </div>
                          <h4 className="text-2xl font-bold mb-2">
                            Baler Surfing Beach
                          </h4>
                          <p className="text-gray-200">
                            Famous surfing destination with perfect waves and
                            beautiful coastal scenery
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>

              {/* Gallery Statistics with 3D styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl rounded-3xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Gallery Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {[
                        {
                          number: "150+",
                          label: "Properties Featured",
                          icon: "🏨",
                        },
                        {
                          number: "25+",
                          label: "Beach Destinations",
                          icon: "🏖️",
                        },
                        { number: "50+", label: "Resort Partners", icon: "🌴" },
                        { number: "100+", label: "Dining Venues", icon: "🍽️" },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          className="text-center"
                        >
                          <div className="text-4xl mb-3">{stat.icon}</div>
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {stat.number}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* Contact Section with 3D styling */}
          <section
            id="contact"
            className="py-20 relative bg-gradient-to-br from-blue-50 to-white"
          >
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Contact
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Experiencing technical issues? Our support team is here to
                  help resolve any unexpected errors quickly
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Technical Support
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="text-gray-600">
                          Aurora Provincial Tourism Office, Baler, Aurora
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="text-gray-600">
                          +63 (042) 209-2351 (Emergency Hotline)
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Mail className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="text-gray-600">
                          support@atdms.aurora.gov.ph
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="text-gray-600">
                          24/7 Technical Support Available
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Support Hours
                    </h3>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Critical Issues</span>
                          <span className="text-red-600 font-medium">
                            24/7 Available
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">General Support</span>
                          <span className="text-gray-900 font-medium">
                            8:00 AM - 8:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weekend Support</span>
                          <span className="text-gray-900 font-medium">
                            9:00 AM - 5:00 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Common Error Solutions
                    </h3>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Login Issues
                            </p>
                            <p className="text-sm text-gray-600">
                              Clear browser cache and try again
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Upload Failures
                            </p>
                            <p className="text-sm text-gray-600">
                              Check file size and internet connection
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-gray-900">
                              System Timeout
                            </p>
                            <p className="text-sm text-gray-600">
                              Refresh page and log in again
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-l-4 border-red-500 rounded-3xl">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Report an Issue
                      </h3>
                      <form
                        className="space-y-6"
                        onSubmit={(e) => {
                          e.preventDefault();
                          alert(
                            "Error report submitted successfully! Our technical team will contact you within 2 hours."
                          );
                        }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First Name
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="Your first name"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="Your last name"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Error Type
                          </label>
                          <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                            <option value="">Select error type</option>
                            <option value="login">
                              Login/Authentication Error
                            </option>
                            <option value="upload">File Upload Error</option>
                            <option value="system">System Crash/Timeout</option>
                            <option value="data">Data Loss/Corruption</option>
                            <option value="performance">
                              Performance Issues
                            </option>
                            <option value="other">Other Technical Issue</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Error Description
                          </label>
                          <textarea
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Please describe the error in detail, including what you were doing when it occurred..."
                            required
                          ></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Priority Level
                          </label>
                          <div className="flex space-x-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="priority"
                                value="low"
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-600">Low</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="priority"
                                value="medium"
                                className="mr-2"
                                defaultChecked
                              />
                              <span className="text-sm text-gray-600">
                                Medium
                              </span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="priority"
                                value="high"
                                className="mr-2"
                              />
                              <span className="text-sm text-red-600 font-medium">
                                High
                              </span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="priority"
                                value="critical"
                                className="mr-2"
                              />
                              <span className="text-sm text-red-700 font-bold">
                                Critical
                              </span>
                            </label>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-lg font-medium"
                        >
                          Submit Error Report
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer with 3D styling */}
        <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12 relative border-t border-gray-700">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white">
                  About Central Aurora Tourism Management System
                </h3>
                <p className="text-sm text-gray-300 mb-6">
                  ATDMS is the leading accommodation inspection management
                  system, streamlining quality control processes for hotels,
                  resorts, and vacation rentals worldwide.
                </p>
                <div className="flex space-x-4">
                  <Image
                    src="/images/DOT.png"
                    alt="DOT"
                    width={60}
                    height={60}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                  <Image
                    src="/images/lap.png"
                    alt="AURORA"
                    width={60}
                    height={60}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                  <Image
                    src="/images/bgaurora.png"
                    alt="LOVE PHILIPPINES"
                    width={120}
                    height={60}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#features"
                      className="text-sm hover:text-green-400 transition-colors text-gray-300"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#process"
                      className="text-sm hover:text-green-400 transition-colors text-gray-300"
                    >
                      Our Process
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className="text-sm hover:text-green-400 transition-colors text-gray-300"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-sm hover:text-green-400 transition-colors text-gray-300"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://beta.tourism.gov.ph/accreditations/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-green-400 transition-colors flex items-center gap-1 group text-gray-300"
                    >
                      DOT Accreditation Portal
                      <svg
                        className="w-4 h-4 inline transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Contact Information
                </h3>
                <p className="text-sm text-gray-300">
                  Aurora Provincial Tourism Office
                </p>
                <p className="text-sm text-gray-300">
                  Baler, Aurora, Philippines
                </p>
                <p className="text-sm text-gray-300">
                  Phone: +63 (042) 209-2351
                </p>
                <p className="text-sm text-gray-300">
                  Email: auroratourismdev@outlook.com
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} ATDMS All rights reserved.
                Develop by クリスチャン ジョセフ マリグメン.
              </p>
            </div>
          </div>
        </footer>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeVideoModal();
              }
            }}
          >
            <motion.div
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="aspect-video">
                <video
                  src="/videos/demo.mp4"
                  controls
                  className="w-full h-full rounded-2xl"
                  title="Demo Video"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
}
