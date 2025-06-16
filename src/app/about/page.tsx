"use client";

// =======================================================================================
// 🌟 ULTIMATE ABOUT PAGE - Revolutionary Design & Premium Experience
// =======================================================================================
//
// This is the most advanced about page featuring:
// ✨ Fixed header/footer layout with intelligent spacing
// 🎨 Immersive storytelling with parallax effects
// 📱 Ultra-responsive design with premium animations
// 🚀 Performance-optimized with intersection observers
// 🎭 Cinematic visual experience with dynamic elements
//
// Design Philosophy:
// - Cinematic storytelling approach
// - Fixed navigation for seamless UX
// - Immersive visual journey
// - Premium micro-interactions
// - Accessibility-first implementation
// =======================================================================================

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Heart,
  Shield,
  Target,
  Eye,
  Calendar,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  Play,
  Quote,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

// =======================================================================================
// 🎯 PREMIUM STATS DATA
// =======================================================================================
const statsData = [
  {
    icon: Users,
    value: "20,000+",
    label: "متبرع نشط",
    description: "متبرعين ملتزمين بإنقاذ الأرواح",
  },
  {
    icon: Heart,
    value: "50,000+",
    label: "وحدة دم تم جمعها",
    description: "وحدات دم نقية وآمنة",
  },
  {
    icon: Award,
    value: "500+",
    label: "حملة تبرع",
    description: "حملات ناجحة في جميع أنحاء المملكة",
  },
  {
    icon: TrendingUp,
    value: "99%",
    label: "معدل الأمان",
    description: "أعلى معايير السلامة والجودة",
  },
];

// =======================================================================================
// 🎭 VALUES & MISSION DATA
// =======================================================================================
const valuesData = [
  {
    icon: Heart,
    title: "الإنسانية",
    description: "نضع كرامة الإنسان وصحته فوق كل اعتبار، ونؤمن بقيمة كل حياة",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "الأمان",
    description: "نلتزم بأعلى معايير السلامة في جمع ونقل وتخزين الدم",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Eye,
    title: "الشفافية",
    description: "نعمل بشفافية كاملة مع المتبرعين والمستفيدين",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Users,
    title: "التطوع",
    description: "نشجع روح التطوع والعطاء في المجتمع",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Sparkles,
    title: "الابتكار",
    description: "نسعى دوما لتحسين خدماتنا وإيجاد حلول مبتكرة",
    color: "from-amber-500 to-orange-500",
  },
];

// =======================================================================================
// 🎯 SCROLL ANIMATION HOOK
// =======================================================================================
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
};

// =======================================================================================
// 🎭 INTERSECTION OBSERVER HOOK
// =======================================================================================
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [elementRef, isVisible] as const;
};

