"use client";

import { Bell, Heart, Share2, Users } from "lucide-react";
import Image from "next/image";

const SocialMedia = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-purple-950/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-8 shadow-2xl">
            <Share2 className="h-10 w-10 text-white animate-pulse" />
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            ابق على تواصل معنا
          </h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            اشترك في قنواتنا لتستقبل الحالات الطارئة{" "}
            <span className="text-red-600 dark:text-red-400 font-bold">
              فوراً
            </span>{" "}
            وكن أول من يساعد في إنقاذ الأرواح
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-8 md:p-12 relative overflow-hidden">
            {/* Card Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              {/* Card Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-red-600 dark:text-red-400 animate-pulse" />
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-400"></div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-pulse" />
                  </div>
                </div>

                <h3 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  كل ثانية مهمة... كن مستعداً دائماً
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  انضم إلى آلاف المتبرعين الذين يستقبلون إشعارات فورية عند ورود
                  حالات طارئة تحتاج للدم في منطقتهم
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    15,000+
                  </div>
                  <div className="text-blue-700 dark:text-blue-300 font-medium">
                    متبرع نشط
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    500+
                  </div>
                  <div className="text-green-700 dark:text-green-300 font-medium">
                    حالة تم إنقاذها
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    24/7
                  </div>
                  <div className="text-purple-700 dark:text-purple-300 font-medium">
                    خدمة مستمرة
                  </div>
                </div>
              </div>

              {/* Social Media Buttons */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Telegram Button */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
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
                    className="relative w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg group"
                  >
                    <div className="flex items-center justify-center gap-6">
                      <div className="relative">
                        <Image
                          src="/telegram.svg"
                          alt="Telegram"
                          width={48}
                          height={48}
                          className="w-12 h-12 group-hover:rotate-12 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="text-right">
                        <h4 className="text-2xl font-bold mb-2">تيليجرام</h4>
                        <p className="text-blue-100 mb-4">
                          استقبل إشعارات فورية لكل حالة طارئة
                        </p>
                        <div className="flex items-center justify-end gap-2">
                          <Bell className="h-4 w-4" />
                          <span className="text-sm">إشعارات فورية</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Facebook Button */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <a
                    href="https://www.facebook.com/profile.php?id=61577831872699"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg group"
                  >
                    <div className="flex items-center justify-center gap-6">
                      <div className="relative">
                        <Image
                          src="/facebook.svg"
                          alt="Facebook"
                          width={48}
                          height={48}
                          className="w-12 h-12 group-hover:rotate-12 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="text-right">
                        <h4 className="text-2xl font-bold mb-2">فيسبوك</h4>
                        <p className="text-blue-100 mb-4">
                          تابع آخر الأخبار والحالات المستجدة
                        </p>
                        <div className="flex items-center justify-end gap-2">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">مجتمع المتبرعين</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-2xl p-8 border border-red-200 dark:border-red-800/30">
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    لماذا تحتاج للاشتراك؟
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-red-600 dark:text-red-400 rounded-full"></div>
                      </div>
                      <div>
                        <div className="font-semibold mb-1">إشعارات فورية</div>
                        <div className="text-sm">
                          تصلك الحالة في نفس اللحظة التي تحتاج فيها للمساعدة
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-blue-600 dark:text-blue-400 rounded-full"></div>
                      </div>
                      <div>
                        <div className="font-semibold mb-1">حسب موقعك</div>
                        <div className="text-sm">
                          تستقبل فقط الحالات القريبة من منطقتك
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-green-600 dark:text-green-400 rounded-full"></div>
                      </div>
                      <div>
                        <div className="font-semibold mb-1">معلومات كاملة</div>
                        <div className="text-sm">
                          تفاصيل الحالة والمستشفى وفصيلة الدم المطلوبة
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-purple-600 dark:text-purple-400 rounded-full"></div>
                      </div>
                      <div>
                        <div className="font-semibold mb-1">مجتمع داعم</div>
                        <div className="text-sm">
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
