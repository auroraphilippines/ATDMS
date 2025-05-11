"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  ExternalLink,
  Clock,
  AlertCircle,
  Construction,
} from "lucide-react";

// Startup screen component - using the same design from the original CATMS
function StartupScreen({ onComplete }) {
  const [loadingText, setLoadingText] = useState("System status check...");
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Text animation sequence
    const textSequence = [
      { text: "System status check...", time: 0 },
      { text: "Checking availability...", time: 1000 },
      { text: "System currently offline...", time: 2000 },
      { text: "Preparing status report...", time: 3000 },
    ];

    textSequence.forEach((item) => {
      setTimeout(() => {
        setLoadingText(item.text);
      }, item.time);
    });

    // Progress animation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
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
        <p className="text-white mb-4 text-center">{loadingText}</p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-amber-400 to-indigo-400 rounded-full"
          style={{ width: `${loadingProgress}%`, maxWidth: "200px" }}
        />
      </motion.div>
    </motion.div>
  );
}

// Pre-defined particle positions to avoid hydration errors
const particlePositions = [
  { width: 2, height: 3, left: "10%", top: "15%" },
  { width: 3, height: 2, left: "20%", top: "25%" },
  { width: 2, height: 2, left: "30%", top: "35%" },
  { width: 2, height: 3, left: "40%", top: "45%" },
  { width: 3, height: 2, left: "50%", top: "55%" },
  { width: 2, height: 4, left: "60%", top: "65%" },
  { width: 2, height: 3, left: "70%", top: "75%" },
  { width: 4, height: 2, left: "80%", top: "85%" },
  { width: 3, height: 3, left: "90%", top: "95%" },
  { width: 2, height: 2, left: "15%", top: "10%" },
  { width: 3, height: 4, left: "25%", top: "20%" },
  { width: 2, height: 3, left: "35%", top: "30%" },
  { width: 4, height: 2, left: "45%", top: "40%" },
  { width: 3, height: 2, left: "55%", top: "50%" },
  { width: 2, height: 3, left: "65%", top: "60%" },
  { width: 2, height: 2, left: "75%", top: "70%" },
  { width: 3, height: 3, left: "85%", top: "80%" },
  { width: 2, height: 4, left: "95%", top: "90%" },
  { width: 3, height: 2, left: "5%", top: "5%" },
  { width: 2, height: 3, left: "95%", top: "5%" },
];

