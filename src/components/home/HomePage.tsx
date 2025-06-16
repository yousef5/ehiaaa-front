"use client";

// =======================================================================================
// 🌟 PREMIUM HOME PAGE COMPONENT - Ultimate Architecture & Design
// =======================================================================================
//
// This is the core homepage orchestrator featuring:
// ✨ Intelligent component composition with dynamic loading
// 🎨 Premium section transitions with smooth animations
// 📱 Advanced responsive layout management across all sections
// 🚀 Performance-optimized rendering with intersection observers
// 🎭 Sophisticated theming system with seamless dark/light transitions
//
// Architecture Principles:
// - Modular component composition for maximum maintainability
// - Progressive enhancement for optimal performance
// - Accessibility-first design approach
// - Mobile-first responsive implementation
// - Modern animation patterns with reduced motion support
// =======================================================================================

import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Benefits from "@/components/home/Benefits";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import { useEffect, useState, useRef } from "react";

// =======================================================================================
// 🎯 SECTION CONFIGURATION
// =======================================================================================
const sections = [
  {
    id: "hero",
    component: Hero,
    name: "البطل",
    delay: 0,
    priority: "high",
  },
  {
    id: "services",
    component: Services,
    name: "الخدمات",
    delay: 200,
    priority: "medium",
  },
  {
    id: "benefits",
    component: Benefits,
    name: "الفوائد",
    delay: 400,
    priority: "medium",
  },
  {
    id: "cta",
    component: CTA,
    name: "دعوة للعمل",
    delay: 600,
    priority: "low",
  },
];

// =======================================================================================
// 🎯 SECTION WRAPPER COMPONENT
// =======================================================================================
interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  delay: number;
  priority: "high" | "medium" | "low";
  name: string;
}

const SectionWrapper = ({
  id,
  children,
  delay,
  priority,
  name,
}: SectionWrapperProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            const timer = setTimeout(() => {
              setHasAnimated(true);
            }, delay);
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, hasAnimated]);

  // Priority-based loading
  const getPriorityClasses = () => {
    switch (priority) {
      case "high":
        return "transform transition-all duration-700 ease-out";
      case "medium":
        return "transform transition-all duration-1000 ease-out";
      case "low":
        return "transform transition-all duration-1200 ease-out";
      default:
        return "transform transition-all duration-700 ease-out";
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`
        ${getPriorityClasses()}
        ${
          hasAnimated
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }
        relative
      `}
      aria-label={`قسم ${name}`}
      data-section={id}
      data-priority={priority}
    >
      {/* Section enhancement overlay */}
      <div
        className={`
        absolute inset-0 pointer-events-none
        bg-gradient-to-b from-transparent via-transparent 
        ${
          priority === "high"
            ? "to-white/2 dark:to-black/2"
            : "to-white/1 dark:to-black/1"
        }
        transition-opacity duration-500
        ${hasAnimated ? "opacity-100" : "opacity-0"}
      `}
      />

      {/* Section content */}
      <div className="relative z-10">{children}</div>

      {/* Performance indicator for development */}
      {process.env.NODE_ENV === "development" && (
        <div
          className={`
          fixed top-4 right-4 z-50 px-2 py-1 
          bg-emerald-500/20 text-emerald-700 dark:text-emerald-300
          text-xs rounded backdrop-blur-sm
          ${hasAnimated ? "block" : "hidden"}
        `}
        >
          {name} ✓
        </div>
      )}
    </section>
  );
};

