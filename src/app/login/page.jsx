"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  LockIcon,
  MailIcon,
  UserIcon,
  Loader2,
  Eye,
  EyeOff,
  Facebook,
  Twitter,
  Linkedin,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createUser, getCurrentUser, signIn } from "@/services/appwrite";
import { useAuthUserStore } from "@/services/user";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { setAuthUser } = useAuthUserStore() || {};

  const toggleForm = () => {
    setIsAnimating(true);
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }, 10);
  };

  const goToHome = () => {
    router.push("/");
  };

  const handleRoleRedirect = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        console.error("No user found");
        toast.error("Authentication error. Please try logging in again.");
        router.push("/login");
        return;
      }

      if (!currentUser.role) {
        console.error("No role assigned");
        toast.error(
          "Your account has not been assigned a role. Please contact support."
        );
        router.push("/support");
        return;
      }

      setAuthUser(currentUser);
      const role = currentUser.role;
      const municipality = currentUser.municipality;

      switch (role) {
        case "admin":
          toast.success(`Welcome back, ${currentUser.name}!`);
          router.push("/admin");
          break;
        case "inspector":
          toast.success(`Welcome back, ${currentUser.name}!`);
          switch (municipality) {
            case "Baler":
              router.push("/inspector/baler");
              break;
            case "San Luis":
              router.push("/inspector/sanluis");
              break;
            case "Maria Aurora":
              router.push("/inspector/maria");
              break;
            case "Dipaculao":
              router.push("/inspector/dipaculao");
              break;
            default:
              toast.error("Municipality not assigned");
              router.push("/login");
          }
          break;
        case "user":
          toast.success(`Welcome back, ${currentUser.name}!`);
          router.push("/client");
          break;
        default:
          toast.error("Invalid role assigned");
          router.push("/login");
          break;
      }
    } catch (error) {
      console.error("Role redirect error:", error);
      toast.error("Failed to determine user role. Please try again.");
      router.push("/login");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await signIn(email, password);
      setAuthUser(user);

      // Set secure cookies
      document.cookie = `sessionId=${user.$id}; path=/; HttpOnly; Secure; SameSite=Strict`;
      document.cookie = `userRole=${user.role}; path=/; HttpOnly; Secure; SameSite=Strict`;

      // Use sessionStorage for non-sensitive data
      sessionStorage.setItem("userRole", user.role);
      if (user.municipality) {
        sessionStorage.setItem("userMunicipality", user.municipality);
      }

      await handleRoleRedirect();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    try {
      await createUser(email, password, fullName);
      toast.success("Account created successfully! Please log in.");
      setIsSignUp(false);
    } catch (error) {
      toast.error(error.message || "Signup failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap");

        :root {
          --primary-bg: #2d2a59;
          --secondary-bg: #332e70;
          --dark-bg: #241f4b;
          --accent: #ff7a59;
          --accent-hover: #e55a3a;
          --white: #ffffff;
          --white-70: rgba(255, 255, 255, 0.7);
          --white-10: rgba(255, 255, 255, 0.1);
          --transition: 1.25s;
          --card-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          user-select: none;
        }

        body {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          background: var(--primary-bg);
          background: linear-gradient(135deg, #2b2155 0%, #493f8d 100%);
          color: var(--white-70);
          padding: 0;
          margin: 0;
          perspective: 1200px;
        }

        .main {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          overflow: hidden;
          perspective: 1200px;
        }

        /* 3D geometric elements */
        .geometric-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .triangle {
          position: absolute;
          background: #b65b9c;
          opacity: 0.6;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          transform-style: preserve-3d;
          transition: transform 1s ease;
        }

        .triangle-1 {
          top: -10%;
          right: 0;
          width: 30vw;
          height: 30vw;
          transform: translateZ(-50px) rotateZ(45deg);
        }

        .triangle-2 {
          bottom: -20%;
          left: 10%;
          width: 25vw;
          height: 25vw;
          background: #a85b9c;
          opacity: 0.7;
          transform: translateZ(-30px) rotateZ(65deg);
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          background: var(--white);
          opacity: 0.05;
          transform-style: preserve-3d;
        }

        .circle-1 {
          top: 20%;
          left: 20%;
          width: 1rem;
          height: 1rem;
          transform: translateZ(10px);
        }

        .circle-2 {
          top: 40%;
          left: 40%;
          width: 0.5rem;
          height: 0.5rem;
          transform: translateZ(20px);
        }

        .circle-3 {
          bottom: 30%;
          left: 30%;
          width: 0.75rem;
          height: 0.75rem;
          transform: translateZ(15px);
        }

        .form-logo {
          margin-bottom: 20px;
          padding: 10px;
          border-radius: 50%;
          background: var(--white);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
          transform-style: preserve-3d;
        }

        .form-logo:hover {
          transform: scale(1.05) translateZ(20px);
        }

        .main-logo {
          border-radius: 50%;
          object-fit: contain;
        }

        .switch-logo {
          border-radius: 50%;
          object-fit: contain;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 50%;
          height: 100%;
          padding: 25px;
          background-color: var(--white);
          transition: var(--transition);
          transform-style: preserve-3d;
          box-shadow: var(--card-shadow);
          z-index: 10;
        }

        .form {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;
          max-width: 400px;
          transform-style: preserve-3d;
        }

        .form__icon {
          margin: 0 5px;
          opacity: 0.5;
          transition: 0.15s;
          color: var(--accent);
          transform-style: preserve-3d;
        }

        .form__icon:hover {
          opacity: 1;
          transition: 0.15s;
          cursor: pointer;
          transform: translateZ(15px);
        }

        .form__icons {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
          transform-style: preserve-3d;
        }

        .input-container {
          position: relative;
          width: 100%;
          margin: 8px 0;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .input-container:hover {
          transform: translateZ(10px);
        }

        .input-icon {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--white-70);
        }

        .password-toggle {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--white-70);
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: var(--accent);
        }

        .form__input {
          width: 100%;
          height: 40px;
          margin: 0;
          padding-left: 40px;
          font-size: 13px;
          letter-spacing: 0.15px;
          border: 1px solid var(--white-10);
          outline: none;
          font-family: "Montserrat", sans-serif;
          background-color: var(--secondary-bg);
          color: var(--white);
          transition: 0.25s ease;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }

        .form__input::placeholder {
          color: var(--white-70);
        }

        .form__input:focus {
          border-color: var(--accent);
          box-shadow: 0 3px 8px rgba(255, 122, 89, 0.2);
        }

        .form__span {
          margin: 30px 0 12px;
          color: var(--white-70);
          transform-style: preserve-3d;
        }

        .form__link {
          color: var(--white-70);
          font-size: 15px;
          margin-top: 25px;
          border-bottom: 1px solid var(--white-70);
          line-height: 2;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form__link:hover {
          color: var(--accent);
          border-bottom-color: var(--accent);
          transform: translateZ(5px);
        }

        .title {
          font-size: 34px;
          font-weight: 700;
          line-height: 3;
          color: var(--white);
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .form:hover .title {
          transform: translateZ(20px);
        }

        .description {
          font-size: 14px;
          letter-spacing: 0.25px;
          text-align: center;
          line-height: 1.6;
          transform-style: preserve-3d;
        }

        .button {
          width: 180px;
          height: 50px;
          border-radius: 25px;
          margin-top: 50px;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 1.15px;
          background-color: var(--accent);
          color: var(--white);
          border: none;
          outline: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(255, 122, 89, 0.4);
          transform-style: preserve-3d;
        }

        .button:hover {
          background-color: var(--accent-hover);
          transform: translateY(-2px) translateZ(15px);
          box-shadow: 0 8px 20px rgba(229, 90, 58, 0.5);
        }

        .button:disabled {
          background-color: rgba(255, 122, 89, 0.5);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .a-container {
          z-index: 100;
          left: 50%;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          background-color: var(--secondary-bg);
        }

        .b-container {
          left: 50%;
          z-index: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          background-color: var(--secondary-bg);
        }

        .switch {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 50%;
          padding: 50px;
          z-index: 200;
          transition: var(--transition);
          background: linear-gradient(
            to right bottom,
            var(--primary-bg),
            var(--dark-bg)
          );
          overflow: hidden;
          transform-style: preserve-3d;
          box-shadow: var(--card-shadow);
        }

        .decorative-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          transform-style: preserve-3d;
          transition: transform 1.5s ease-in-out;
        }

        .decorative-circle-1 {
          width: 300px;
          height: 300px;
          top: -10%;
          left: -10%;
          transform: translateZ(-50px);
        }

        .decorative-circle-2 {
          width: 200px;
          height: 200px;
          bottom: 20%;
          right: -5%;
          transform: translateZ(30px);
        }

        .decorative-circle-3 {
          width: 150px;
          height: 150px;
          bottom: -10%;
          left: 30%;
          transform: translateZ(-20px);
        }

        .switch:hover .decorative-circle-1 {
          transform: translateZ(-30px) rotate(15deg);
        }

        .switch:hover .decorative-circle-2 {
          transform: translateZ(50px) rotate(-10deg);
        }

        .switch:hover .decorative-circle-3 {
          transform: translateZ(0px) rotate(5deg);
        }

        .switch__container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          position: absolute;
          width: 400px;
          padding: 50px 55px;
          transition: var(--transition);
          transform-style: preserve-3d;
        }

        .switch__title {
          color: var(--white);
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 10px;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .switch__container:hover .switch__title {
          transform: translateZ(25px);
        }

        .switch__description {
          color: var(--white);
          font-size: 14px;
          letter-spacing: 0.25px;
          text-align: center;
          line-height: 1.6;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .switch__container:hover .switch__description {
          transform: translateZ(15px);
        }

        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--white);
          margin-bottom: 20px;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transform-style: preserve-3d;
        }

        .switch__container:hover .logo-container {
          transform: translateZ(30px) rotate(5deg);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .is-txr {
          left: 50%;
          transition: var(--transition);
          transform-origin: left;
        }

        .is-txl {
          left: 0;
          transition: var(--transition);
          transform-origin: right;
        }

        .is-z200 {
          z-index: 200;
          transition: var(--transition);
        }

        .is-hidden {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          transition: var(--transition);
        }

        .is-gx {
          animation: is-gx var(--transition);
        }

        .error-message {
          color: #d32f2f;
          font-size: 14px;
          margin-top: 10px;
          text-align: center;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          margin-top: 10px;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .checkbox-container:hover {
          transform: translateZ(5px);
        }

        .checkbox-label {
          font-size: 13px;
          margin-left: 8px;
          color: var(--white-70);
        }

        .forgot-password {
          color: var(--white-70);
          font-size: 14px;
          margin-top: 10px;
          text-align: right;
          cursor: pointer;
          transition: all 0.3s ease;
          transform-style: preserve-3d;
        }

        .forgot-password:hover {
          color: var(--accent);
          transform: translateZ(5px);
        }

        @keyframes is-gx {
          0%,
          10%,
          100% {
            width: 50%;
          }
          30%,
          50% {
            width: 55%;
          }
        }

        .home-button {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background-color: var(--secondary-bg);
          color: var(--white);
          border: none;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          z-index: 300;
          transform-style: preserve-3d;
        }

        .home-button:hover {
          background-color: var(--accent);
          transform: translateY(-2px) translateZ(10px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .container,
          .switch {
            width: 100%;
          }

          .a-container,
          .b-container {
            left: 0;
          }

          .is-txr {
            left: 0;
          }

          body {
            perspective: none;
          }
        }
      `}</style>

      <div className="main">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#332E70",
              color: "#fff",
            },
            success: {
              style: {
                background: "#2D2A59",
                border: "1px solid #FF7A59",
              },
            },
            error: {
              style: {
                background: "#2D2A59",
                border: "1px solid #FF7A59",
              },
            },
          }}
        />

        {/* 3D geometric elements */}
        <div className="geometric-elements">
          <div className="triangle triangle-1"></div>
          <div className="triangle triangle-2"></div>
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>

        <button className="home-button" onClick={goToHome}>
          <Home size={20} />
          <span>Back Home</span>
        </button>

        <div
          className={`container a-container ${isSignUp ? "is-txl" : ""}`}
          id="a-container"
        >
          <form className="form" id="a-form" onSubmit={handleSignUp}>
            <div className="form-logo">
              <Image
                src="/images/lap.png"
                alt="Aurora Tourism"
                width={80}
                height={80}
                className="main-logo"
                priority
              />
            </div>
            <h2 className="title">Create Account</h2>
            <div className="form__icons">
              <Facebook className="form__icon" size={24} />
              <Linkedin className="form__icon" size={24} />
              <Twitter className="form__icon" size={24} />
            </div>
            <span className="form__span">or use email for registration</span>
            <div className="input-container">
              <UserIcon className="input-icon" size={20} />
              <input
                type="text"
                className="form__input"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <MailIcon className="input-icon" size={20} />
              <input
                type="email"
                className="form__input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <LockIcon className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                className="form__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <EyeOff
                  className="password-toggle"
                  size={20}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="password-toggle"
                  size={20}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="input-container">
              <LockIcon className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                className="form__input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <EyeOff
                  className="password-toggle"
                  size={20}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="password-toggle"
                  size={20}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <button
              className="button submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                  SIGNING UP...
                </>
              ) : (
                "SIGN UP"
              )}
            </button>
          </form>
        </div>

        <div
          className={`container b-container ${
            isSignUp ? "is-txl is-z200" : ""
          }`}
          id="b-container"
        >
          <form className="form" id="b-form" onSubmit={handleLogin}>
            <div className="form-logo">
              <Image
                src="/images/lap.png"
                alt="Aurora Tourism"
                width={80}
                height={80}
                className="main-logo"
                priority
              />
            </div>
            <h2 className="title">Sign in to Website</h2>
            <div className="form__icons">
              <Facebook className="form__icon" size={24} />
              <Linkedin className="form__icon" size={24} />
              <Twitter className="form__icon" size={24} />
            </div>
            <span className="form__span">or use your email account</span>
            <div className="input-container">
              <MailIcon className="input-icon" size={20} />
              <input
                type="email"
                className="form__input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <LockIcon className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                className="form__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <EyeOff
                  className="password-toggle"
                  size={20}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="password-toggle"
                  size={20}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="checkbox-container">
                <Checkbox id="remember" aria-label="Remember me checkbox" />
                <label htmlFor="remember" className="checkbox-label">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button
              className="button submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                  SIGNING IN...
                </>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>
        </div>

        <div
          className={`switch ${isSignUp ? "is-txr" : ""} ${
            isAnimating ? "is-gx" : ""
          }`}
          id="switch-cnt"
        >
          <div className="decorative-circle decorative-circle-1"></div>
          <div className="decorative-circle decorative-circle-2"></div>
          <div className="decorative-circle decorative-circle-3"></div>

          <div
            className={`switch__container ${isSignUp ? "is-hidden" : ""}`}
            id="switch-c1"
          >
            <div className="logo-container">
              <Image
                src="/images/lap.png"
                alt="Aurora Tourism"
                width={60}
                height={60}
                className="switch-logo"
                priority
              />
            </div>
            <h2 className="switch__title">Welcome Back!</h2>
            <p className="switch__description">
              To keep connected with us please login with your personal info
            </p>
            <button
              className="button switch-btn"
              onClick={toggleForm}
              type="button"
            >
              SIGN IN
            </button>
          </div>

          <div
            className={`switch__container ${isSignUp ? "" : "is-hidden"}`}
            id="switch-c2"
          >
            <div className="logo-container">
              <Image
                src="/images/lap.png"
                alt="Aurora Tourism"
                width={60}
                height={60}
                className="switch-logo"
                priority
              />
            </div>
            <h2 className="switch__title">Hello Friend!</h2>
            <p className="switch__description">
              Enter your personal details and start journey with us
            </p>
            <button
              className="button switch-btn"
              onClick={toggleForm}
              type="button"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