// =======================================================================================
// 🎯 MAIN ABOUT PAGE COMPONENT
// =======================================================================================
export default function AboutPage() {
  const scrollY = useScrollAnimation();
  const [heroRef, heroVisible] = useIntersectionObserver(0.2);
  const [missionRef, missionVisible] = useIntersectionObserver(0.3);
  const [valuesRef, valuesVisible] = useIntersectionObserver(0.2);
  const [statsRef, statsVisible] = useIntersectionObserver(0.3);
  const [storyRef, storyVisible] = useIntersectionObserver(0.3);

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* 
        🏢 SHARED HEADER COMPONENT
        Using the centralized Header component
      */}
      <Header />

      {/* 
        🎨 IMMERSIVE MAIN CONTENT
        Cinematic experience with parallax and animations
      */}
      <main className="flex-1 pt-20">
        {/* 
          🌟 HERO SECTION - CINEMATIC INTRODUCTION
        */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex items-center overflow-hidden"
        >
          {/* Dynamic Background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-emerald-950/20 dark:to-indigo-950/20"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-32 h-32 rounded-full opacity-10
                  bg-gradient-to-br from-emerald-400 to-blue-400
                  animate-pulse
                `}
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`,
                  animationDelay: `${i * 1000}ms`,
                  animationDuration: `${3000 + i * 1000}ms`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div
                className={`
                transition-all duration-1000 delay-300
                ${
                  heroVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }
              `}
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-full mb-8">
                  <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                    مبادرة رائدة في التبرع بالدم
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                  <span className="text-emerald-600 dark:text-emerald-400">
                    من
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 mr-4">
                    نحن
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                  مبادرة{" "}
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    احياء تبرع بالدم
                  </span>{" "}
                  هي منظمة غير ربحية تهدف إلى تشجيع التبرع بالدم وإنقاذ الأرواح
                  في جميع أنحاء المملكة
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    className={`
                    bg-gradient-to-r from-emerald-600 to-emerald-700
                    hover:from-emerald-700 hover:to-emerald-800
                    text-white px-8 py-6 text-lg rounded-full
                    shadow-xl shadow-emerald-500/30 hover:shadow-2xl
                    transition-all duration-300 hover:scale-105
                  `}
                  >
                    <Heart className="h-5 w-5 ml-2" />
                    ابدأ التبرع الآن
                  </Button>

                  <Button
                    variant="outline"
                    className={`
                    border-2 border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400
                    px-8 py-6 text-lg rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/50
                    transition-all duration-300 hover:scale-105
                  `}
                  >
                    <Play className="h-5 w-5 ml-2" />
                    شاهد قصتنا
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 
          📊 PREMIUM STATS SECTION
        */}
        <section ref={statsRef} className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {statsData.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className={`
                      text-center p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
                      shadow-xl shadow-black/5 dark:shadow-black/20
                      border border-gray-200/50 dark:border-gray-700/50
                      transition-all duration-700 hover:scale-105
                      ${
                        statsVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }
                    `}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      {stat.value}
                    </h3>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {stat.label}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 
          🎯 MISSION & VISION SECTION
        */}
        <section ref={missionRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div
                  className={`
                  transition-all duration-1000
                  ${
                    missionVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-12"
                  }
                `}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                      رسالتنا
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                    تهدف مبادرة احياء تبرع بالدم إلى زيادة الوعي بأهمية التبرع
                    بالدم وتوفير إمدادات آمنة ومستدامة من الدم للمستشفيات
                    والمراكز الطبية في جميع أنحاء المملكة. نسعى لبناء جسر من
                    الأمل والحياة.
                  </p>

                  <div className="flex items-center gap-3 mb-6">
                    <Eye className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                      رؤيتنا
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    نطمح إلى بناء مجتمع واعٍ ومسؤول يشارك بانتظام في التبرع
                    بالدم، وتوفير الدم الكافي لتلبية احتياجات جميع المرضى، وأن
                    نكون المرجع الأول في مجال التبرع بالدم في المملكة.
                  </p>
                </div>

                <div
                  className={`
                  relative transition-all duration-1000 delay-300
                  ${
                    missionVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-12"
                  }
                `}
                >
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 z-10" />
                    <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30" />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="text-center">
                        <Heart className="h-24 w-24 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                        <p className="text-emerald-800 dark:text-emerald-200 font-semibold text-xl">
                          قطرة دم = حياة جديدة
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 
          💎 VALUES SECTION - PREMIUM CARDS
        */}
        <section ref={valuesRef} className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900/50" />

          <div className="container mx-auto px-4 relative z-10">
            <div
              className={`
              text-center mb-16 transition-all duration-1000
              ${
                valuesVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }
            `}
            >
              <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                قيمنا الأساسية
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                المبادئ التي توجه عملنا وتدفعنا نحو تحقيق رسالتنا السامية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valuesData.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className={`
                      group relative p-8 rounded-2xl bg-white dark:bg-gray-800
                      shadow-xl shadow-black/5 dark:shadow-black/20
                      border border-gray-200/50 dark:border-gray-700/50
                      transition-all duration-700 hover:scale-105 hover:-translate-y-2
                      ${
                        valuesVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-12"
                      }
                    `}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`
                      w-16 h-16 mb-6 rounded-full flex items-center justify-center
                      bg-gradient-to-br ${value.color} shadow-lg
                      group-hover:scale-110 transition-transform duration-300
                    `}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>

                    {/* Hover Effect */}
                    <div
                      className={`
                      absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                      bg-gradient-to-br ${value.color} transition-opacity duration-300
                      mix-blend-multiply dark:mix-blend-screen
                    `}
                      style={{ opacity: 0.05 }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 
          📖 OUR STORY SECTION
        */}
        <section ref={storyRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div
                className={`
                text-center mb-16 transition-all duration-1000
                ${
                  storyVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Calendar className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200">
                    قصتنا
                  </h2>
                </div>
              </div>

              <div
                className={`
                relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-50 to-blue-50 
                dark:from-emerald-950/20 dark:to-blue-950/20 shadow-2xl
                transition-all duration-1000 delay-300
                ${
                  storyVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }
              `}
              >
                <Quote className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mb-6" />

                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  تأسست مبادرة احياء تبرع بالدم في عام{" "}
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    2020
                  </span>{" "}
                  استجابة للحاجة المتزايدة للدم خلال جائحة كورونا. منذ ذلك
                  الحين، قمنا بتنظيم أكثر من{" "}
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    500 حملة
                  </span>{" "}
                  للتبرع بالدم في مختلف مناطق المملكة، وجمع أكثر من{" "}
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    20,000 وحدة دم
                  </span>{" "}
                  ساهمت في إنقاذ آلاف الأرواح.
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full" />
                  <div>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-300 text-lg">
                      &ldquo;كل قطرة دم تُتبرع بها هي قطرة أمل لمن ينتظر فرصة
                      جديدة للحياة&rdquo;
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      - فريق مبادرة احياء تبرع بالدم
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 
          🚀 CALL TO ACTION SECTION
        */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              انضم إلى رحلة الإحياء
            </h2>
            <p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto">
              كن جزءاً من مبادرة نبيلة تهدف لإنقاذ الأرواح وبناء مجتمع أكثر
              إنسانية
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                className={`
                bg-white text-emerald-700 hover:bg-gray-50
                px-8 py-6 text-lg rounded-full font-semibold
                shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105
              `}
              >
                <Heart className="h-5 w-5 ml-2" />
                <Link href="/donate">ابدأ التبرع الآن</Link>
              </Button>

              <Button
                variant="outline"
                className={`
                border-2 border-white text-white hover:bg-white hover:text-emerald-700
                px-8 py-6 text-lg rounded-full font-semibold
                transition-all duration-300 hover:scale-105
              `}
              >
                <Users className="h-5 w-5 ml-2" />
                <Link href="/volunteer">انضم كمتطوع</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* 
        🦶 PREMIUM FIXED FOOTER
        Elegant footer with comprehensive information
      */}
      <footer
        className={`
        border-t border-gray-200/50 dark:border-gray-700/50
        bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950
        relative z-40
      `}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <img
                  src="/logo.png"
                  alt="احياء تبرع بالدم"
                  className="h-6 w-6 rounded"
                />
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                  احياء تبرع بالدم
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                معاً لإنقاذ الأرواح وبناء مجتمع أكثر تضامناً
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                روابط سريعة
              </h4>
              <div className="space-y-2">
                {[
                  { href: "/", label: "الرئيسية" },
                  { href: "/donate", label: "تبرع الآن" },
                  { href: "/contact", label: "اتصل بنا" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                تواصل معنا
              </h4>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p>البريد: info@ehiaaa.org</p>
                <p>الهاتف: 966+ 12 345 6789</p>
                <p>الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300/50 dark:border-gray-600/50 mt-12 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} احياء تبرع بالدم. جميع الحقوق
              محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
