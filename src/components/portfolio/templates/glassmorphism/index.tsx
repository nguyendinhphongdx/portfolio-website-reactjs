"use client";

import type { PortfolioData } from "@/types/portfolio";
import Image from "next/image";
import { useState, useEffect, type ReactNode } from "react";
import { getAllSocialLinks } from "../_shared/utils";

interface GlassmorphismTemplateProps {
  data: PortfolioData;
}

function getSocialIcon(type: string): ReactNode {
  const icons: Record<string, ReactNode> = {
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    website: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    dribbble: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm8.14 5.55a10.18 10.18 0 012.1 6.11c-.31-.06-3.39-.69-6.5-.3-.07-.16-.13-.32-.2-.47-.18-.43-.38-.87-.59-1.29 3.45-1.41 5.02-3.42 5.19-3.66zm-1.2-1.49c-.15.22-1.56 2.11-4.86 3.36a48.26 48.26 0 00-3.35-5.25 10.15 10.15 0 016.41 1.89zm-8.88-.78c.36.48 1.85 2.57 3.39 5.18-4.28 1.14-8.05 1.12-8.46 1.11a10.21 10.21 0 015.07-6.29zM1.77 12v-.29c.4.01 4.87.07 9.45-1.28.26.51.51 1.03.75 1.54-.12.03-.24.07-.35.11-4.76 1.54-7.29 5.74-7.5 6.08a10.18 10.18 0 01-2.35-6.16zm3.55 7.68c.14-.23 2.01-3.9 7.14-5.68.02 0 .03-.01.05-.01a41.3 41.3 0 011.86 6.58 10.19 10.19 0 01-9.05-.89zm11.04.08a41.4 41.4 0 00-1.67-6.15c2.94-.47 5.52.3 5.84.4a10.17 10.17 0 01-4.17 5.75z" />
      </svg>
    ),
    behance: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.97c.555 0 1.015-.14 1.375-.43.36-.29.54-.69.54-1.197 0-.3-.05-.553-.15-.76-.1-.21-.24-.38-.42-.51-.18-.135-.39-.23-.63-.29-.24-.063-.5-.09-.78-.09H3.38v3.28h3.165v-.003zm.205 5.735c.315 0 .61-.035.885-.105.27-.07.513-.182.72-.336.21-.154.37-.36.48-.612.115-.25.17-.57.17-.948 0-.75-.22-1.29-.66-1.62-.44-.33-1.01-.49-1.71-.49H3.38v4.11h3.37v.001zM15.585 14.27c.36.43.855.64 1.485.64.45 0 .855-.11 1.2-.33.345-.22.58-.45.705-.69h2.34c-.375 1.17-.93 2.01-1.665 2.52-.735.51-1.62.765-2.655.765-.72 0-1.38-.12-1.98-.36-.6-.24-1.11-.58-1.545-1.02-.43-.44-.765-.97-1-1.59-.24-.62-.36-1.3-.36-2.04 0-.72.12-1.38.355-2 .24-.62.57-1.15 1.005-1.59.435-.44.95-.78 1.545-1.02.6-.24 1.26-.36 1.98-.36.78 0 1.47.14 2.07.42.6.28 1.11.67 1.515 1.17.405.5.715 1.09.925 1.77.21.68.3 1.42.27 2.22h-7.02c.03.81.33 1.42.69 1.85l-.005-.01zm2.61-4.86c-.285-.33-.735-.51-1.35-.51-.39 0-.72.07-1.005.2-.285.13-.51.29-.69.48-.18.19-.315.39-.39.61-.08.21-.13.4-.15.57h4.44c-.09-.63-.375-1.09-.66-1.42l-.195.07zM14.79 4.97h5.31v1.41h-5.31V4.97z" />
      </svg>
    ),
  };
  return icons[type] || icons.website;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Get tech icon URL from devicon or simple-icons
