"use client";

import { ChevronDown, Heart, Sparkles, Star, Users } from "lucide-react";
import Image from "next/image";

const Hero = () => {


  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20">
      {/* Simple Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Simple Container */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Content Section */}
          <div
            className={`space-y-8 text-center lg:text-right transition-all duration-1000 transform 
            
            `}
          >
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-full border border-emerald-200 dark:border-emerald-700 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                منصة إحياء للتبرع بالدم
              </span>
            </div>

            {/* Islamic Introduction + Quranic Verse */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-emerald-200/50 dark:border-emerald-700/50 shadow-xl">
              {/* Stars Decoration */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Bismillah */}
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </h2>
              </div>

              {/* Quranic Verse */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6">
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent font-extrabold mb-2">
                  &quot;وَمَنْ أَحْيَاهَا
                </span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-extrabold">
                  كَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا&quot;
                </span>
              </h1>

              {/* Sadaqa Allah Al-Azeem */}
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                  صَدَقَ اللَّهُ الْعَظِيمُ
                </h3>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                  من أنقذ حياة إنسان واحد، فكأنما أنقذ البشرية جمعاء
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                انضم إلى مجتمع المتبرعين الأبطال وكن جزءًا من منظومة إنقاذ
                الأرواح
              </p>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">
                  منصة{" "}
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    &quot;إحياء&quot;
                  </span>
                  تربط المتبرعين بالحالات الطارئة في الوقت الفعلي، لتسهيل عملية
                  التبرع وإنقاذ الأرواح بشكل سريع وآمن
                </p>
              </div>
            </div>

            {/* Social Media Broadcast Info */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-4">
                إشعارات فورية عبر:
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-800/70 p-3 rounded-xl">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Image
                      src="/telegram.svg"
                      alt="Telegram"
                      width={20}
                      height={20}
                      className="w-5 h-5 filter invert"
                    />
                  </div>
                  <span className="font-medium text-blue-700 dark:text-blue-300 text-sm">
                    تليجرام
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-800/70 p-3 rounded-xl">
                  <div className="bg-blue-600 p-2 rounded-full">
                    <Image
                      src="/facebook.svg"
                      alt="Facebook"
                      width={20}
                      height={20}
                      className="w-5 h-5 filter invert"
                    />
                  </div>
                  <span className="font-medium text-blue-700 dark:text-blue-300 text-sm">
                    فيسبوك
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div
            className={`relative transition-all duration-1000 delay-300 transform 
      
            `}
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-full h-[600px] lg:h-[920px] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-blue-500/10 z-10"></div>

                <Image
                  src="/hero3.png"
                  alt="إحياء - منصة التبرع بالدم"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-2xl shadow-lg animate-bounce">
                <Heart className="w-6 h-6 text-white" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl shadow-lg animate-bounce delay-1000">
                <Users className="w-6 h-6 text-white" />
              </div>

              {/* Quote Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-4 border border-emerald-200 dark:border-emerald-700">
                <p className="text-emerald-700 dark:text-emerald-300 font-semibold text-center">
                  &quot;كن السبب في إنقاذ حياة اليوم&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-emerald-600 dark:text-emerald-400 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full p-2 border border-emerald-300 dark:border-emerald-600">
              <ChevronDown className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">استكشف المزيد</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
