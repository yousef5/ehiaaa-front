"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  AlertTriangle,
  Clock,
  Facebook,
  Heart,
  HeartHandshake,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Share2,
  Users,
} from "lucide-react";

const Services = () => {
  return (
    <>
      {/* The Real Challenge Section - Full Width */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/30 dark:via-orange-950/30 dark:to-yellow-950/30 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-60 h-60 bg-red-400/20 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-bounce delay-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 w-full px-6">
          {/* Main Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mb-8 animate-bounce">
              <AlertTriangle className="h-10 w-10 text-white animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent animate-pulse">
              التحدي الحقيقي
            </h1>

            {/* Giant "لا يوجد كيس دم بدون متبرع" */}
            <div className="mb-12 relative max-w-7xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-orange-500/30 to-yellow-500/30 blur-3xl animate-pulse"></div>
              <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 border-8 border-red-500/50 shadow-2xl">
                <div className="text-center">
                  <div className="inline-block animate-bounce mb-8">
                    <Heart className="w-24 h-24 text-red-500 animate-pulse" />
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8">
                    <span className="block bg-gradient-to-r from-red-600 via-red-500 to-red-700 dark:from-red-400 dark:via-red-300 dark:to-red-500 bg-clip-text text-transparent animate-pulse mb-6">
                      لا يوجد كيس دم
                    </span>
                    <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 dark:from-orange-400 dark:via-orange-300 dark:to-red-400 bg-clip-text text-transparent animate-pulse delay-500">
                      بدون متبرع
                    </span>
                  </h2>
                  <div className="flex justify-center items-center gap-6 mb-8">
                    <div className="w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full animate-ping delay-100"></div>
                    <div className="w-6 h-6 bg-yellow-500 rounded-full animate-ping delay-200"></div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-3xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300 max-w-6xl mx-auto leading-relaxed font-bold mb-12">
              مما يجبر عائلات المرضى على توفير متبرعين بأنفسهم
            </p>
          </div>
        </div>
      </section>

      {/* Challenges Section - Full Screen */}
      <section className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/50 dark:via-orange-950/50 dark:to-yellow-950/50 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-80 h-80 bg-red-400/10 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-bounce delay-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 left-32 w-6 h-6 bg-red-400 rounded-full animate-ping"></div>
          <div className="absolute top-64 right-48 w-4 h-4 bg-orange-400 rounded-full animate-ping delay-700"></div>
          <div className="absolute bottom-48 left-48 w-5 h-5 bg-yellow-400 rounded-full animate-ping delay-1400"></div>
          <div className="absolute bottom-32 right-32 w-3 h-3 bg-red-500 rounded-full animate-ping delay-2100"></div>
        </div>

        <div className="relative z-10 w-full px-6">
          {/* Title Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full mb-12 animate-bounce shadow-2xl">
              <AlertTriangle className="h-14 w-14 text-white animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl xl:text-[8rem] font-black mb-8">
              <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent animate-pulse">
                التحديات
              </span>
            </h1>

            <p className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-700 dark:text-gray-300 max-w-6xl mx-auto leading-tight">
              التي تواجه عائلات المرضى يومياً
            </p>
          </div>

          {/* Challenges Cards */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Challenge 1 */}
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-xl border-4 border-red-500/30 hover:border-red-500/50 transition-all duration-300">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full mb-4 mx-auto animate-pulse shadow-lg">
                      <span className="text-white font-black text-xl">1</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-center mb-4">
                      <span className="bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
                        بنوك الدم
                      </span>
                    </h3>

                    <p className="text-lg md:text-xl font-bold text-red-700 dark:text-red-300 mb-4">
                      ليس لديهم المخزون الكافي من الدم
                    </p>

                    <div className="bg-red-100/80 dark:bg-red-950/50 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 font-semibold">
                        كل كيس دم يحتاج متبرع جديد
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge 2 */}
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-xl border-4 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full mb-4 mx-auto animate-pulse delay-200 shadow-lg">
                      <span className="text-white font-black text-xl">2</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-center mb-4">
                      <span className="bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-400 dark:to-orange-600 bg-clip-text text-transparent">
                        العائلات
                      </span>
                    </h3>

                    <p className="text-lg md:text-xl font-bold text-orange-700 dark:text-orange-300 mb-4">
                      هي المسئولة عن التوفير
                    </p>

                    <div className="bg-orange-100/80 dark:bg-orange-950/50 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 font-semibold">
                        البحث عن متبرعين متوافقين
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge 3 */}
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-xl border-4 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full mb-4 mx-auto animate-pulse delay-400 shadow-lg">
                      <span className="text-white font-black text-xl">3</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-center mb-4">
                      <span className="bg-gradient-to-r from-yellow-600 to-yellow-800 dark:from-yellow-400 dark:to-yellow-600 bg-clip-text text-transparent">
                        الحالات الصعبة
                      </span>
                    </h3>

                    <p className="text-lg md:text-xl font-bold text-yellow-700 dark:text-yellow-300 mb-4">
                      تحتاج أكثر
                    </p>

                    <div className="bg-yellow-100/80 dark:bg-yellow-950/50 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 font-semibold">
                        كميات كبيرة من الدم
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge 4 */}
              <div className="group transform hover:scale-105 transition-all duration-300">
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-xl border-4 border-red-700/30 hover:border-red-700/50 transition-all duration-300">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-700 to-red-900 rounded-full mb-4 mx-auto animate-pulse delay-600 shadow-lg">
                      <span className="text-white font-black text-xl">4</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-center mb-4">
                      <span className="bg-gradient-to-r from-red-700 to-red-900 dark:from-red-500 dark:to-red-700 bg-clip-text text-transparent">
                        العلاج المستمر
                      </span>
                    </h3>

                    <p className="text-lg md:text-xl font-bold text-red-800 dark:text-red-300 mb-4">
                      دورة لا تنتهي
                    </p>

                    <div className="bg-red-200/80 dark:bg-red-900/50 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 font-semibold">
                        يحتاج متبرعين جدد باستمرار
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="text-center mt-20">
            <div className="max-w-6xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-[3rem] p-12 md:p-16 shadow-2xl border-8 border-gradient-to-r border-red-500/30">
              <div className="space-y-8">
                <div className="flex justify-center items-center gap-6 mb-8">
                  <Heart className="w-16 h-16 text-red-500 animate-pulse" />
                  <AlertTriangle className="w-20 h-20 text-orange-500 animate-bounce" />
                  <Heart className="w-16 h-16 text-yellow-500 animate-pulse delay-500" />
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-800 dark:text-gray-200 leading-tight">
                  هذه هي
                  <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-400 dark:via-orange-400 dark:to-yellow-400 bg-clip-text text-transparent mx-4 animate-pulse">
                    الحقيقة
                  </span>
                  المؤلمة
                </h2>

                <p className="text-2xl md:text-4xl lg:text-5xl text-gray-700 dark:text-gray-300 font-bold leading-relaxed">
                  التي تواجهها كل عائلة تحتاج للدم
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Story Section - Full Screen */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950/30 flex items-center justify-center relative overflow-hidden py-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 w-full px-6">
          {/* Title */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-8 animate-bounce shadow-2xl">
              <Heart className="h-12 w-12 text-white animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent animate-pulse">
                قصة حقيقية
              </span>
            </h1>

            <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-700 dark:text-gray-300 max-w-5xl mx-auto leading-tight">
              معاناة عائلة مع توفير الدم
            </p>
          </div>

          {/* Story Timeline */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 via-orange-500 to-blue-500 rounded-full"></div>

              {/* Story Steps */}
              <div className="space-y-16">
                {/* Step 1 - Doctor's Request */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-lg text-right pr-8">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-4 border-red-500/30 transform hover:scale-105 transition-all duration-300">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full mb-4 animate-pulse shadow-lg">
                          <span className="text-white font-black text-xl">
                            1
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-400 mb-4">
                          بداية المحنة
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 font-bold leading-relaxed text-center">
                        الدكاترة قالوا:{" "}
                        <span className="text-red-600 dark:text-red-400">
                          &ldquo;المريض محتاج 5 أكياس دم&rdquo;
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full z-10 shadow-lg animate-pulse">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  <div className="w-full max-w-lg"></div>
                </div>

                {/* Step 2 - Blood Bank Response */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-lg"></div>

                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full z-10 shadow-lg animate-pulse delay-200">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  <div className="w-full max-w-lg text-left pl-8">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-4 border-orange-500/30 transform hover:scale-105 transition-all duration-300">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full mb-4 animate-pulse delay-200 shadow-lg">
                          <span className="text-white font-black text-xl">
                            2
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-orange-600 dark:text-orange-400 mb-4">
                          صدمة بنك الدم
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 font-bold leading-relaxed text-center">
                        بنك الدم قال:{" "}
                        <span className="text-orange-600 dark:text-orange-400">
                          &ldquo;عايز دم؟ لازم متبرع!&rdquo;
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 - Family Sacrifice */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-lg text-right pr-8">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-4 border-green-500/30 transform hover:scale-105 transition-all duration-300">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full mb-4 animate-pulse delay-400 shadow-lg">
                          <span className="text-white font-black text-xl">
                            3
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 mb-4">
                          تضحية العائلة
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 font-bold leading-relaxed text-center">
                        العائلة كلها اتبرعت وقدروا يوفروا{" "}
                        <span className="text-green-600 dark:text-green-400">
                          5 أكياس
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full z-10 shadow-lg animate-pulse delay-400">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  <div className="w-full max-w-lg"></div>
                </div>

                {/* Step 4 - New Challenge */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-lg"></div>

                  <div className="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-full z-10 shadow-lg animate-pulse delay-600">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  <div className="w-full max-w-lg text-left pl-8">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-4 border-purple-500/30 transform hover:scale-105 transition-all duration-300">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mb-4 animate-pulse delay-600 shadow-lg">
                          <span className="text-white font-black text-xl">
                            4
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 mb-4">
                          مفاجأة جديدة
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 font-bold leading-relaxed text-center">
                        الدكاترة قالوا:{" "}
                        <span className="text-purple-600 dark:text-purple-400">
                          &ldquo;محتاج بلازما لمدة 20 يوم!&rdquo;
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 5 - Hospital Shock */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-lg text-right pr-8">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-4 border-blue-500/30 transform hover:scale-105 transition-all duration-300">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-4 animate-pulse delay-800 shadow-lg">
                          <span className="text-white font-black text-xl">
                            5
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mb-4">
                          صاعقة أخرى
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 font-bold leading-relaxed text-center">
                        المستشفى قالت:{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                          &ldquo;لازم 20 متبرع... كل يوم كيس!&rdquo;
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full z-10 shadow-lg animate-pulse delay-800">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  <div className="w-full max-w-lg"></div>
                </div>

                {/* Step 6 - Family Struggle */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-lg"></div>

                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full z-10 shadow-lg animate-pulse delay-1000">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  <div className="w-full max-w-lg text-left pl-8">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-4 border-yellow-500/30 transform hover:scale-105 transition-all duration-300">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full mb-4 animate-pulse delay-1000 shadow-lg">
                          <span className="text-white font-black text-xl">
                            6
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-yellow-600 dark:text-yellow-400 mb-4">
                          معاناة البحث
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 font-bold leading-relaxed text-center">
                        كل فرد في العائلة بدأ يدور على{" "}
                        <span className="text-yellow-600 dark:text-yellow-400">
                          حد يعرفه يتبرع
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 7 - Success but exhaustion */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-lg text-right pr-8">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-4 border-teal-500/30 transform hover:scale-105 transition-all duration-300">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full mb-4 animate-pulse delay-1200 shadow-lg">
                          <span className="text-white font-black text-xl">
                            7
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-teal-600 dark:text-teal-400 mb-4">
                          نجاح مؤقت
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 font-bold leading-relaxed text-center">
                        بعد معاناة ولم كل المعارف حصلوا على{" "}
                        <span className="text-teal-600 dark:text-teal-400">
                          20 كيس بلازما
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 bg-teal-500 rounded-full z-10 shadow-lg animate-pulse delay-1200">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  <div className="w-full max-w-lg"></div>
                </div>

                {/* Step 8 - The final blow */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-lg"></div>

                  <div className="flex items-center justify-center w-8 h-8 bg-red-700 rounded-full z-10 shadow-lg animate-pulse delay-1400">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  <div className="w-full max-w-lg text-left pl-8">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-4 border-red-700/30 transform hover:scale-105 transition-all duration-300">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-700 to-red-900 rounded-full mb-4 animate-pulse delay-1400 shadow-lg">
                          <span className="text-white font-black text-xl">
                            8
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-red-700 dark:text-red-400 mb-4">
                          الضربة القاضية
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 font-bold leading-relaxed text-center">
                        بعد 20 يوم الدكاترة قالوا:{" "}
                        <span className="text-red-700 dark:text-red-400">
                          &ldquo;لسه كمان 5 أيام!&rdquo;
                        </span>
                        <br />
                        <span className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2 block">
                          العائلة عجزت... فعلاً مش عارفين حد
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Conclusion */}
          <div className="text-center mt-20">
            <div className="max-w-5xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-[3rem] p-12 md:p-16 shadow-2xl border-8 border-red-700/30">
              <div className="space-y-8">
                <div className="flex justify-center items-center gap-6 mb-8">
                  <Heart className="w-16 h-16 text-red-700 animate-pulse" />
                  <Users className="w-20 h-20 text-blue-600 animate-bounce" />
                  <Heart className="w-16 h-16 text-red-700 animate-pulse delay-500" />
                </div>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-800 dark:text-gray-200 leading-tight">
                  هذه القصة
                  <span className="bg-gradient-to-r from-red-600 via-blue-600 to-purple-600 dark:from-red-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mx-4 animate-pulse">
                    تتكرر يومياً
                  </span>
                  في مصر
                </h2>

                <p className="text-xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-bold leading-relaxed">
                  كم عائلة تمر بنفس هذه المعاناة؟
                  <br />
                  <span className="text-red-600 dark:text-red-400">
                    وكم مريض فقد الأمل؟
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ehiaaa is Hope - World-Class Section */}
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/30 flex items-center justify-center relative overflow-hidden">
        {/* World-Class Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            viewBox="0 0 100 100"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-16 h-16 border-2 border-blue-400/30 rotate-45 animate-spin"></div>
          <div className="absolute top-32 right-32 w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-purple-400/30 animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 right-20 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-400 transform rotate-45 animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 w-full px-6">
          {/* Title Section with Logo */}
          <div className="text-center mb-20">
            {/* Logo Integration */}
            <div className="mb-12">
              <div className="relative inline-block">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <img
                  src="/logo.png"
                  alt="Ehiaaa Logo"
                  className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto drop-shadow-2xl transform hover:scale-110 transition-all duration-500"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl xl:text-[8rem] font-black mb-8 leading-none">
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 animate-pulse">
                إحياء
              </span>
              <span className="block text-4xl md:text-6xl lg:text-8xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent animate-pulse delay-500">
                هي الأمل
              </span>
            </h1>

            <div className="flex justify-center items-center gap-6 mt-8">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
              <div className="w-4 h-4 bg-indigo-500 rounded-full animate-ping delay-300"></div>
              <div className="w-5 h-5 bg-purple-500 rounded-full animate-ping delay-600"></div>
              <div className="w-4 h-4 bg-indigo-500 rounded-full animate-ping delay-900"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping delay-1200"></div>
            </div>
          </div>

          {/* World-Class Connection Visual */}
          <div className="max-w-8xl mx-auto mb-20">
            <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl rounded-3xl p-8 md:p-16 lg:p-20 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              {/* Global Connection Flow */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mb-16">
                {/* Patient Side */}
                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="absolute -inset-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                    <div className="relative w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                      <Heart className="w-14 h-14 md:w-18 md:h-18 text-white animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-200 mb-3">
                    المرضى
                  </h3>
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-semibold">
                    يحتاجون الأمل
                  </p>
                </div>

                {/* Connection Flow */}
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Flow Line */}
                  <div className="relative">
                    <div className="w-2 h-20 lg:w-20 lg:h-2 bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-20 lg:w-20 lg:h-2 bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 rounded-full blur-sm opacity-50"></div>
                  </div>

                  {/* Ehiaaa Center */}
                  <div className="relative">
                    <div className="absolute -inset-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative bg-white dark:bg-slate-800 rounded-full p-8 shadow-2xl border-4 border-blue-200 dark:border-blue-800">
                      <img
                        src="/logo.png"
                        alt="Ehiaaa"
                        className="w-20 h-20 md:w-24 md:h-24"
                      />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm md:text-base font-bold shadow-lg">
                        الأمل
                      </div>
                    </div>
                  </div>

                  {/* Flow Line */}
                  <div className="relative">
                    <div className="w-2 h-20 lg:w-20 lg:h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full animate-pulse delay-500"></div>
                    <div className="absolute inset-0 w-2 h-20 lg:w-20 lg:h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full blur-sm opacity-50"></div>
                  </div>
                </div>

                {/* Donor Side */}
                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                    <div className="relative w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                      <Users className="w-14 h-14 md:w-18 md:h-18 text-white animate-pulse delay-700" />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-200 mb-3">
                    المتبرعون
                  </h3>
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-semibold">
                    يمنحون الحياة
                  </p>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="text-center space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-800 dark:text-slate-200 leading-tight mb-8">
                    نحن
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mx-4 animate-pulse">
                      الجسر
                    </span>
                    الذي يربط القلوب
                  </h2>

                  <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                    نحول اليأس إلى أمل، والحاجة إلى عطاء
                  </p>
                </div>

                <div className="flex justify-center items-center gap-4 my-12">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-6 h-6 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full animate-bounce delay-400"></div>
                  <div className="w-6 h-6 bg-indigo-500 rounded-full animate-bounce delay-600"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-800"></div>
                </div>

                {/* Global Impact Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                  {/* Vision Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mb-4">
                        رؤيتنا
                      </h4>
                      <p className="text-lg text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                        مجتمع لا يفقد فيه مريض الأمل في الحصول على الدم
                      </p>
                    </div>
                  </div>

                  {/* Mission Card */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 border border-indigo-200/50 dark:border-indigo-800/50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <HeartHandshake className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-4">
                        مهمتنا
                      </h4>
                      <p className="text-lg text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                        ربط المحتاجين بالمتبرعين بسرعة وكفاءة عالية
                      </p>
                    </div>
                  </div>

                  {/* Impact Card */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/50 transform hover:scale-105 transition-all duration-300 shadow-lg md:col-span-2 lg:col-span-1">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400 mb-4">
                        تأثيرنا
                      </h4>
                      <p className="text-lg text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                        آلاف الأرواح تم إنقاذها بفضل شبكتنا العالمية
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inspirational Message */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-12 md:p-16 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="space-y-8">
                <div className="flex justify-center items-center gap-6 mb-8">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                  <img src="/logo.png" alt="Ehiaaa" className="w-16 h-16" />
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse delay-500"></div>
                </div>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-800 dark:text-slate-200 leading-tight">
                  إحياء
                  <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent mx-4 animate-pulse">
                    ليست مجرد منصة
                  </span>
                </h2>

                <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
                  إحياء هي الأمل الذي يضيء طريق كل محتاج
                  <br />
                  <span className="text-blue-600 dark:text-blue-400">
                    وكل متبرع كريم
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mb-6">
              <Share2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 dark:from-emerald-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-pulse">
              كيف نعمل كحلقة وصل؟
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Our Process - Enhanced */}
            <div>
              <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 border-0 shadow-2xl h-full rounded-3xl">
                <CardHeader className="pb-8">
                  <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 dark:text-gray-100 text-center leading-tight">
                    خطوات العمل
                    <span className="block text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent mt-2">
                      المعقدة
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-6 group transform hover:scale-105 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
                        <span className="text-white font-black text-2xl">
                          1
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-400 mb-3">
                          استقبال الحالة
                        </h4>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold leading-relaxed">
                          مراجعة التقرير الطبي والتأكد من صحة البيانات
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 group transform hover:scale-105 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse delay-200">
                        <span className="text-white font-black text-2xl">
                          2
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-black text-orange-600 dark:text-orange-400 mb-3">
                          تحليل جغرافي
                        </h4>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold leading-relaxed">
                          تحديد المنطقة والبحث عن أقرب المتبرعين المتوافقين
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 group transform hover:scale-105 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse delay-400">
                        <span className="text-white font-black text-2xl">
                          3
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400 mb-3">
                          نشر متعدد القنوات
                        </h4>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold leading-relaxed">
                          إيميلات + فيسبوك + تليجرام
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6 group transform hover:scale-105 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse delay-600">
                        <span className="text-white font-black text-2xl">
                          4
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-400 mb-3">
                          متابعة مستمرة
                        </h4>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold leading-relaxed">
                          تنسيق مع المستشفى وتسجيل المتبرعين
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Channels - Enhanced */}
            <div>
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-0 shadow-2xl h-full rounded-3xl">
                <CardHeader className="pb-8">
                  <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 dark:text-gray-100 text-center leading-tight">
                    قنوات
                    <span className="block text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mt-2">
                      التواصل
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
                      <h5 className="text-xl md:text-2xl font-black text-blue-600 dark:text-blue-400 mb-2">
                        إيميلات مباشرة
                      </h5>
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold">
                        للمتبرعين في النطاق
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Facebook className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse delay-200" />
                      <h5 className="text-xl md:text-2xl font-black text-blue-700 dark:text-blue-300 mb-2">
                        فيسبوك
                      </h5>
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold">
                        انتشار واسع
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Send className="w-16 h-16 text-cyan-500 mx-auto mb-4 animate-pulse delay-400" />
                      <h5 className="text-xl md:text-2xl font-black text-cyan-600 dark:text-cyan-400 mb-2">
                        تليجرام
                      </h5>
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold">
                        إشعارات فورية
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-xl transform hover:scale-105 transition-all duration-300">
                      <Phone className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse delay-600" />
                      <h5 className="text-xl md:text-2xl font-black text-green-600 dark:text-green-400 mb-2">
                        اشعارات فورية
                        <span className="text-sm bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-black animate-pulse mr-2">
                          قريباً
                        </span>
                      </h5>
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold">
                        للحالات الطارئة
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-2xl p-8 mt-8 shadow-xl">
                    <div className="text-center">
                      <Clock className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-6 animate-bounce" />
                      <h5 className="text-3xl md:text-4xl font-black text-emerald-700 dark:text-emerald-300 mb-4">
                        متوسط الاستجابة
                      </h5>
                      <p className="text-5xl md:text-6xl font-black text-emerald-600 dark:text-emerald-400 mb-4 animate-pulse">
                        15 دقيقة
                      </p>
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold">
                        من استقبال الحالة إلى النشر
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Future Goals - Professional Design */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-800 dark:text-gray-200 mb-4">
                أهدافنا خلال سنة واحدة
              </h3>
              <p className="text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-400 font-bold">
                ما نأمل في الوصول إليه بإذن الله
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-0 bg-gradient-to-br from-red-50 via-red-100 to-pink-100 dark:from-red-950/50 dark:via-red-900/50 dark:to-pink-950/50 shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                <CardContent className="p-12 text-center">
                  <Heart className="w-28 h-28 text-red-500 mx-auto mb-8 animate-pulse group-hover:animate-bounce transition-all duration-300" />
                  <div className="text-7xl md:text-8xl lg:text-9xl font-black text-red-600 dark:text-red-400 mb-6 animate-pulse leading-none">
                    10K+
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl text-red-700 dark:text-red-300 font-black mb-4">
                    حالة إنقاذ
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold">
                    أكثر من 10 آلاف حالة نستهدف مساعدتها
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:via-emerald-900/50 dark:to-teal-950/50 shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                <CardContent className="p-12 text-center">
                  <Users className="w-28 h-28 text-emerald-500 mx-auto mb-8 animate-pulse delay-100 group-hover:animate-bounce transition-all duration-300" />
                  <div className="text-7xl md:text-8xl lg:text-9xl font-black text-emerald-600 dark:text-emerald-400 mb-6 animate-pulse delay-100 leading-none">
                    50K
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl text-emerald-700 dark:text-emerald-300 font-black mb-4">
                    متبرع فعال
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold">
                    شبكة ضخمة من المتبرعين النشطين
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 dark:from-blue-950/50 dark:via-blue-900/50 dark:to-cyan-950/50 shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                <CardContent className="p-12 text-center">
                  <MessageCircle className="w-28 h-28 text-blue-500 mx-auto mb-8 animate-pulse delay-200 group-hover:animate-bounce transition-all duration-300" />
                  <div className="text-7xl md:text-8xl lg:text-9xl font-black text-blue-600 dark:text-blue-400 mb-6 animate-pulse delay-200 leading-none">
                    100K
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl text-blue-700 dark:text-blue-300 font-black mb-4">
                    رسالة أمل
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold">
                    نشر الأمل عبر جميع المنصات
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-purple-50 via-purple-100 to-pink-100 dark:from-purple-950/50 dark:via-purple-900/50 dark:to-pink-950/50 shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                <CardContent className="p-12 text-center">
                  <Activity className="w-28 h-28 text-purple-500 mx-auto mb-8 animate-pulse delay-300 group-hover:animate-bounce transition-all duration-300" />
                  <div className="text-7xl md:text-8xl lg:text-9xl font-black text-purple-600 dark:text-purple-400 mb-6 animate-pulse delay-300 leading-none">
                    95%
                  </div>
                  <div className="text-2xl md:text-3xl lg:text-4xl text-purple-700 dark:text-purple-300 font-black mb-4">
                    معدل النجاح
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bold">
                    تحقيق أعلى معدلات الإنقاذ
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Final Message */}
          <div className="text-center">
            <Card className="border-0 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-950/20 dark:via-blue-950/20 dark:to-purple-950/20 shadow-2xl max-w-4xl mx-auto">
              <CardContent className="p-12">
                <HeartHandshake className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  نحن حلقة وصل... لا أكثر من ذلك
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  عندما تجد مريضك بحاجة للدم وأنت لا تستطيع توفير متبرع،
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {" "}
                    نحن هنا لنساعدك
                  </span>
                  . هدفنا بسيط: ربط من يحتاج بمن يستطيع العطاء في أسرع وقت ممكن.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-12 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  انضم لشبكة المتبرعين
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
