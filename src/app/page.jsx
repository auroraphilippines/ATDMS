"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TourProvider, useTour } from "@reactour/tour";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Hotel,
  ClipboardCheck,
  ShieldCheck,
  TrendingUp,
  Users,
  Bell,
  Award,
  ClipboardList,
  Search,
  CheckCircle,
  BarChart2,
  FileText,
  Building,
  Zap,
} from "lucide-react";

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

const steps = [
  {
    selector: ".hero-section",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold mb-2">Welcome to CATMS!</h3>
        <p>
          Let's take a quick tour of our features and discover how we can help
          you streamline your accommodation inspections.
        </p>
      </motion.div>
    ),
  },
  {
    selector: "#features",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold mb-2">Powerful Features</h3>
        <p>
          Discover our key features that make accommodation inspection easier
          and more efficient. From digital checklists to real-time reporting,
          we've got you covered.
        </p>
      </motion.div>
    ),
  },
  {
    selector: "#process",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold mb-2">Streamlined Process</h3>
        <p>
          Learn about our streamlined inspection process in three simple steps.
          We've designed it to save you time and ensure thorough evaluations.
        </p>
      </motion.div>
    ),
  },
  {
    selector: "#faq",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold mb-2">Got Questions?</h3>
        <p>
          Find answers to common questions about our system. We're here to help
          you understand how CATMS can benefit your business.
        </p>
      </motion.div>
    ),
  },
  {
    selector: ".cta-buttons",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
        <p>
          Sign up now or watch our demo to see CATMS in action. We can't wait to
          help you transform your inspection process!
        </p>
      </motion.div>
    ),
  },
];

function TourContent() {
  const { setIsOpen } = useTour();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("hasVisited", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [setIsOpen]);

  return null;
}

function StartupScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src="/images/lap.png"
              alt="CATMS Logo"
              width={200}
              height={200}
              className="mb-8 animate-pulse"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-amber-400 to-indigo-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CATMS() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = {
        home: document.querySelector(".hero-section"),
        features: document.querySelector("#features"),
        process: document.querySelector("#process"),
        faq: document.querySelector("#faq"),
      };

      const scrollPosition = window.scrollY + 100; // Offset for better trigger point

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
  }, []);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const toggleFAQ = (index) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(index);
    }
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
      icon: Users,
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

  const faqItems = [
    {
      question: "How does the system improve inspection efficiency?",
      answer:
        "Our system digitizes the entire inspection process, from scheduling to reporting. This reduces paperwork, eliminates manual data entry, and allows for real-time collaboration, significantly speeding up inspections while improving accuracy and consistency across all rooms and facilities.",
    },
    {
      question:
        "Can the system be customized for different types of accommodations?",
      answer:
        "Yes, our system is highly flexible and can be tailored to various accommodation types, including hotels, resorts, vacation rentals. Customizable checklists and evaluation criteria ensure that inspections are relevant to your specific property type and brand standards.",
    },
    {
      question: "How does the system ensure data security and guest privacy?",
      answer:
        "We adhere strictly to the Philippine Data Protection Law to safeguard all information. Our system employs robust encryption and security measures to protect data. Access to sensitive information is tightly controlled based on user roles, and we ensure that all data handling practices comply with the requirements set forth by the Philippine data protection regulations.",
    },
    {
      question: "How does the system help in maintaining brand standards?",
      answer:
        "The system includes customizable checklists that reflect your brand standards. It provides detailed reports and actionable insights after each inspection, allowing you to track compliance with brand requirements. The system also offers trend analysis to help identify recurring issues that may affect brand consistency.",
    },
    {
      question: "What kind of support and training do you offer?",
      answer:
        "We provide comprehensive onboarding and training for Tourism Officers, Hotel Staff, and Municipalities Inspectors. Our support team is available on a scheduled basis within Monday, Wednesday, Thursday, and Friday to assist with any questions or issues. We also offer regular webinars and updates on best practices in accommodation inspection and quality management.",
    },
    {
      question:
        "What legal mandates govern tourism data submission in Aurora Province?",
      answer:
        "Under Provincial Ordinance No. 473 and Republic Act No. 9593 (Tourism Act of 2009), all accommodation establishments in Aurora Province including Hotels, Resorts, Apartelles, Pension Houses, Tourist Inns, Transient Houses, and similar establishments are required to submit their tourism statistical data to the Provincial Tourism Office for proper implementation and monitoring.",
    },
    {
      question:
        "How does CATMS address the unique needs of Central Aurora's tourism industry?",
      answer: (
        <div className="space-y-4 text-justify">
          <p>
            CATMS is specifically designed to meet the unique requirements of
            Central Aurora's diverse tourism landscape. It incorporates both DOT
            (Department of Tourism) Standard Regulations and Local Standard
            Regulations:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <span className="font-semibold">DOT Compliance:</span> The system
              ensures all accommodations adhere to the latest DOT standards,
              including the National Accommodation Standards for Hotels,
              Resorts, and Apartment Hotels. It covers crucial areas such as
              guest rooms, public areas, food and beverage outlets, kitchen and
              food production areas, and guest services.
            </li>
            <li>
              <span className="font-semibold">Local Regulations:</span> CATMS
              integrates Central Aurora's specific local ordinances and
              regulations, such as environmental protection measures for coastal
              properties and cultural preservation guidelines for heritage
              sites.
            </li>
            <li>
              <span className="font-semibold">Customized Checklists:</span> The
              system offers tailored inspection checklists for various
              accommodation types found in Central Aurora, from beach resorts to
              mountain lodges, ensuring relevant criteria for each property
              type.
            </li>
            <li>
              <span className="font-semibold">Seasonal Adaptability:</span> The
              system accounts for Central Aurora's seasonal tourism patterns,
              allowing for adjusted inspection schedules and criteria during
              peak and off-peak seasons.
            </li>
            <li>
              <span className="font-semibold">Local Collaboration:</span> CATMS
              facilitates seamless cooperation between local government units,
              property owners, and the Provincial Tourism Office, ensuring a
              unified approach to maintaining and improving accommodation
              standards across Central Aurora.
            </li>
            <li>
              <span className="font-semibold">
                Sustainable Tourism Practices:
              </span>{" "}
              In line with both DOT and local initiatives, the system
              incorporates sustainability metrics, helping properties in Central
              Aurora to implement and track eco-friendly practices.
            </li>
          </ol>
          <p>
            By addressing these specific needs, CATMS not only ensures
            regulatory compliance but also contributes to the overall
            improvement of Central Aurora's tourism industry, enhancing guest
            experiences and supporting the region's reputation as a top-tier
            destination.
          </p>
        </div>
      ),
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(
      sectionId === "home" ? ".hero-section" : `#${sectionId}`
    );
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <TourProvider
      steps={steps}
      styles={{
        popover: (base) => ({
          ...base,
          "--reactour-accent": "#6c5ce7",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }),
        dot: (base, { current }) => ({
          ...base,
          background: current ? "#6c5ce7" : "#ccc",
          width: current ? 12 : 8,
          height: current ? 12 : 8,
          transition: "all 0.3s ease",
        }),
        button: (base) => ({
          ...base,
          padding: "8px 16px",
          borderRadius: 6,
          transition: "all 0.3s ease",
        }),
        close: (base) => ({
          ...base,
          display: "none",
        }),
      }}
      showNavigation={true}
      showBadge={false}
      showDots={true}
      showNavigationNumber={true}
      disableInteraction={false}
      disableDotsNavigation={false}
      disableKeyboardNavigation={false}
      inViewThreshold={100}
      maskClassName="bg-black/50"
      className="helper"
      accentColor="#6c5ce7"
      position="bottom"
      padding={10}
      maskSpace={10}
      arrowColor="#fff"
    >
      <StartupScreen />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2d3436] via-[#6c5ce7] to-[#00b894] relative overflow-hidden">
        {/* Enhanced plasma background effect */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(108, 92, 231, 0.2) 0%, 
              rgba(0, 184, 148, 0.1) 50%, 
              transparent 100%)`,
            transition: "background 0.1s ease-out",
          }}
        />

        <motion.header
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-[#2d3436]/90 backdrop-blur-xl border-b border-white/10"
              : "bg-transparent"
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/lap.png"
                    alt="CATMS Logo"
                    width={50}
                    height={50}
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </motion.div>
              <motion.nav
                className="hidden md:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ul className="flex space-x-8 items-center">
                  {["home", "features", "process", "faq"].map((section) => (
                    <li key={section} className="relative">
                      <button
                        onClick={() => scrollToSection(section)}
                        className={`
                          px-4 
                          py-2 
                          text-white 
                          transition-all
                          duration-300 
                          relative 
                          text-sm
                          font-medium
                          uppercase
                          tracking-wider
                          ${
                            !isScrolled && section === "home"
                              ? "hover:text-black"
                              : "hover:text-[#4299e1]"
                          }
                          ${
                            activeSection === section
                              ? !isScrolled && section === "home"
                                ? "text-black"
                                : "text-[#4299e1]"
                              : ""
                          }
                        `}
                      >
                        <span className="relative z-10">
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </span>
                        {activeSection === section && (
                          <motion.div
                            layoutId="activeSection"
                            className={`
                              absolute 
                              inset-0 
                              rounded-full
                              -z-10
                              ${
                                !isScrolled && section === "home"
                                  ? "bg-gradient-to-r from-white/30 to-white/10"
                                  : "bg-gradient-to-r from-[#4299e1]/20 to-[#63b3ed]/10"
                              }
                            `}
                            initial={false}
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        {/* Active indicator dot */}
                        {activeSection === section && (
                          <motion.div
                            layoutId="activeDot"
                            className={`
                              absolute 
                              -bottom-2 
                              left-1/2 
                              w-1 
                              h-1 
                              rounded-full 
                              transform 
                              -translate-x-1/2
                              ${
                                !isScrolled && section === "home"
                                  ? "bg-black"
                                  : "bg-[#4299e1]"
                              }
                            `}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        {/* Hover effect */}
                        <motion.div
                          className={`
                            absolute 
                            bottom-0 
                            left-0 
                            h-[2px] 
                            w-full 
                            origin-left
                            ${
                              !isScrolled && section === "home"
                                ? "bg-black"
                                : "bg-[#4299e1]"
                            }
                          `}
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </div>
          </div>
        </motion.header>

        <main className="pt-20">
          <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2d3436]/90 to-[#6c5ce7]/90 backdrop-blur-sm z-0" />
            <div className="absolute inset-0 z-0">
              <motion.div
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {images.map((src, index) => (
                  <motion.div
                    key={src}
                    className="absolute inset-0"
                    initial={{
                      opacity: 0,
                      scale: 1.1,
                      filter: "blur(20px)",
                    }}
                    animate={{
                      opacity: index === currentImageIndex ? 1 : 0,
                      scale: index === currentImageIndex ? 1 : 1.1,
                      filter:
                        index === currentImageIndex
                          ? "blur(0px)"
                          : "blur(20px)",
                    }}
                    transition={{
                      duration: 1.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <motion.div
                  className="md:w-1/2 mb-8 md:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                    Central Aurora Tourism Management System
                  </h1>
                  <p className="text-xl text-white/90 mb-8 drop-shadow-md">
                    CATMS: Your all-in-one solution for efficient, transparent,
                    and standardized accommodation inspections.
                  </p>
                  <div className="cta-buttons flex flex-col sm:flex-row gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        variant="secondary"
                        className="bg-[#ffd700] text-[#0056b3] hover:bg-[#ffc107] shadow-lg"
                        onClick={openVideoModal}
                      >
                        Watch Demo
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href="/login">
                        <Button
                          size="lg"
                          variant="secondary"
                          className="bg-[#ffd700] text-[#0056b3] hover:bg-[#ffc107] shadow-lg"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div
                  className="md:w-1/2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-2xl">
                    {images.map((src, index) => (
                      <motion.div
                        key={src}
                        className="absolute inset-0"
                        initial={{
                          opacity: 0,
                          scale: 1.1,
                          filter: "blur(10px)",
                        }}
                        animate={{
                          opacity: index === currentImageIndex ? 1 : 0,
                          scale: index === currentImageIndex ? 1 : 1.1,
                          filter:
                            index === currentImageIndex
                              ? "blur(0px)"
                              : "blur(10px)",
                        }}
                        transition={{
                          duration: 1,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      >
                        <Image
                          src={src}
                          alt={`Slide ${index + 1}`}
                          fill
                          className="object-cover rounded-xl"
                          priority={index === 0}
                        />
                      </motion.div>
                    ))}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="features" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00b894]/10 to-[#6c5ce7]/10 backdrop-blur-xl" />
            <div className="container mx-auto px-4 relative z-10">
              <motion.h2
                className="text-6xl font-black text-center mb-12 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="relative z-10">Why Choose CATMS?</span>
                <span className="absolute -z-10 inset-0 bg-gradient-to-r from-[#00b894]/20 to-[#6c5ce7]/20 blur-2xl"></span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="bg-white/20 backdrop-blur-xl border border-white/30 hover:border-[#00b894]/50 transition-all duration-300 group">
                      <CardContent className="p-6">
                        <feature.icon
                          size={40}
                          className="text-[#00b894] mb-4 drop-shadow-lg group-hover:text-[#6c5ce7] transition-colors duration-300"
                        />
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#00b894] transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-white/90">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="process" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6c5ce7]/10 to-[#2d3436]/10 backdrop-blur-xl" />
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-6xl font-black text-center mb-12 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] relative">
                <span className="relative z-10">
                  Streamlined Inspection Process
                </span>
                <span className="absolute -z-10 inset-0 bg-gradient-to-r from-[#6c5ce7]/20 to-[#2d3436]/20 blur-2xl"></span>
              </h2>
              <Tabs defaultValue="pre-inspection" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  {inspectionSteps.map((step, index) => (
                    <TabsTrigger
                      key={index}
                      value={step.title.toLowerCase().replace(" ", "-")}
                      className="text-indigo-600 data-[state=active]:bg-indigo-100"
                    >
                      {step.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {inspectionSteps.map((step, index) => (
                  <TabsContent
                    key={index}
                    value={step.title.toLowerCase().replace(" ", "-")}
                  >
                    <Card className="border-teal-200">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <step.icon size={24} className="text-teal-600 mr-4" />
                          <h3 className="text-2xl font-bold text-teal-800">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <div className="aspect-video bg-teal-50 rounded-lg overflow-hidden">
                          {step.videoUrl ? (
                            <video
                              src={step.videoUrl}
                              controls
                              className="w-full h-full object-cover"
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <p className="flex items-center justify-center h-full text-teal-500">
                              Video coming soon
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00b894]/10 to-[#2d3436]/10 backdrop-blur-xl" />
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-6xl font-black text-center mb-12 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] relative">
                <span className="relative z-10">
                  Empowering Your Accommodation Business
                </span>
                <span className="absolute -z-10 inset-0 bg-gradient-to-r from-[#00b894]/20 to-[#2d3436]/20 blur-2xl"></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <FileText
                      size={48}
                      className="text-teal-600 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-teal-800">
                      For Inspectors
                    </h3>
                    <p className="text-gray-600">
                      Streamline your workflow, access real-time data, and
                      conduct more efficient room-by-room inspections.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Building
                      size={48}
                      className="text-teal-600 mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-teal-800">
                      For Property Managers
                    </h3>
                    <p className="text-gray-600">
                      Maintain high standards, track performance, and improve
                      guest satisfaction with data-driven insights.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Zap size={48} className="text-teal-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-teal-800">
                      Administrator of Provincial Tourism Office
                    </h3>
                    <p className="text-gray-600">
                      Gain comprehensive insights, ensure brand consistency, and
                      drive continuous improvement across your properties using
                      our web-based system.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section id="faq" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6c5ce7]/10 to-[#00b894]/10 backdrop-blur-xl" />
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-6xl font-black text-center mb-12 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] relative">
                <span className="relative z-10">
                  Frequently Asked Questions
                </span>
                <span className="absolute -z-10 inset-0 bg-gradient-to-r from-[#6c5ce7]/20 to-[#00b894]/20 blur-2xl"></span>
              </h2>
              <div className="space-y-4 w-full max-w-3xl mx-auto">
                {faqItems.map((item, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 hover:border-[#00b894]/50 transition-all duration-300"
                  >
                    <CardContent className="p-0">
                      <button
                        className="flex justify-between items-center w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#00b894]/50 hover:bg-white/10 transition-colors duration-300"
                        onClick={() => toggleFAQ(index)}
                      >
                        <span className="text-lg font-semibold text-white group-hover:text-[#00b894]">
                          {item.question}
                        </span>
                        {expandedFAQ === index ? (
                          <ChevronUp className="h-5 w-5 text-[#00b894]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[#00b894]" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFAQ === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-4 pb-4"
                          >
                            <div className="text-white/90">{item.answer}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[#2d3436]/90 backdrop-blur-xl text-white py-12 relative border-t border-white/10">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4">
                  About Central Aurora Tourism Management System
                </h3>
                <p className="text-sm text-gray-300">
                  CATMS is the leading accommodation inspection management
                  system, streamlining quality control processes for hotels,
                  resorts, and vacation rentals worldwide.
                </p>
                <div className="flex space-x-4 mt-4">
                  <Image
                    src="/images/DOT.png"
                    alt="DOT"
                    width={80}
                    height={80}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                  <Image
                    src="/images/lap.png"
                    alt="AURORA"
                    width={80}
                    height={80}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                  <Image
                    src="/images/love philippines.png"
                    alt="LOVE PHIL  IPPINES"
                    width={200}
                    height={200}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#features" className="text-sm hover:underline">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#process" className="text-sm hover:underline">
                      Our Process
                    </Link>
                  </li>
                  <li>
                    <Link href="#faq" className="text-sm hover:underline">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-sm hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://beta.tourism.gov.ph/accreditations/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline flex items-center gap-1 group"
                    >
                      DOT Accreditation Portal
                      <svg
                        className="w-4 h-4 inline transition-transform group-hover:translate-x-0.5"
                        fill="true"
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
                <h3 className="text-lg font-semibold mb-4">
                  Contact Information
                </h3>
                <p className="text-sm">123 Hospitality Avenue, Global City</p>
                <p className="text-sm">Phone: (123) 456-7890</p>
                <p className="text-sm">Email: auroratourismdev@outlook.com</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} CATMS All rights reserved.
                Develop by クリスチャン ジョセフ マリグメン.
              </p>
            </div>
          </div>
        </footer>

        {isVideoModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
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
              className="relative w-full max-w-4xl bg-white/20 backdrop-blur-xl rounded-lg shadow-lg border border-white/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="aspect-video">
                <video
                  src="/videos/demo.mp4"
                  controls
                  className="w-full h-full rounded-lg"
                  title="Demo Video"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
      <TourContent />
    </TourProvider>
  );
}