"use client";

// =======================================================================================
// 🌟 MAIN PAGE COMPONENT - Ultimate Design with Best Practices
// =======================================================================================
//
// This is the main page component featuring:
// ✨ Premium dark/light mode theming with smooth transitions
// 🎨 Advanced gradient backgrounds and dynamic visual effects
// 📱 Fully responsive design for all screen sizes
// 🚀 Performance optimized with Next.js best practices
// 🎭 Sophisticated animation and micro-interactions
//
// Design Philosophy:
// - Mobile-first responsive approach
// - Accessibility-focused implementation
// - Performance-optimized rendering
// - Modern glass-morphism and neumorphism effects
// - Seamless dark/light mode transitions
// =======================================================================================

import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import { Suspense } from "react";

// Loading component for better UX during content loading
const PageSkeleton = () => (
  <div className="animate-pulse min-h-screen">
    {/* Header skeleton */}
    <div className="h-16 bg-gray-200 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" />
    {/* Content skeleton */}
    <div className="space-y-6 p-6">
      <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"
          />
        ))}
      </div>
    </div>
  </div>
);

// =======================================================================================
// 🎯 MAIN PAGE COMPONENT
// =======================================================================================
export default function HomePage() {
  return (
    <>
      {/* 
        🎨 PREMIUM CONTAINER WITH ADVANCED STYLING
        Features:
        - Dynamic gradient backgrounds that adapt to theme
        - Glass-morphism effects for modern aesthetics
        - Smooth transitions between light/dark modes
        - RTL support for Arabic content
        - Optimized for performance and accessibility
      */}
      <div
        className={`
          flex flex-col min-h-screen
          
          /* 🌟 DYNAMIC GRADIENT BACKGROUNDS */
          bg-gradient-to-br 
          from-slate-50 via-blue-50 to-indigo-100
          dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950
          
          /* 🎭 SMOOTH THEME TRANSITIONS */
          transition-all duration-700 ease-in-out
          
          /* 📱 RTL SUPPORT FOR ARABIC */
          dir-rtl
          
          /* 🎨 ADVANCED VISUAL EFFECTS */
          relative overflow-hidden
        `}
        dir="rtl"
      >
        {/* 
          ✨ ANIMATED BACKGROUND ELEMENTS
          Subtle animated backgrounds for premium feel
        */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating gradient orbs */}
          <div
            className={`
            absolute -top-40 -right-40 w-80 h-80 
            bg-gradient-to-br from-emerald-400/20 to-blue-400/20
            dark:from-emerald-600/10 dark:to-blue-600/10
            rounded-full blur-3xl 
            animate-pulse duration-[4000ms]
          `}
          />

          <div
            className={`
            absolute top-1/2 -left-40 w-96 h-96 
            bg-gradient-to-br from-yellow-400/15 to-orange-400/15
            dark:from-yellow-600/8 dark:to-orange-600/8
            rounded-full blur-3xl 
            animate-pulse duration-[6000ms]
            animation-delay-2000
          `}
          />

          <div
            className={`
            absolute bottom-20 right-1/3 w-64 h-64 
            bg-gradient-to-br from-purple-400/10 to-pink-400/10
            dark:from-purple-600/5 dark:to-pink-600/5
            rounded-full blur-3xl 
            animate-pulse duration-[5000ms]
            animation-delay-4000
          `}
          />
        </div>

        {/* 
          🎯 GLASS MORPHISM OVERLAY
          Adds depth and modern glass effect
        */}
        <div
          className={`
          absolute inset-0 
          bg-white/5 dark:bg-black/5
          backdrop-blur-[0.5px]
          pointer-events-none
        `}
        />

        {/* 
          🧩 HEADER COMPONENT
          Premium header with enhanced navigation and theming
        */}
        <Suspense
          fallback={
            <div className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 animate-pulse" />
          }
        >
          <Header />
        </Suspense>

        {/* 
          🎨 MAIN CONTENT WRAPPER
          Enhanced container with premium styling and effects
        */}
        <div
          className={`
          flex-1 relative z-10
          
          /* 🎭 CONTENT TRANSITIONS */
          transition-all duration-500 ease-out
          
          /* 📱 RESPONSIVE PADDING */
          min-h-[calc(100vh-4rem)]
        `}
        >
          <Suspense fallback={<PageSkeleton />}>
            <MainContent />
          </Suspense>
        </div>

        {/* 
          ✨ BOTTOM GRADIENT FADE
          Subtle gradient at bottom for premium finish
        */}
        <div
          className={`
          absolute bottom-0 left-0 right-0 h-32
          bg-gradient-to-t 
          from-slate-100/50 to-transparent
          dark:from-gray-900/50 dark:to-transparent
          pointer-events-none
        `}
        />
      </div>

      {/* 
        🎯 CUSTOM STYLES FOR ENHANCED ANIMATIONS
        Advanced CSS animations and effects
      */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Smooth scrolling for better UX */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced focus states for accessibility */
        *:focus {
          outline: 2px solid theme("colors.emerald.500");
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}
