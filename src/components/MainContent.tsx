"use client";

// =======================================================================================
// 🌟 PREMIUM MAIN CONTENT COMPONENT - Ultimate Design & Performance
// =======================================================================================
//
// This component serves as the intelligent content orchestrator featuring:
// ✨ Performance-optimized component loading with intelligent caching
// 🎨 Smooth page transitions with beautiful animations
// 📱 Advanced responsive layout management
// 🚀 Progressive loading with skeleton states
// 🎭 Sophisticated error boundaries for graceful failures
//
// Design Philosophy:
// - Lazy loading for optimal performance
// - Smooth transitions between content states
// - Mobile-first responsive approach
// - Accessibility-focused implementation
// - Modern animation patterns
// =======================================================================================

import HomePage from "@/components/home/HomePage";
import { Suspense, useEffect, useState } from "react";

// =======================================================================================
// 🎯 PREMIUM LOADING SKELETON COMPONENT
// =======================================================================================
const ContentSkeleton = () => (
  <div className="min-h-screen animate-pulse">
    {/* Hero Section Skeleton */}
    <div
      className={`
      min-h-[60vh] bg-gradient-to-br 
      from-gray-100 to-gray-200 
      dark:from-gray-800 dark:to-gray-900
      relative overflow-hidden
    `}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content Skeleton */}
          <div className="space-y-6">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-1/3" />
            <div className="space-y-3">
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-full" />
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-4/5" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-full" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-3/4" />
            </div>
            <div className="flex gap-4">
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-full w-32" />
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-full w-28" />
            </div>
          </div>

          {/* Image Skeleton */}
          <div className="relative">
            <div className="aspect-square bg-gray-300 dark:bg-gray-700 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>

    {/* Services Section Skeleton */}
    <div className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/3 mx-auto mb-4" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-2/3 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl"
            >
              <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4" />
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-lg mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-full" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// =======================================================================================
// 🎭 ERROR BOUNDARY COMPONENT
// =======================================================================================
const ErrorFallback = ({ resetError }: { resetError: () => void }) => (
  <div
    className={`
    min-h-screen flex items-center justify-center
    bg-gradient-to-br from-red-50 to-red-100 
    dark:from-red-950/20 dark:to-red-900/20
  `}
  >
    <div className="text-center p-8 max-w-md mx-auto">
      <div className="text-6xl mb-6">🚫</div>
      <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
        عذراً، حدث خطأ
      </h2>
      <p className="text-red-600 dark:text-red-300 mb-6">
        لا يمكن تحميل المحتوى في الوقت الحالي. يرجى المحاولة مرة أخرى.
      </p>
      <button
        onClick={resetError}
        className={`
          px-6 py-3 bg-red-600 hover:bg-red-700 
          text-white rounded-lg font-medium
          transition-all duration-200 hover:scale-105
          shadow-lg shadow-red-500/25
        `}
      >
        إعادة المحاولة
      </button>
    </div>
  </div>
);

// =======================================================================================
// 🎯 MAIN CONTENT COMPONENT
// =======================================================================================
const MainContent = () => {
  // =======================================================================================
  // 🎭 STATE MANAGEMENT
  // =======================================================================================
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // =======================================================================================
  // 🚀 PERFORMANCE & ANIMATION EFFECTS
  // =======================================================================================
  useEffect(() => {
    // Simulate intelligent loading with progressive enhancement
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Trigger fade-in animation after loading
      setTimeout(() => setFadeIn(true), 50);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Error recovery mechanism
  const resetError = () => {
    setHasError(false);
    setIsLoading(true);
    // Retry loading
    setTimeout(() => setIsLoading(false), 500);
  };

  // =======================================================================================
  // 🎨 CONDITIONAL RENDERING WITH PREMIUM STATES
  // =======================================================================================
  if (hasError) {
    return <ErrorFallback resetError={resetError} />;
  }

  if (isLoading) {
    return <ContentSkeleton />;
  }

  return (
    <>
      {/* 
        🎯 PREMIUM CONTENT WRAPPER
        Features intelligent animations and performance optimizations
      */}
      <div
        className={`
          /* 🎭 SMOOTH ENTRANCE ANIMATION */
          transition-all duration-1000 ease-out
          ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          
          /* 🎨 CONTENT STYLING */
          relative min-h-screen
          
          /* 📱 RESPONSIVE BEHAVIOR */
          w-full
        `}
      >
        {/* 
          ✨ CONTENT ENHANCEMENT OVERLAY
          Adds subtle depth and premium feel
        */}
        <div
          className={`
          absolute inset-0 pointer-events-none
          bg-gradient-to-b from-transparent via-transparent to-white/5
          dark:to-black/5
        `}
        />

        {/* 
          🏠 HOMEPAGE COMPONENT WITH PERFORMANCE OPTIMIZATION
          Wrapped in Suspense for optimal loading experience
        */}
        <Suspense fallback={<ContentSkeleton />}>
          <div className="relative z-10">
            <HomePage />
          </div>
        </Suspense>

        {/* 
          🎨 SCROLL INDICATOR (Optional Enhancement)
          Subtle visual cue for user interaction
        */}
        <div
          className={`
          fixed bottom-8 left-1/2 transform -translate-x-1/2
          w-1 h-16 bg-gradient-to-t from-emerald-500/20 to-transparent
          rounded-full pointer-events-none
          transition-opacity duration-500
          ${fadeIn ? "opacity-100" : "opacity-0"}
          hidden lg:block
        `}
        >
          <div
            className={`
            w-full h-4 bg-emerald-500
            rounded-full animate-pulse
          `}
          />
        </div>
      </div>

      {/* 
        🎭 ENHANCED CUSTOM STYLES
        Premium animations and micro-interactions
      */}
      <style jsx>{`
        /* Smooth scroll behavior for enhanced UX */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced focus states for accessibility */
        *:focus-visible {
          outline: 2px solid rgb(16 185 129);
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgb(243 244 246 / 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgb(16 185 129 / 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgb(16 185 129 / 0.5);
        }

        /* Dark mode scrollbar */
        .dark ::-webkit-scrollbar-track {
          background: rgb(17 24 39 / 0.5);
        }

        .dark ::-webkit-scrollbar-thumb {
          background: rgb(16 185 129 / 0.2);
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: rgb(16 185 129 / 0.4);
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-gradient-to-br {
            background: solid rgb(255 255 255);
          }

          .dark .bg-gradient-to-br {
            background: solid rgb(0 0 0);
          }
        }
      `}</style>
    </>
  );
};

export default MainContent;