export default function NotFound() {
  const [startupComplete, setStartupComplete] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [animatedParticles, setAnimatedParticles] = useState([]);

  // Use useEffect to add animation properties after initial render
  useEffect(() => {
    if (startupComplete) {
      const particles = particlePositions.map((particle, index) => ({
        ...particle,
        id: index,
        delay: index * 0.1,
        duration: 2 + (index % 3),
      }));
      setAnimatedParticles(particles);
    }
  }, [startupComplete]);

  // Fixed reference ID for consistent rendering
  const referenceId = "CATMS-47981-2025";

  return (
    <>
      <AnimatePresence>
        {!startupComplete && (
          <StartupScreen onComplete={() => setStartupComplete(true)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col bg-[#2D2A59] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[#2B2155] z-0" />

        {/* Geometric elements - similar to original CATMS */}
        <div className="absolute inset-0 z-1">
          <div className="absolute top-0 right-0 w-2/3 h-full">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full"
              preserveAspectRatio="xMinYMin slice"
            >
              <path
                d="M500,0 L800,0 L800,500 L500,200 Z"
                fill="#B65B9C"
                opacity="0.6"
              />
              <path
                d="M400,600 L800,600 L600,200 L200,500 Z"
                fill="#A85B9C"
                opacity="0.7"
              />
              <path
                d="M700,300 L800,100 L800,400 Z"
                fill="#C75B9C"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* Small geometric accents */}
          <div className="absolute top-20 left-20 w-4 h-4 rounded-full bg-white opacity-20"></div>
          <div className="absolute top-40 left-40 w-2 h-2 rounded-full bg-white opacity-15"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-white opacity-10"></div>
        </div>

        {/* Animated particles in background - with fixed positions to avoid hydration errors */}
        <div className="absolute inset-0 z-0 opacity-30">
          {animatedParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{
                width: particle.width,
                height: particle.height,
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <main className="flex-grow flex items-center justify-center p-4 z-10 relative">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                className="mb-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Image
                  src="/images/lap.png"
                  alt="CATMS Logo"
                  width={120}
                  height={120}
                  className="mx-auto"
                />
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-black text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                System Temporarily Unavailable
              </motion.h1>

              <motion.div
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-6">
                      <AlertCircle className="text-[#FF7A59] w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                      <div className="text-white text-lg text-left">
                        <p className="mb-4">
                          The Central Aurora Tourism Management System is
                          currently unavailable. This decision was made by the
                          Developers and the staff of Aurora Tourism.
                        </p>
                        <p className="text-white/80">
                          We're working on a new and improved system that will
                          be launched in the future. Thank you for your patience
                          and understanding.
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                    >
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <Clock className="w-8 h-8 text-[#FF7A59] mx-auto mb-2" />
                        <p className="text-white/70 text-sm">Status Update</p>
                        <p className="text-white">May 11, 2025</p>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <Construction className="w-8 h-8 text-[#FF7A59] mx-auto mb-2" />
                        <p className="text-white/70 text-sm">Current Status</p>
                        <p className="text-white">Under Development</p>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <AlertCircle className="w-8 h-8 text-[#FF7A59] mx-auto mb-2" />
                        <p className="text-white/70 text-sm">Reference ID</p>
                        <p className="text-white">{referenceId}</p>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>

                <motion.div
                  className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                >
                  <Button
                    className="bg-gradient-to-r from-[#FF7A59] to-[#E55A3A] text-white hover:opacity-90"
                    onClick={() => setShowNotice(!showNotice)}
                  >
                    {showNotice ? "Hide" : "View"} Official Notice
                  </Button>

                  <Link href="https://www.aurora.ph/" passHref>
                    <Button
                      variant="outline"
                      className="border-white/20 text-black hover:bg-white/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Tourism Portal
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Official Notice */}
            <AnimatePresence>
              {showNotice && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 mb-12"
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader className="border-b border-white/10">
                      <CardTitle className="flex items-center text-white">
                        <FileText className="w-5 h-5 text-[#FF7A59] mr-2" />
                        Official System Status Notice
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            System Information
                          </h3>
                          <p className="text-white/70 text-sm mb-1">
                            System: CATMS (Central Aurora Tourism Management
                            System)
                          </p>
                          <p className="text-white/70 text-sm mb-1">
                            Status: Temporarily Offline
                          </p>
                          <p className="text-white/70 text-sm">
                            Last Update: May 11, 2025
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Administrator
                          </h3>
                          <p className="text-white/70 text-sm mb-1">
                            Aurora Provincial Tourism Office
                          </p>
                          <p className="text-white/70 text-sm mb-1">
                            Email: auroratourismdev@outlook.com
                          </p>
                          <p className="text-white/70 text-sm">
                            Reference: SYS-UPDATE-5678
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-6 mb-6">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          System Status Details
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-white/5 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">
                              Current Status
                            </h4>
                            <p className="text-white/70 text-sm">
                              After careful consideration, the Developers and
                              staff of Aurora Tourism have decided to
                              temporarily take the Central Aurora Tourism
                              Management System offline. We are working on a new
                              and improved version that will better serve the
                              needs of our users and the tourism industry in
                              Aurora Province.
                            </p>
                          </div>
                          <div className="bg-white/5 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">
                              Data Handling
                            </h4>
                            <p className="text-white/70 text-sm">
                              All user data has been securely preserved in
                              accordance with our privacy policy and data
                              protection regulations. Your information will be
                              migrated to the new system when it becomes
                              available.
                            </p>
                          </div>
                          <div className="bg-white/5 p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">
                              Future Plans
                            </h4>
                            <p className="text-white/70 text-sm">
                              We are developing a new system with enhanced
                              features and improved user experience. We
                              anticipate launching the new platform in the
                              coming months. Updates will be provided via email
                              to registered users.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-6">
                        <div className="flex justify-between items-center">
                          <div className="text-white/70 text-sm">
                            <p>Document generated automatically</p>
                            <p className="text-xs mt-1">
                              For the latest updates, please contact the Aurora
                              Tourism Office.
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Image
                              src="/images/lap.png"
                              alt="Official Seal"
                              width={100}
                              height={50}
                              className="opacity-50"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Coming Soon Section */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Coming Soon
              </h2>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-0.5 bg-[#FF7A59] mr-4"></div>
                  <h3 className="text-xl font-bold text-white">
                    New System Under Development
                  </h3>
                  <div className="w-16 h-0.5 bg-[#FF7A59] ml-4"></div>
                </div>
                <p className="text-white/70 mb-6">
                  We're working on a new and improved tourism management system
                  that will provide enhanced features, better performance, and
                  an improved user experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-lg text-center">
                    <div className="bg-[#2D2A59] p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-6 h-6 text-[#FF7A59]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-white font-medium mb-1">
                      Enhanced Features
                    </h4>
                    <p className="text-white/70 text-sm">
                      New tools and capabilities to better serve tourism needs
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg text-center">
                    <div className="bg-[#2D2A59] p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-6 h-6 text-[#FF7A59]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-white font-medium mb-1">
                      Improved Performance
                    </h4>
                    <p className="text-white/70 text-sm">
                      Faster, more reliable system with better uptime
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg text-center">
                    <div className="bg-[#2D2A59] p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-6 h-6 text-[#FF7A59]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-white font-medium mb-1">
                      User-Focused Design
                    </h4>
                    <p className="text-white/70 text-sm">
                      Redesigned interface for better user experience
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer - Removed Privacy Policy, Terms of Service, and Contact links */}
        <footer className="bg-[#241F4B]/50 backdrop-blur-sm text-white py-6 relative border-t border-white/10 z-10">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-sm text-white/50">
                &copy; 2025 CATMS - Aurora Provincial Tourism Office
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