function getTechIconUrl(techName: string): string {
  const name = techName.toLowerCase().replace(/\s+/g, "").replace(/\./g, "").replace(/#/g, "sharp");

  // Map common tech names to their devicon names
  const iconMap: Record<string, string> = {
    // Languages
    javascript: "javascript",
    typescript: "typescript",
    python: "python",
    java: "java",
    csharp: "csharp",
    "c#": "csharp",
    cpp: "cplusplus",
    "c++": "cplusplus",
    c: "c",
    go: "go",
    golang: "go",
    rust: "rust",
    ruby: "ruby",
    php: "php",
    swift: "swift",
    kotlin: "kotlin",
    dart: "dart",
    scala: "scala",
    r: "r",

    // Frontend
    react: "react",
    reactjs: "react",
    vue: "vuejs",
    vuejs: "vuejs",
    angular: "angularjs",
    angularjs: "angularjs",
    svelte: "svelte",
    nextjs: "nextjs",
    next: "nextjs",
    nuxt: "nuxtjs",
    nuxtjs: "nuxtjs",
    gatsby: "gatsby",
    html: "html5",
    html5: "html5",
    css: "css3",
    css3: "css3",
    sass: "sass",
    scss: "sass",
    less: "less",
    tailwind: "tailwindcss",
    tailwindcss: "tailwindcss",
    bootstrap: "bootstrap",
    materialui: "materialui",
    mui: "materialui",
    chakraui: "chakraui",
    antdesign: "antdesign",
    jquery: "jquery",

    // Backend
    nodejs: "nodejs",
    node: "nodejs",
    express: "express",
    expressjs: "express",
    nestjs: "nestjs",
    nest: "nestjs",
    django: "django",
    flask: "flask",
    fastapi: "fastapi",
    rails: "rails",
    rubyonrails: "rails",
    laravel: "laravel",
    spring: "spring",
    springboot: "spring",
    dotnet: "dotnetcore",
    ".net": "dotnetcore",
    aspnet: "dotnetcore",

    // Database
    mongodb: "mongodb",
    mongo: "mongodb",
    mysql: "mysql",
    postgresql: "postgresql",
    postgres: "postgresql",
    redis: "redis",
    sqlite: "sqlite",
    oracle: "oracle",
    cassandra: "cassandra",
    dynamodb: "dynamodb",
    firebase: "firebase",
    supabase: "supabase",
    prisma: "prisma",

    // Cloud & DevOps
    aws: "amazonwebservices",
    amazonwebservices: "amazonwebservices",
    azure: "azure",
    gcp: "googlecloud",
    googlecloud: "googlecloud",
    docker: "docker",
    kubernetes: "kubernetes",
    k8s: "kubernetes",
    jenkins: "jenkins",
    gitlab: "gitlab",
    github: "github",
    bitbucket: "bitbucket",
    terraform: "terraform",
    ansible: "ansible",
    nginx: "nginx",
    apache: "apache",
    vercel: "vercel",
    netlify: "netlify",
    heroku: "heroku",
    digitalocean: "digitalocean",

    // Tools
    git: "git",
    npm: "npm",
    yarn: "yarn",
    webpack: "webpack",
    vite: "vitejs",
    vitejs: "vitejs",
    babel: "babel",
    eslint: "eslint",
    prettier: "prettier",
    jest: "jest",
    cypress: "cypress",
    playwright: "playwright",
    storybook: "storybook",
    figma: "figma",
    sketch: "sketch",
    adobexd: "xd",
    photoshop: "photoshop",
    illustrator: "illustrator",

    // Mobile
    reactnative: "react",
    flutter: "flutter",
    android: "android",
    ios: "apple",
    xcode: "xcode",

    // Others
    graphql: "graphql",
    rest: "nodejs",
    restapi: "nodejs",
    linux: "linux",
    ubuntu: "ubuntu",
    windows: "windows8",
    macos: "apple",
    vscode: "vscode",
    vim: "vim",
    neovim: "neovim",
    intellij: "intellij",
    webstorm: "webstorm",
    pycharm: "pycharm",
    electron: "electron",
    threejs: "threejs",
    unity: "unity",
    unreal: "unrealengine",
    blender: "blender",
    wordpress: "wordpress",
    shopify: "shopify",
    stripe: "stripe",
    socketio: "socketio",
    redux: "redux",
    mobx: "mobx",
    zustand: "react",
    framermotion: "framermotion",
  };

  const iconName = iconMap[name] || name;

  // Return devicon URL (colored version)
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
}

// Skill card with icon - Compact design
function SkillCard({ name, primaryColor }: { name: string; primaryColor: string }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = getTechIconUrl(name);

  return (
    <div className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-[#1A0B2E]/80 border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 cursor-default w-[90px]">
      <div className="w-10 h-10 flex items-center justify-center">
        {!imgError ? (
          <img
            src={iconUrl}
            alt={name}
            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${primaryColor}60, ${primaryColor}30)` }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span className="text-xs text-white/60 group-hover:text-white text-center transition-colors truncate w-full">
        {name}
      </span>
    </div>
  );
}

// Typing effect component
function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
    </span>
  );
}

// Floating particles component - using deterministic values to avoid hydration mismatch
const particlePositions = [
  { left: 5, top: 12, delay: 0.2, duration: 16 },
  { left: 15, top: 45, delay: 1.5, duration: 18 },
  { left: 25, top: 78, delay: 2.8, duration: 20 },
  { left: 35, top: 23, delay: 0.8, duration: 17 },
  { left: 45, top: 56, delay: 3.2, duration: 19 },
  { left: 55, top: 89, delay: 1.1, duration: 22 },
  { left: 65, top: 34, delay: 4.0, duration: 16 },
  { left: 75, top: 67, delay: 2.3, duration: 21 },
  { left: 85, top: 11, delay: 0.5, duration: 18 },
  { left: 95, top: 44, delay: 3.7, duration: 20 },
  { left: 10, top: 77, delay: 1.9, duration: 17 },
  { left: 20, top: 33, delay: 4.5, duration: 19 },
  { left: 30, top: 66, delay: 0.1, duration: 23 },
  { left: 40, top: 99, delay: 2.6, duration: 16 },
  { left: 50, top: 22, delay: 3.9, duration: 18 },
  { left: 60, top: 55, delay: 1.4, duration: 21 },
  { left: 70, top: 88, delay: 4.2, duration: 17 },
  { left: 80, top: 41, delay: 0.7, duration: 20 },
  { left: 90, top: 74, delay: 2.1, duration: 19 },
  { left: 98, top: 8, delay: 3.4, duration: 22 },
];

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particlePositions.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function GlassmorphismTemplate({ data }: GlassmorphismTemplateProps) {
  const primaryColor = data.primaryColor || "#9857D3";
  const socialLinks = getAllSocialLinks(data);

  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];
  const certifications = data.certifications || [];
  const testimonials = data.testimonials || [];
  const languages = data.languages || [];
  const interests = data.interests || [];

  const yearsOfExperience = experience.length > 0
    ? new Date().getFullYear() - new Date(experience[experience.length - 1]?.startDate || new Date()).getFullYear()
    : 0;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#11071F]">
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes border-dance {
          0%, 100% {
            border-color: rgba(152, 87, 211, 0.3);
          }
          50% {
            border-color: rgba(152, 87, 211, 0.6);
          }
        }
        @keyframes orbit {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(30px, -20px) rotate(180deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
        @keyframes orbit-reverse {
          0% {
            transform: translate(0, 0) rotate(360deg);
          }
          50% {
            transform: translate(-25px, 15px) rotate(180deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-border {
          animation: border-dance 3s ease-in-out infinite;
        }
        .animate-orbit {
          animation: orbit 20s ease-in-out infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-reverse 25s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow 25s linear infinite reverse;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-shooting-star {
          animation: shooting-star 3s ease-out infinite;
        }
        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .glass-card-hover:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%);
          border-color: rgba(152, 87, 211, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(152, 87, 211, 0.2);
        }
        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, #CCD6F6 50%, ${primaryColor} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow-text {
          text-shadow: 0 0 40px rgba(152, 87, 211, 0.5);
        }
        .skill-card {
          position: relative;
          overflow: hidden;
        }
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
        .skill-card:hover::before {
          left: 100%;
        }
      `}</style>

      {/* Background Pattern & Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#11071F] via-[#1A0B2E] to-[#11071F]" />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(152, 87, 211, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(152, 87, 211, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Animated gradient orbs - Enhanced & Brighter */}
        <div
          className="absolute top-[-20%] left-[-15%] w-[80%] h-[80%] rounded-full blur-[150px] animate-pulse-glow"
          style={{ background: `radial-gradient(circle, ${primaryColor}90, transparent 60%)` }}
        />
        <div
          className="absolute top-[10%] right-[-20%] w-[70%] h-[70%] rounded-full blur-[130px] animate-pulse-glow"
          style={{ background: `radial-gradient(circle, #693B9390, transparent 60%)`, animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-[-15%] left-[20%] w-[60%] h-[60%] rounded-full blur-[120px] animate-pulse-glow"
          style={{ background: `radial-gradient(circle, #4690D480, transparent 60%)`, animationDelay: "4s" }}
        />
        <div
          className="absolute bottom-[20%] right-[0%] w-[50%] h-[50%] rounded-full blur-[100px] animate-pulse-glow"
          style={{ background: `radial-gradient(circle, #EC489970, transparent 60%)`, animationDelay: "1s" }}
        />

        {/* Additional moving orbs for hero - Brighter */}
        <div
          className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full blur-[80px] animate-orbit"
          style={{ background: `radial-gradient(circle, #06B6D470, transparent 70%)` }}
        />
        <div
          className="absolute top-[50%] left-[60%] w-[25%] h-[25%] rounded-full blur-[70px] animate-orbit-reverse"
          style={{ background: `radial-gradient(circle, #F9731670, transparent 70%)` }}
        />

        {/* Extra bright orbs in hero area */}
        <div
          className="absolute top-[5%] left-[30%] w-[20%] h-[20%] rounded-full blur-[60px] animate-pulse-glow"
          style={{ background: `radial-gradient(circle, #A855F780, transparent 70%)`, animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-[15%] right-[10%] w-[15%] h-[15%] rounded-full blur-[50px] animate-pulse-glow"
          style={{ background: `radial-gradient(circle, #3B82F680, transparent 70%)`, animationDelay: "1.5s" }}
        />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Animated rings */}
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] animate-spin-slow opacity-10">
          <div className="absolute inset-0 rounded-full border border-purple-500/30" />
          <div className="absolute inset-4 rounded-full border border-purple-500/20" />
          <div className="absolute inset-8 rounded-full border border-purple-500/10" />
        </div>
        <div className="absolute bottom-[30%] right-[5%] w-[200px] h-[200px] animate-spin-slow-reverse opacity-10">
          <div className="absolute inset-0 rounded-full border border-blue-500/30" />
          <div className="absolute inset-3 rounded-full border border-blue-500/20" />
          <div className="absolute inset-6 rounded-full border border-blue-500/10" />
        </div>

        {/* Glowing dots - Enhanced with more dots and brighter glow */}
        {/* Large dots */}
        <div className="absolute top-[15%] left-[25%] w-3 h-3 rounded-full bg-purple-400 animate-pulse shadow-[0_0_30px_12px_rgba(168,85,247,0.6)]" />
        <div className="absolute top-[40%] right-[15%] w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_25px_10px_rgba(59,130,246,0.6)]" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[25%] left-[15%] w-3 h-3 rounded-full bg-pink-400 animate-pulse shadow-[0_0_30px_12px_rgba(236,72,153,0.6)]" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[60%] left-[50%] w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_20px_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-[25%] right-[30%] w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_25px_10px_rgba(251,146,60,0.6)]" style={{ animationDelay: "1.5s" }} />

        {/* Medium dots */}
        <div className="absolute top-[8%] left-[45%] w-2 h-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_20px_8px_rgba(167,139,250,0.5)]" style={{ animationDelay: "0.3s" }} />
        <div className="absolute top-[35%] left-[8%] w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_20px_8px_rgba(52,211,153,0.5)]" style={{ animationDelay: "1.8s" }} />
        <div className="absolute top-[70%] right-[25%] w-2 h-2 rounded-full bg-rose-400 animate-pulse shadow-[0_0_20px_8px_rgba(251,113,133,0.5)]" style={{ animationDelay: "2.5s" }} />
        <div className="absolute top-[55%] left-[20%] w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_20px_8px_rgba(56,189,248,0.5)]" style={{ animationDelay: "0.8s" }} />
        <div className="absolute bottom-[40%] right-[8%] w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_20px_8px_rgba(251,191,36,0.5)]" style={{ animationDelay: "3s" }} />
        <div className="absolute top-[20%] left-[65%] w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_20px_8px_rgba(129,140,248,0.5)]" style={{ animationDelay: "1.2s" }} />

        {/* Small twinkling dots */}
        <div className="absolute top-[12%] right-[45%] w-1.5 h-1.5 rounded-full bg-white animate-twinkle shadow-[0_0_15px_6px_rgba(255,255,255,0.4)]" style={{ animationDelay: "0.2s" }} />
        <div className="absolute top-[45%] left-[35%] w-1.5 h-1.5 rounded-full bg-white animate-twinkle shadow-[0_0_15px_6px_rgba(255,255,255,0.4)]" style={{ animationDelay: "1.4s" }} />
        <div className="absolute top-[75%] left-[55%] w-1.5 h-1.5 rounded-full bg-white animate-twinkle shadow-[0_0_15px_6px_rgba(255,255,255,0.4)]" style={{ animationDelay: "2.2s" }} />
        <div className="absolute top-[30%] right-[10%] w-1.5 h-1.5 rounded-full bg-white animate-twinkle shadow-[0_0_15px_6px_rgba(255,255,255,0.4)]" style={{ animationDelay: "0.7s" }} />
        <div className="absolute bottom-[15%] right-[40%] w-1.5 h-1.5 rounded-full bg-white animate-twinkle shadow-[0_0_15px_6px_rgba(255,255,255,0.4)]" style={{ animationDelay: "1.9s" }} />
        <div className="absolute top-[5%] left-[15%] w-1.5 h-1.5 rounded-full bg-white animate-twinkle shadow-[0_0_15px_6px_rgba(255,255,255,0.4)]" style={{ animationDelay: "2.8s" }} />
        <div className="absolute top-[85%] left-[25%] w-1.5 h-1.5 rounded-full bg-white animate-twinkle shadow-[0_0_15px_6px_rgba(255,255,255,0.4)]" style={{ animationDelay: "0.4s" }} />
        <div className="absolute top-[50%] right-[35%] w-1.5 h-1.5 rounded-full bg-white animate-twinkle shadow-[0_0_15px_6px_rgba(255,255,255,0.4)]" style={{ animationDelay: "1.6s" }} />

        {/* Tiny sparkles */}
        <div className="absolute top-[18%] left-[55%] w-1 h-1 rounded-full bg-purple-300 animate-twinkle shadow-[0_0_10px_4px_rgba(216,180,254,0.5)]" style={{ animationDelay: "0.1s" }} />
        <div className="absolute top-[65%] right-[18%] w-1 h-1 rounded-full bg-blue-300 animate-twinkle shadow-[0_0_10px_4px_rgba(147,197,253,0.5)]" style={{ animationDelay: "0.9s" }} />
        <div className="absolute bottom-[35%] left-[42%] w-1 h-1 rounded-full bg-pink-300 animate-twinkle shadow-[0_0_10px_4px_rgba(249,168,212,0.5)]" style={{ animationDelay: "1.7s" }} />
        <div className="absolute top-[38%] left-[75%] w-1 h-1 rounded-full bg-cyan-300 animate-twinkle shadow-[0_0_10px_4px_rgba(103,232,249,0.5)]" style={{ animationDelay: "2.4s" }} />
        <div className="absolute top-[82%] right-[55%] w-1 h-1 rounded-full bg-emerald-300 animate-twinkle shadow-[0_0_10px_4px_rgba(110,231,183,0.5)]" style={{ animationDelay: "0.6s" }} />
        <div className="absolute top-[28%] left-[5%] w-1 h-1 rounded-full bg-amber-300 animate-twinkle shadow-[0_0_10px_4px_rgba(252,211,77,0.5)]" style={{ animationDelay: "1.3s" }} />
        <div className="absolute bottom-[10%] left-[70%] w-1 h-1 rounded-full bg-violet-300 animate-twinkle shadow-[0_0_10px_4px_rgba(196,181,253,0.5)]" style={{ animationDelay: "2.1s" }} />
        <div className="absolute top-[48%] left-[12%] w-1 h-1 rounded-full bg-rose-300 animate-twinkle shadow-[0_0_10px_4px_rgba(253,164,175,0.5)]" style={{ animationDelay: "0.35s" }} />

        {/* Gradient mesh lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0" />
              <stop offset="50%" stopColor={primaryColor} stopOpacity="0.6" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0" />
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="25%" x2="100%" y2="55%" stroke="url(#lineGrad1)" strokeWidth="1" />
          <line x1="100%" y1="15%" x2="0" y2="65%" stroke="url(#lineGrad1)" strokeWidth="1" />
          <line x1="0" y1="45%" x2="100%" y2="45%" stroke="url(#lineGrad2)" strokeWidth="0.5" />
          <line x1="0" y1="70%" x2="100%" y2="30%" stroke="url(#lineGrad3)" strokeWidth="0.5" />
        </svg>

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#11071F_70%)] opacity-60" />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="px-8 py-3 rounded-full glass-card shadow-2xl animate-border">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, #693B93)` }}
              >
                {data.fullName?.charAt(0) || "P"}
              </div>
              <span className="font-semibold text-white hidden sm:block">{data.fullName?.split(" ").pop() || "Portfolio"}</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#hero" className="text-white/60 hover:text-white transition-all hover:scale-105">Home</a>
              <a href="#about" className="text-white/60 hover:text-white transition-all hover:scale-105">About</a>
              {data.showExperience !== false && experience.length > 0 && (
                <a href="#experience" className="text-white/60 hover:text-white transition-all hover:scale-105">Lab</a>
              )}
              <a href="#contact" className="px-4 py-1.5 rounded-full text-white text-sm font-medium transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, #693B93)` }}>
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <section id="hero" className="min-h-[90vh] flex flex-col justify-center mb-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="order-2 lg:order-1 space-y-8">
                {/* Typing role text */}
                <div className="inline-block px-4 py-2 rounded-full glass-card">
                  <TypingText
                    text={`I'm a ${data.title || "Software Engineer"}.`}
                    className="text-white/90 font-medium"
                  />
                </div>

                {/* Main headline - Use tagline or fullName */}
                <div className="space-y-2">
                  {data.tagline ? (
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      <span className="text-gradient glow-text">{data.tagline}</span>
                    </h1>
                  ) : (
                    <>
                      <p className="text-white/60 text-xl md:text-2xl font-light">Hi, I&apos;m</p>
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        <span className="text-gradient glow-text">{data.fullName || "Your Name"}</span>
                      </h1>
                    </>
                  )}
                </div>

                {/* Bio as subtitle */}
                {data.bio && (
                  <p className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed">
                    {data.bio}
                  </p>
                )}

                {/* Current Position with decorative arrow */}
                {experience.length > 0 && experience[0] && (
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 pt-4">
                    <span className="text-white/60 text-sm md:text-base">Currently, I&apos;m a {experience[0].position} at</span>
                    <div className="relative inline-block">
                      <span
                        className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-semibold text-white text-sm md:text-base inline-block"
                        style={{ background: `linear-gradient(135deg, ${primaryColor}40, ${primaryColor}20)`, border: `1px solid ${primaryColor}40` }}
                      >
                        {experience[0].company}
                      </span>
                      {/* Decorative arrow - hidden on mobile */}
                      <svg className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-8 text-white/20 hidden md:block" viewBox="0 0 79 48" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.254343 47.5463C0.254343 47.5463 0.254258 47.5465 0.385594 47.6201C0.457254 47.7525 0.457348 47.7525 0.457348 47.7525L0.46472 47.7485L0.487292 47.7364L0.576182 47.6889C0.654365 47.6473 0.769695 47.5862 0.918003 47.5088C1.21463 47.3538 1.64313 47.1331 2.17017 46.8701C3.22441 46.3441 4.67219 45.6496 6.24702 44.9753C7.82241 44.3007 9.52197 43.6475 11.0804 43.2029C12.6445 42.7568 14.0453 42.5272 15.0328 42.6816L15.0793 42.384C14.0227 42.2189 12.5677 42.4655 10.9978 42.9133C9.42223 43.3628 7.70969 44.0213 6.12848 44.6984C4.54672 45.3758 3.09342 46.0729 2.03573 46.6006C1.50681 46.8645 1.07663 47.0861 0.778569 47.2418C0.77174 47.2454 0.764982 47.2489 0.758293 47.2524C0.803533 47.1686 0.854445 47.0736 0.910432 46.9684C1.15561 46.5076 1.49819 45.8496 1.88807 45.0603C2.66753 43.4822 3.63738 41.3766 4.39579 39.2712C5.15234 37.171 5.70596 35.0514 5.63718 33.4527C5.60274 32.6523 5.41157 31.962 4.99096 31.4724C4.56565 30.9773 3.92594 30.7105 3.04741 30.7191L3.05033 31.0202C3.86306 31.0123 4.40858 31.2566 4.76253 31.6686C5.12118 32.0861 5.30332 32.6987 5.33631 33.4656C5.40239 35.0014 4.86737 37.0735 4.11247 39.1692C3.35943 41.2596 2.39501 43.354 1.61807 44.9269C1.22975 45.7131 0.888587 46.3683 0.644579 46.8269C0.522582 47.0562 0.424887 47.2363 0.357746 47.359C0.324176 47.4203 0.298246 47.4673 0.280738 47.4989L0.260888 47.5346L0.254343 47.5463ZM0.385594 47.6201L0.457348 47.7525L0 48L0.254343 47.5463L0.385594 47.6201Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M38.7939 11.1242C25.8614 18.0945 14.3196 27.8886 7.34227 39.1827L7.59847 39.3409C14.5411 28.1031 26.0375 18.3416 38.9368 11.3893C51.8361 4.43691 66.1245 0.301143 78.6418 0.301143V0C66.0638 -5.72127e-07 51.7265 4.15389 38.7939 11.1242Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex items-center gap-4 pt-8 flex-wrap">
                  {/* Download CV Button */}
                  {data.cvUrl ? (
                    <a
                      href={data.cvUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, #693B93)` }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download CV
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white/40 border border-white/10 cursor-not-allowed">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      CV Not Available
                    </span>
                  )}

                  {/* Contact Button */}
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white/80 border border-white/20 hover:border-white/40 hover:text-white transition-all hover:scale-105"
                  >
                    Get in Touch
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <div className="flex items-center gap-4 pt-4 flex-wrap">
                    {socialLinks.map((link, index) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-white/50 hover:text-white transition-all"
                      >
                        <span className="capitalize group-hover:underline underline-offset-4">{link.type}</span>
                        {index < socialLinks.length - 1 && (
                          <span className="text-white/20 ml-2">&gt;&gt;</span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Right - Avatar with floating widgets */}
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  {/* Multiple glow layers */}
                  <div
                    className="absolute inset-0 rounded-full blur-[80px] opacity-60 scale-125"
                    style={{ background: `radial-gradient(circle, ${primaryColor}, transparent 70%)` }}
                  />
                  <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-40 scale-110"
                    style={{ background: `radial-gradient(circle, #fff, transparent 70%)` }}
                  />

                  {/* Avatar container with border glow */}
                  <div className="relative">
                    <div
                      className="absolute -inset-1 rounded-full opacity-50 blur-sm animate-gradient"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, #693B93, #4690D4, ${primaryColor})`, backgroundSize: "300% 300%" }}
                    />
                    <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-white/20">
                      {data.avatar ? (
                        <Image
                          src={data.avatar}
                          alt={data.fullName || "Avatar"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-8xl font-bold text-white"
                          style={{ background: `linear-gradient(135deg, ${primaryColor}, #693B93)` }}
                        >
                          {data.fullName?.charAt(0) || "?"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Floating Widget - Years Experience (Top Right) */}
                  <div
                    className="absolute -top-2 -right-6 md:right-0 glass-card px-4 py-3 rounded-2xl animate-float-slow"
                    style={{ animationDelay: "0s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${primaryColor}, #693B93)` }}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{yearsOfExperience}+</p>
                        <p className="text-xs text-white/50">Years Exp.</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Widget - Projects (Bottom Left) */}
                  <div
                    className="absolute -bottom-4 -left-8 md:-left-12 glass-card px-4 py-3 rounded-2xl animate-float-slow"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{projects.length}+</p>
                        <p className="text-xs text-white/50">Projects</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Widget - Skills (Top Left) */}
                  <div
                    className="absolute top-1/4 -left-16 md:-left-24 glass-card px-4 py-3 rounded-2xl animate-float-slow hidden lg:block"
                    style={{ animationDelay: "2s" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F97316, #EAB308)" }}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{skills.length}+</p>
                        <p className="text-xs text-white/50">Skills</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Widget - Location (Bottom Right) */}
                  {data.location && (
                    <div
                      className="absolute bottom-1/4 -right-12 md:-right-20 glass-card px-4 py-2 rounded-full animate-float-slow hidden md:flex items-center gap-2"
                      style={{ animationDelay: "1.5s" }}
                    >
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="8" />
                      </svg>
                      <span className="text-sm text-white/80">{data.location}</span>
                    </div>
                  )}

                  {/* Decorative floating dots */}
                  <div className="absolute top-10 left-0 w-3 h-3 rounded-full bg-purple-500/50 animate-ping" style={{ animationDuration: "2s" }} />
                  <div className="absolute bottom-20 right-0 w-2 h-2 rounded-full bg-blue-500/50 animate-ping" style={{ animationDuration: "3s", animationDelay: "1s" }} />
                  <div className="absolute top-1/2 -right-8 w-2 h-2 rounded-full bg-pink-500/50 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-white/40 text-xs tracking-widest">SCROLL</span>
              <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-white/40" />
              </div>
            </div>
          </section>

          {/* Education & Certifications - Before Work Experience */}
          {((data.showEducation !== false && education.length > 0) || (data.showCertifications !== false && certifications.length > 0)) && (
            <section className="mb-32">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Education */}
                {data.showEducation !== false && education.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <h2 className="text-sm font-medium text-white/50 tracking-[0.3em] uppercase">Education</h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                    </div>

                    <div className="space-y-4">
                      {education.map((edu, index) => {
                        const colors = ["#A855F7", "#3B82F6", "#10B981", "#F97316"];
                        const accentColor = colors[index % colors.length];

                        return (
                          <div
                            key={index}
                            className="group p-5 rounded-2xl glass-card hover:border-white/20 transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                                style={{ background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)` }}
                              >
                                🎓
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                                  <div>
                                    <h3 className="text-base font-semibold text-white">{edu.degree}</h3>
                                    <p className="text-sm" style={{ color: accentColor }}>{edu.institution}</p>
                                  </div>
                                  <span className="text-xs text-white/30 whitespace-nowrap">
                                    {formatDate(edu.startDate)} — {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : ""}
                                  </span>
                                </div>

                                {edu.field && (
                                  <p className="text-sm text-white/50 mt-1">
                                    <span className="text-white/30">Field:</span> {edu.field}
                                  </p>
                                )}

                                {edu.gpa && (
                                  <p className="text-sm text-white/50 mt-1">
                                    <span className="text-white/30">GPA:</span>{" "}
                                    <span className="font-medium text-white">{edu.gpa}</span>
                                  </p>
                                )}

                                {edu.description && (
                                  <p className="text-sm text-white/40 mt-2 italic">{edu.description}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {data.showCertifications !== false && certifications.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <h2 className="text-sm font-medium text-white/50 tracking-[0.3em] uppercase">Certifications</h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                    </div>

                    <div className="space-y-4">
                      {certifications.map((cert, index) => (
                        <div key={index} className="group flex items-start gap-4 p-5 rounded-2xl glass-card hover:border-white/20 transition-all duration-300">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                            style={{ background: `linear-gradient(135deg, ${primaryColor}40, ${primaryColor}20)` }}
                          >
                            🏆
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-white">{cert.name}</h3>
                            <p className="text-sm text-white/50">{cert.issuer}</p>
                            {cert.date && <p className="text-xs text-white/30 mt-1">{cert.date}</p>}
                            {cert.url && (
                              <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-2 text-sm hover:underline"
                                style={{ color: primaryColor }}
                              >
                                View credential →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Work Experience Section - Timeline Style */}
          {data.showExperience !== false && experience.length > 0 && (
            <section id="experience" className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-sm font-medium text-white/50 tracking-[0.3em] uppercase">Work Experience</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              {/* Timeline */}
              <div className="relative pl-6 md:pl-0">
                {/* Timeline line */}
                <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent md:-translate-x-1/2" />

                <div className="space-y-8 md:space-y-12">
                  {experience.map((exp, index) => {
                    const isEven = index % 2 === 0;
                    const colors = ["#A855F7", "#3B82F6", "#F97316", "#10B981", "#EC4899"];
                    const accentColor = colors[index % colors.length];

                    return (
                      <div
                        key={index}
                        className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                      >
                        {/* Timeline dot */}
                        <div className="absolute -left-6 md:left-1/2 top-0 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-2 border-white/30 bg-[#11071F] md:-translate-x-1/2 z-10">
                          <div className="absolute inset-0.5 md:inset-1 rounded-full" style={{ background: accentColor }} />
                        </div>

                        {/* Date - Mobile: inline, Desktop: separate column */}
                        <div className={`hidden md:flex md:w-1/2 ${isEven ? "justify-end pr-12" : "justify-start pl-12"}`}>
                          <div className={`flex flex-col ${isEven ? "items-end text-right" : "items-start text-left"}`}>
                            <span className="text-sm font-medium" style={{ color: accentColor }}>
                              {formatDate(exp.startDate)} — {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                            </span>
                            {exp.location && (
                              <span className="text-xs text-white/40 mt-1 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                {exp.location}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content Card */}
                        <div className={`md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"}`}>
                          <div className="group glass-card rounded-2xl p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                            {/* Hover glow */}
                            <div
                              className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity"
                              style={{ background: accentColor }}
                            />

                            <div className="relative">
                              {/* Header */}
                              <div className="flex items-start gap-4 mb-4">
                                <div
                                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0"
                                  style={{ background: `linear-gradient(135deg, ${accentColor}80, ${accentColor}40)` }}
                                >
                                  {exp.company.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-bold text-white truncate">{exp.position}</h3>
                                  <p className="text-white/60 text-sm">{exp.company}</p>
                                  {/* Mobile date */}
                                  <p className="text-xs mt-1 md:hidden" style={{ color: accentColor }}>
                                    {formatDate(exp.startDate)} — {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                                  </p>
                                </div>
                                {exp.current && (
                                  <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-green-500/20 text-green-400 border border-green-500/30 shrink-0">
                                    CURRENT
                                  </span>
                                )}
                              </div>

                              {/* Description */}
                              {exp.description && (
                                <p className="text-white/50 text-sm leading-relaxed mb-4">
                                  {exp.description}
                                </p>
                              )}

                              {/* Highlights */}
                              {exp.highlights && exp.highlights.length > 0 && (
                                <ul className="space-y-2 mb-4">
                                  {exp.highlights.slice(0, 3).map((highlight, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-white/40">
                                      <span style={{ color: accentColor }}>•</span>
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Location on mobile */}
                              {exp.location && (
                                <div className="flex items-center gap-1 text-xs text-white/30 md:hidden">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  </svg>
                                  {exp.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Skills Section */}
          {data.showSkills !== false && skills.length > 0 && (
            <section id="skills" className="mb-32">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-sm font-medium text-white/50 tracking-[0.3em] uppercase">Technologies</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              {/* Skills Grid - Compact */}
              <div className="flex flex-wrap gap-2 justify-center">
                {skills.map((skill, index) => (
                  <SkillCard key={index} name={skill.name} primaryColor={primaryColor} />
                ))}
              </div>
            </section>
          )}

          {/* Featured Projects Section - Showcase Layout */}
          {data.showProjects !== false && projects.length > 0 && (
            <section id="projects" className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-sm font-medium text-white/50 tracking-[0.3em] uppercase">Featured Projects</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <div className="space-y-16">
                {projects.map((project, index) => {
                  const colors = ["#A855F7", "#3B82F6", "#10B981", "#F97316", "#EC4899", "#06B6D4"];
                  const accentColor = colors[index % colors.length];
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={index}
                      className={`group grid lg:grid-cols-2 gap-8 items-start ${!isEven ? "lg:direction-rtl" : ""}`}
                    >
                      {/* Project Image */}
                      <div className={`relative ${!isEven ? "lg:order-2" : ""}`}>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
                          {/* Glow effect */}
                          <div
                            className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 -z-10"
                            style={{ background: `linear-gradient(135deg, ${accentColor}, transparent)` }}
                          />
                          <div
                            className="aspect-video relative"
                            style={{ background: `linear-gradient(135deg, ${accentColor}15, #1A0B2E)` }}
                          >
                            {project.image ? (
                              <Image
                                src={project.image}
                                alt={project.name}
                                fill
                                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-2xl"
                                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}60)` }}
                                >
                                  {project.name.charAt(0)}
                                </div>
                              </div>
                            )}
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#11071F]/80 via-transparent to-transparent" />
                          </div>
                        </div>

                        {/* Floating date badge */}
                        {(project.startDate || project.endDate) && (
                          <div
                            className="absolute -bottom-3 left-4 px-3 py-1.5 rounded-full text-xs font-medium glass-card"
                            style={{ borderColor: `${accentColor}40` }}
                          >
                            <span className="text-white/60">
                              {project.startDate && formatDate(project.startDate)}
                              {project.endDate && ` — ${formatDate(project.endDate)}`}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Info */}
                      <div className={`space-y-5 ${!isEven ? "lg:order-1 lg:text-right" : ""}`}>
                        {/* Project number & type */}
                        <div className={`flex items-center gap-3 ${!isEven ? "lg:justify-end" : ""}`}>
                          <span
                            className="text-xs font-mono px-2 py-1 rounded-md"
                            style={{ background: `${accentColor}20`, color: accentColor }}
                          >
                            #{String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs text-white/40 uppercase tracking-wider">Featured Project</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-200 transition-colors">
                          {project.name}
                        </h3>

                        {/* Description - supports HTML */}
                        {project.description && (
                          <div
                            className={`glass-card rounded-xl p-5 ${!isEven ? "lg:ml-auto lg:mr-0" : ""}`}
                            style={{ maxWidth: "100%" }}
                          >
                            <div
                              className="text-white/60 text-sm leading-relaxed prose prose-invert prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-strong:text-white/80 prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline"
                              dangerouslySetInnerHTML={{ __html: project.description }}
                            />
                          </div>
                        )}

                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className={`flex flex-wrap gap-2 ${!isEven ? "lg:justify-end" : ""}`}>
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-white/50 border border-white/10 hover:border-white/20 hover:text-white/70 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Links */}
                        <div className={`flex items-center gap-4 pt-2 ${!isEven ? "lg:justify-end" : ""}`}>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card text-white/60 hover:text-white hover:border-white/30 transition-all group/link"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                              </svg>
                              <span className="text-sm font-medium">Source Code</span>
                              <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </a>
                          )}
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all group/link hover:scale-105"
                              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)` }}
                            >
                              <span className="text-sm">Live Demo</span>
                              <svg className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Testimonials */}
          {data.showTestimonials !== false && testimonials.length > 0 && (
            <section className="mb-32">
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-sm font-medium text-white/50 tracking-[0.3em] uppercase">What People Say</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="rounded-[24px] glass-card p-8 relative overflow-hidden">
                    <div className="absolute top-4 right-6 text-6xl opacity-10" style={{ color: primaryColor }}>&ldquo;</div>
                    <div className="flex items-start gap-4 mb-6">
                      {testimonial.avatar ? (
                        <Image src={testimonial.avatar} alt={testimonial.name} width={56} height={56} className="rounded-full border-2 border-white/10" />
                      ) : (
                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white"
                          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}80)` }}>
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                        <p className="text-white/50 text-sm">{testimonial.role}{testimonial.company ? ` at ${testimonial.company}` : ""}</p>
                      </div>
                    </div>
                    <p className="text-white/60 italic leading-relaxed">{testimonial.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages & Interests */}
          {(languages.length > 0 || interests.length > 0) && (
            <section className="mb-32">
              <div className="grid md:grid-cols-2 gap-8">
                {languages.length > 0 && (
                  <div className="rounded-[24px] glass-card p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="text-2xl">🌍</span> Languages
                    </h3>
                    <div className="space-y-4">
                      {languages.map((lang, index) => {
                        const levelWidth: Record<string, string> = { native: "100%", fluent: "85%", intermediate: "60%", beginner: "30%" };
                        return (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-white">{lang.name}</span>
                              <span className="text-white/40 capitalize">{lang.level}</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-1000"
                                style={{ width: levelWidth[lang.level] || "50%", background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}80)` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {interests.length > 0 && (
                  <div className="rounded-[24px] glass-card p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="text-2xl">✨</span> Interests
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {interests.map((interest, index) => (
                        <span key={index} className="px-4 py-2 rounded-xl bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-colors">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Contact Section - Redesigned */}
          <section id="contact" className="mb-20">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-sm font-medium text-white/50 tracking-[0.3em] uppercase">Get In Touch</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - CTA */}
              <div className="space-y-6">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Let&apos;s work<br />
                  <span className="text-gradient">together.</span>
                </h3>
                <p className="text-white/50 text-lg max-w-md leading-relaxed">
                  Have a project in mind or want to collaborate? I&apos;d love to hear from you.
                </p>

                {/* Email CTA */}
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="group inline-flex items-center gap-4 mt-4"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, #693B93)` }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Email me at</p>
                      <p className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">{data.email}</p>
                    </div>
                  </a>
                )}

                {/* Phone */}
                {data.phone && (
                  <a href={`tel:${data.phone}`} className="group flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center transition-all group-hover:border-purple-500/40">
                      <svg className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Call me</p>
                      <p className="text-lg text-white/80 group-hover:text-white transition-colors">{data.phone}</p>
                    </div>
                  </a>
                )}

                {/* Location */}
                {data.location && (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center">
                      <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Based in</p>
                      <p className="text-lg text-white/80">{data.location}</p>
                    </div>
                  </div>
                )}

                {/* Download CV */}
                {data.cvUrl ? (
                  <a
                    href={data.cvUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 mt-2"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, #693B93)` }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Get my resume</p>
                      <p className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">Download CV</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 mt-2 opacity-40 cursor-not-allowed">
                    <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center">
                      <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Resume</p>
                      <p className="text-lg text-white/60">CV Not Available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right - Social Links Card */}
              <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ background: primaryColor }} />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-20" style={{ background: "#3B82F6" }} />

                <div className="relative">
                  <h4 className="text-xl font-semibold text-white mb-2">Connect with me</h4>
                  <p className="text-white/40 text-sm mb-6">Find me on these platforms</p>

                  {socialLinks.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {socialLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all"
                        >
                          <div className="text-white/60 group-hover:text-white transition-colors">
                            {getSocialIcon(link.type)}
                          </div>
                          <span className="text-sm text-white/60 group-hover:text-white capitalize transition-colors">{link.type}</span>
                          <svg className="w-4 h-4 text-white/30 ml-auto group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Quick message hint */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/30 text-xs text-center">
                      Usually responds within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer - Redesigned */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, #693B93)` }}
                >
                  {data.fullName?.charAt(0) || "P"}
                </div>
                <div>
                  <p className="font-semibold text-white">{data.fullName}</p>
                  <p className="text-xs text-white/40">{data.title}</p>
                </div>
              </div>
              <p className="text-sm text-white/40 max-w-xs">
                {data.tagline || "Building digital experiences that make a difference."}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-white/60 uppercase tracking-wider">Quick Links</h5>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <a href="#hero" className="text-sm text-white/40 hover:text-white transition-colors">Home</a>
                {data.showExperience !== false && experience.length > 0 && (
                  <a href="#experience" className="text-sm text-white/40 hover:text-white transition-colors">Experience</a>
                )}
                {data.showSkills !== false && skills.length > 0 && (
                  <a href="#skills" className="text-sm text-white/40 hover:text-white transition-colors">Skills</a>
                )}
                {data.showProjects !== false && projects.length > 0 && (
                  <a href="#projects" className="text-sm text-white/40 hover:text-white transition-colors">Projects</a>
                )}
                <a href="#contact" className="text-sm text-white/40 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-white/60 uppercase tracking-wider">Follow Me</h5>
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-2">
                  {socialLinks.slice(0, 5).map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/40 hover:text-white hover:border-purple-500/40 transition-all"
                    >
                      {getSocialIcon(link.type)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/30">
              © {new Date().getFullYear()} {data.fullName}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/30">
              <span>Made with</span>
              <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>and</span>
              <span style={{ color: primaryColor }}>React</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
