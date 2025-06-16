"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Plus,
  ArrowRight,
  Heart,
  Bell,
  Shield,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Define avatar images array
const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
];

const Hero = () => {
  // Animation for features cycling
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [typedSecondary, setTypedSecondary] = useState("");
  const [isFirstLineDone, setIsFirstLineDone] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const firstText = "تبرع بالدم،";
  const secondText = "أنقذ حياة";
  const typingSpeedMs = 100;

  const features = [
    "تسجيل بياناتك وفصيلة الدم الخاصة بك",
    "استلام إشعارات فورية بالحالات القريبة",
    "متابعة الحملات والمبادرات المجتمعية",
    "التواصل مع الفرق الطبية بطريقة مباشرة",
  ];

  const featureIcons = [
    <Shield key="shield" className="h-5 w-5 text-emerald-500" />,
    <Bell key="bell" className="h-5 w-5 text-emerald-500" />,
    <Heart key="heart" className="h-5 w-5 text-emerald-500" />,
    <MessageCircle key="message" className="h-5 w-5 text-emerald-500" />,
  ];

  // Cursor blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  // First line typing animation
  useEffect(() => {
    if (typedText.length < firstText.length) {
      const timeout = setTimeout(() => {
        setTypedText(firstText.slice(0, typedText.length + 1));
      }, typingSpeedMs);

      return () => clearTimeout(timeout);
    } else if (!isFirstLineDone) {
      setIsFirstLineDone(true);
    }
  }, [typedText, isFirstLineDone]);

  // Second line typing animation, starts after first line is done
  useEffect(() => {
    if (isFirstLineDone && typedSecondary.length < secondText.length) {
      const timeout = setTimeout(() => {
        setTypedSecondary(secondText.slice(0, typedSecondary.length + 1));
      }, typingSpeedMs);

      return () => clearTimeout(timeout);
    }
  }, [typedSecondary, isFirstLineDone]);

  // Features cycling animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
          {/* Text Content */}
          <div className="md:w-1/2 text-right space-y-8 md:pr-8">
            <div className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-2">
              مبادرة تبرع بالدم
            </div>
            {/* Animated heading with typing effect */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-800 dark:text-emerald-400 leading-tight min-h-[140px] md:min-h-[160px]">
              <div className="flex items-center h-[60px] md:h-[80px]">
                <span>{typedText}</span>
                {typedText.length < firstText.length && (
                  <span
                    className={`inline-block w-[4px] h-[50px] md:h-[60px] bg-emerald-600 dark:bg-emerald-400 ml-1 ${
                      isCursorVisible ? "opacity-100" : "opacity-0"
                    }`}
                  ></span>
                )}
              </div>
              <div className="flex items-center h-[60px] md:h-[80px]">
                <span className="text-yellow-500">{typedSecondary}</span>
                {isFirstLineDone &&
                  typedSecondary.length < secondText.length && (
                    <span
                      className={`inline-block w-[4px] h-[50px] md:h-[60px] bg-yellow-500 ml-1 ${
                        isCursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                  )}
              </div>
            </h1>

            {/* Creative animated description with highlight box */}
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-md backdrop-blur-sm">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  تطبيق &quot;إحياء&quot;
                </span>{" "}
                هو منصة رقمية متكاملة تهدف إلى تسهيل عملية التبرع بالدم من خلال
                ربط المتبرعين بالحالات الحرجة التي تحتاج إلى نقل دم بشكل عاجل،
                وذلك بطريقة ذكية وآمنة.
              </p>

              {/* Animated Feature Display */}
              <div className="mt-4 h-10 flex items-center justify-start overflow-hidden">
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-lg">
                  {featureIcons[currentFeatureIndex]}
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                    {features[currentFeatureIndex]}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-gray-600 dark:text-gray-400">
                هدفنا في &quot;إحياء&quot; هو أن نخلق شبكة دعم حقيقية تنقذ أرواح
                الناس بقطرات دم بسيطة، لكنها ثمينة.
              </p>
            </div>

            <div className="flex justify-start gap-4 pt-2">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:shadow-xl flex items-center gap-2"
              >
                تبرع الآن
                <ArrowRight className="h-5 w-5 mr-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400 px-8 py-6 text-lg rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
              >
                تعرّف علينا
              </Button>
            </div>
            <div className="flex items-center gap-5 pt-2">
              {/* Enhanced Avatar Group */}
              <div className="flex items-center">
                <div className="flex -space-x-5 rtl:space-x-reverse">
                  {avatars.map((avatar, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden relative shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                      style={{ zIndex: 10 - index }}
                    >
                      <Image
                        src={avatar}
                        alt={`متبرع ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div
                    className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-md relative hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors duration-200"
                    style={{ zIndex: 6 }}
                  >
                    <span className="text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center">
                      <Plus size={14} className="mr-0.5" />
                      <span>996</span>
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                انضم إلى{" "}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  +5,000
                </span>{" "}
                متبرع اليوم
              </p>
            </div>
          </div>

          {/* Image Container */}
          <div className="md:w-1/2 relative">
            <div className="relative w-full h-[500px] md:h-[calc(100vh-200px)] overflow-hidden rounded-3xl">
              <Image
                src="/hero.svg"
                alt="تبرع بالدم"
                fill
                className="object-fill z-10"
                priority
              />
              {/* Adaptive overlay - black in dark mode, white in light mode */}
              <div className="absolute inset-0 bg-white/20 dark:bg-black/30 rounded-3xl z-20"></div>
              {/* <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-yellow-500/10 rounded-3xl z-0"></div> */}
            </div>
            {/* Decoration Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-30 z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 z-0"></div>

            {/* Creative "Be the reason" badge */}
            <div className="absolute -bottom-5 right-10 bg-white dark:bg-gray-800 shadow-lg rounded-full py-2 px-5 z-30 border-2 border-emerald-500">
              <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                كن أنت سبب الحياة لشخص آخر
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button className="flex flex-col items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
            <span className="text-sm font-medium">استكشف المزيد</span>
            <ChevronRight className="animate-bounce h-6 w-6 rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
