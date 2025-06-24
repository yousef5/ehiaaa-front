"use client";

import { Bell, Heart, Share2, Users } from "lucide-react";
import Image from "next/image";

const SocialMedia = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/30 flex items-center justify-center relative overflow-hidden py-20">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-32 w-12 h-12 border-2 border-blue-400/30 rotate-45 animate-spin"></div>
        <div className="absolute top-64 right-48 w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-48 left-48 w-10 h-10 border-2 border-purple-400/30 animate-bounce delay-1400"></div>
        <div className="absolute bottom-32 right-32 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-400 transform rotate-45 animate-pulse delay-2100"></div>
      </div>

      <div className="relative z-10 w-full px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full mb-12 animate-bounce shadow-2xl">
            <Share2 className="h-16 w-16 text-white animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[8rem] font-black mb-12 leading-none">
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent animate-pulse mb-6">
              ابق على تواصل
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent animate-pulse delay-500">
              معنا دائماً
            </span>
          </h1>
          <p className="text-3xl md:text-5xl lg:text-6xl text-gray-700 dark:text-gray-300 max-w-6xl mx-auto font-black leading-tight">
            اشترك في قنواتنا لتستقبل الحالات الطارئة{" "}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent animate-pulse font-black">
              فوراً
            </span>
            <br />
            وكن أول من يساعد في إنقاذ الأرواح
          </p>
        </div>

        {/* Main Professional Card */}
        <div className="max-w-8xl mx-auto">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[4rem] shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-16 md:p-24 lg:p-32 relative overflow-hidden">
            {/* Card Premium Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              {/* Card Header */}
              <div className="text-center mb-20">
                <div className="flex items-center justify-center gap-8 mb-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                    <Heart className="h-12 w-12 text-white" />
                  </div>
                  <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                  <div className="w-6 h-6 bg-pink-500 rounded-full animate-pulse delay-400"></div>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse delay-600">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                </div>

                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-800 dark:text-slate-200 mb-8 leading-tight">
                  كل ثانية
                  <span className="block bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent animate-pulse">
                    مهمة
                  </span>
                </h2>
                <p className="text-3xl md:text-5xl lg:text-6xl text-slate-600 dark:text-slate-300 max-w-6xl mx-auto font-bold leading-relaxed">
                  انضم إلى آلاف المتبرعين الذين يستقبلون إشعارات فورية
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-black">
                    كن مستعداً دائماً
                  </span>
                </p>
              </div>

              {/* Enhanced Social Media Buttons */}
              <div className="grid md:grid-cols-2 gap-16 mb-20">
                {/* Telegram Button - Enhanced */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Telegram button clicked!");

                      const telegramAppUrl =
                        "tg://resolve?domain=ehiaaa_donation";
                      const telegramWebUrl = "https://t.me/ehiaaa_donation";

                      try {
                        window.location.href = telegramAppUrl;
                        setTimeout(() => {
                          window.open(
                            telegramWebUrl,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }, 1500);
                      } catch (error) {
                        console.log("Opening Telegram web version", error);
                        window.open(
                          telegramWebUrl,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }
                    }}
                    className="relative w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 text-white rounded-[3rem] p-12 md:p-16 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl shadow-2xl group border-4 border-blue-300/30"
                  >
                    <div className="flex flex-col items-center text-center space-y-8">
                      <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-3xl flex items-center justify-center shadow-2xl">
                          <Image
                            src="/telegram.svg"
                            alt="Telegram"
                            width={80}
                            height={80}
                            className="w-16 h-16 md:w-20 md:h-20 group-hover:rotate-12 transition-transform duration-500"
                          />
                        </div>
                        <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black">
                          تيليجرام
                        </h3>
                        <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-bold leading-relaxed">
                          استقبل إشعارات فورية لكل حالة طارئة
                          <br />
                          في منطقتك
                        </p>
                        <div className="flex items-center justify-center gap-4 bg-white/20 rounded-2xl px-6 py-4">
                          <Bell className="h-8 w-8" />
                          <span className="text-xl md:text-2xl font-bold">
                            إشعارات فورية
                          </span>
                          <span className="text-lg md:text-xl bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-black animate-pulse">
                            قريباً
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Facebook Button - Enhanced */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <a
                    href="https://www.facebook.com/profile.php?id=61577831872699"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-[3rem] p-12 md:p-16 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl shadow-2xl group border-4 border-blue-400/30"
                  >
                    <div className="flex flex-col items-center text-center space-y-8">
                      <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-3xl flex items-center justify-center shadow-2xl">
                          <Image
                            src="/facebook.svg"
                            alt="Facebook"
                            width={80}
                            height={80}
                            className="w-16 h-16 md:w-20 md:h-20 group-hover:rotate-12 transition-transform duration-500"
                          />
                        </div>
                        <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black">
                          فيسبوك
                        </h3>
                        <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-bold leading-relaxed">
                          تابع آخر الأخبار والحالات المستجدة
                          <br />
                          في مجتمع المتبرعين
                        </p>
                        <div className="flex items-center justify-center gap-4 bg-white/20 rounded-2xl px-6 py-4">
                          <Users className="h-8 w-8" />
                          <span className="text-xl md:text-2xl font-bold">
                            مجتمع المتبرعين
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Enhanced Call to Action */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/30 dark:via-orange-950/30 dark:to-yellow-950/30 rounded-[3rem] p-16 border-4 border-red-200/50 dark:border-red-800/50 shadow-2xl">
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-800 dark:text-slate-200 mb-12 leading-tight">
                    لماذا تحتاج
                    <span className="block bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent animate-pulse">
                      للاشتراك؟
                    </span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-12 text-slate-700 dark:text-slate-300">
                    <div className="flex items-start gap-6 group transform hover:scale-105 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl md:text-3xl font-black mb-4 text-red-600 dark:text-red-400">
                          إشعارات فورية
                          <span className="text-lg bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-black animate-pulse mr-3">
                            قريباً
                          </span>
                        </div>
                        <div className="text-xl md:text-2xl font-bold leading-relaxed">
                          تصلك الحالة في نفس اللحظة التي تحتاج فيها للمساعدة
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 group transform hover:scale-105 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse delay-200">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl md:text-3xl font-black mb-4 text-blue-600 dark:text-blue-400">
                          حسب موقعك
                        </div>
                        <div className="text-xl md:text-2xl font-bold leading-relaxed">
                          تستقبل فقط الحالات القريبة من منطقتك
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 group transform hover:scale-105 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse delay-400">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl md:text-3xl font-black mb-4 text-green-600 dark:text-green-400">
                          معلومات كاملة
                        </div>
                        <div className="text-xl md:text-2xl font-bold leading-relaxed">
                          تفاصيل الحالة والمستشفى وفصيلة الدم المطلوبة
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 group transform hover:scale-105 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse delay-600">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl md:text-3xl font-black mb-4 text-purple-600 dark:text-purple-400">
                          مجتمع داعم
                        </div>
                        <div className="text-xl md:text-2xl font-bold leading-relaxed">
                          انضم لآلاف المتبرعين الذين يساعدون في إنقاذ الأرواح
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