// =======================================================================================
// 🎯 MAIN HOMEPAGE COMPONENT
// =======================================================================================
const HomePage = () => {
  // =======================================================================================
  // 🎭 STATE MANAGEMENT
  // =======================================================================================
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  // =======================================================================================
  // 🚀 PERFORMANCE & SCROLL EFFECTS
  // =======================================================================================
  useEffect(() => {
    // Mark page as loaded for progressive enhancement
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Advanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);

      setScrollProgress(progress);

      // Update current section based on scroll position
      const sections = document.querySelectorAll("[data-section]");
      let current = "hero";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          current = section.getAttribute("data-section") || "hero";
        }
      });

      setCurrentSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 
        🎯 PREMIUM PAGE CONTAINER
        Features comprehensive layout management and performance optimization
      */}
      <div
        className={`
          /* 🎭 PAGE TRANSITION */
          transition-all duration-1000 ease-out
          ${isPageLoaded ? "opacity-100" : "opacity-0"}
          
          /* 🎨 LAYOUT STRUCTURE */
          min-h-screen relative
          
          /* 📱 RESPONSIVE BEHAVIOR */
          w-full overflow-x-hidden
        `}
        role="main"
        aria-label="الصفحة الرئيسية لموقع احياء تبرع بالدم"
      >
        {/* 
          ✨ DYNAMIC BACKGROUND ENHANCEMENT
          Subtle background effects that respond to scroll
        */}
        <div
          className={`
            fixed inset-0 pointer-events-none
            bg-gradient-to-b from-transparent 
            ${
              scrollProgress > 0.5
                ? "via-emerald-50/10 dark:via-emerald-950/10"
                : "via-transparent"
            }
            to-transparent
            transition-all duration-1000 ease-out
          `}
          style={{
            opacity: Math.min(scrollProgress * 2, 0.3),
          }}
        />

        {/* 
          🏠 HERO SECTION - PREMIUM ENTRY POINT
          High-priority loading with enhanced visual impact
        */}
        <SectionWrapper id="hero" delay={0} priority="high" name="البطل">
          <Hero />
        </SectionWrapper>

        {/* 
          🎨 MAIN CONTENT CONTAINER
          Optimized content flow with intelligent section management
        */}
        <main
          className={`
            relative
            bg-gradient-to-b from-transparent 
            via-white/50 dark:via-gray-950/50 
            to-transparent
            transition-all duration-700 ease-out
          `}
          aria-label="المحتوى الرئيسي"
        >
          {/* Services Section */}
          <SectionWrapper
            id="services"
            delay={200}
            priority="medium"
            name="الخدمات"
          >
            <Services />
          </SectionWrapper>

          {/* Benefits Section */}
          <SectionWrapper
            id="benefits"
            delay={400}
            priority="medium"
            name="الفوائد"
          >
            <Benefits />
          </SectionWrapper>

          {/* Call to Action Section */}
          <SectionWrapper id="cta" delay={600} priority="low" name="دعوة للعمل">
            <CTA />
          </SectionWrapper>
        </main>

        {/* 
          🦶 FOOTER SECTION
          Final section with comprehensive information
        */}
        <SectionWrapper id="footer" delay={800} priority="low" name="التذييل">
          <Footer />
        </SectionWrapper>

        {/* 
          📊 SCROLL PROGRESS INDICATOR
          Premium visual feedback for user navigation
        */}
        <div
          className={`
            fixed top-0 left-0 h-1 z-50
            bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700
            shadow-lg shadow-emerald-500/30
            transition-all duration-300 ease-out
            ${isPageLoaded ? "opacity-100" : "opacity-0"}
          `}
          style={{
            width: `${scrollProgress * 100}%`,
            boxShadow: `0 0 20px ${
              scrollProgress > 0.1 ? "rgba(16, 185, 129, 0.4)" : "transparent"
            }`,
          }}
          aria-hidden="true"
        />

        {/* 
          🧭 FLOATING NAVIGATION INDICATOR
          Elegant section navigation for large screens
        */}
        <div
          className={`
            fixed left-8 top-1/2 transform -translate-y-1/2 z-40
            hidden xl:flex flex-col gap-3
            transition-all duration-500 ease-out
            ${
              isPageLoaded && scrollProgress > 0.1
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }
          `}
          aria-label="مؤشر التنقل بين الأقسام"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`
                w-3 h-3 rounded-full transition-all duration-300 ease-out
                hover:scale-125 focus:scale-125 focus:outline-none
                ${
                  currentSection === section.id
                    ? "bg-emerald-500 shadow-lg shadow-emerald-500/40 scale-110"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-emerald-400 dark:hover:bg-emerald-500"
                }
              `}
              aria-label={`الانتقال إلى قسم ${section.name}`}
              title={section.name}
            />
          ))}
        </div>
      </div>

      {/* 
        🎭 ENHANCED CUSTOM STYLES
        Advanced animations and performance optimizations
      */}
      <style jsx>{`
        /* Smooth scrolling with reduced motion support */
        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Enhanced focus management */
        *:focus-visible {
          outline: 2px solid rgb(16 185 129);
          outline-offset: 3px;
          border-radius: 6px;
        }

        /* Performance optimizations */
        * {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgb(243 244 246 / 0.3);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgb(16 185 129 / 0.4),
            rgb(16 185 129 / 0.6)
          );
          border-radius: 5px;
          border: 1px solid rgb(243 244 246 / 0.3);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgb(16 185 129 / 0.6),
            rgb(16 185 129 / 0.8)
          );
        }

        /* Dark mode scrollbar */
        .dark ::-webkit-scrollbar-track {
          background: rgb(17 24 39 / 0.3);
        }

        .dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgb(16 185 129 / 0.3),
            rgb(16 185 129 / 0.5)
          );
          border: 1px solid rgb(17 24 39 / 0.3);
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgb(16 185 129 / 0.5),
            rgb(16 185 129 / 0.7)
          );
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-gradient-to-b,
          .bg-gradient-to-r {
            background: solid;
          }

          .backdrop-blur-sm,
          .backdrop-blur-md,
          .backdrop-blur-xl {
            backdrop-filter: none;
          }
        }
      `}</style>
    </>
  );
};

export default HomePage;
