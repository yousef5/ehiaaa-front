"use client";

import {
  AlertTriangle,
  Award,
  CheckCircle,
  Eye,
  FileCheck,
  Shield,
  Users,
  Verified,
} from "lucide-react";

const TrustAndVerification = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-slate-950 dark:via-slate-900 dark:to-red-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-red-500 rounded-full"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border-2 border-red-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-red-300 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 border border-red-200 rounded-full"></div>

        {/* Shield patterns */}
        <div className="absolute top-1/3 right-20 opacity-10">
          <Shield className="w-64 h-64 text-red-500" />
        </div>
        <div className="absolute bottom-1/4 left-16 opacity-10">
          <Shield className="w-48 h-48 text-red-400" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10 min-h-screen flex items-center">
        <div className="w-full">
          {/* Main Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-8">
              <Shield
                className="w-16 h-16 text-red-600 mr-4"
                fill="currentColor"
              />
              <h1 className="text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-tight">
                المصداقية
              </h1>
              <Shield
                className="w-16 h-16 text-red-600 ml-4"
                fill="currentColor"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-5xl lg:text-6xl font-bold text-red-600 dark:text-red-400 mb-6">
                والشفافية أساس نجاحنا
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto"></div>
            </div>

            <p className="text-2xl lg:text-3xl text-slate-700 dark:text-slate-300 max-w-5xl mx-auto leading-relaxed font-medium">
              برنامج إحياء يلتزم بأعلى معايير المصداقية والدقة في جميع عملياته
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Side - Key Points */}
            <div className="space-y-12">
              {/* Strict Verification */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-red-100 dark:border-red-900/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-start space-x-6 space-x-reverse">
                  <div className="bg-red-500/20 p-4 rounded-2xl group-hover:bg-red-500/30 transition-colors">
                    <FileCheck className="w-12 h-12 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                      تحقق صارم من البيانات
                    </h3>
                    <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                      جميع بيانات المتبرعين يتم التحقق منها بدقة عالية لضمان
                      صحتها ومطابقتها للواقع
                    </p>
                  </div>
                </div>
              </div>

              {/* Real Cases Only */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-red-100 dark:border-red-900/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-start space-x-6 space-x-reverse">
                  <div className="bg-red-500/20 p-4 rounded-2xl group-hover:bg-red-500/30 transition-colors">
                    <AlertTriangle className="w-12 h-12 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                      حالات حقيقية فقط
                    </h3>
                    <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                      لا نقبل إلا الحالات الطبية الموثقة بالأوراق الرسمية من
                      المستشفيات المعتمدة
                    </p>
                  </div>
                </div>
              </div>

              {/* Documentation Required */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-red-100 dark:border-red-900/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <div className="flex items-start space-x-6 space-x-reverse">
                  <div className="bg-red-500/20 p-4 rounded-2xl group-hover:bg-red-500/30 transition-colors">
                    <Verified className="w-12 h-12 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                      الأوراق الرسمية مطلوبة
                    </h3>
                    <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                      كل حالة يجب أن تكون مدعومة بالتقارير الطبية والأوراق
                      الرسمية اللازمة
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Observer Role */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 rounded-3xl p-12 text-white shadow-3xl">
              <div className="text-center mb-10">
                <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-black mb-6">
                  دور المراجع
                </h3>
                <div className="w-20 h-1 bg-white/60 rounded-full mx-auto"></div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <CheckCircle className="w-8 h-8 text-white/90 mt-1" />
                  <p className="text-xl leading-relaxed">
                    مراجعة شاملة لجميع البيانات المقدمة من المتبرعين
                  </p>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <CheckCircle className="w-8 h-8 text-white/90 mt-1" />
                  <p className="text-xl leading-relaxed">
                    التحقق من صحة الحالات الطبية والأوراق المرفقة
                  </p>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <CheckCircle className="w-8 h-8 text-white/90 mt-1" />
                  <p className="text-xl leading-relaxed">
                    ضمان مطابقة المعلومات للمعايير المطلوبة
                  </p>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <CheckCircle className="w-8 h-8 text-white/90 mt-1" />
                  <p className="text-xl leading-relaxed">
                    متابعة مستمرة لضمان جودة الخدمة
                  </p>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <CheckCircle className="w-8 h-8 text-white/90 mt-1" />
                  <p className="text-xl leading-relaxed">
                    حماية حقوق جميع الأطراف المشاركة
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/30">
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                  <Award className="w-8 h-8 text-yellow-300" />
                  <p className="text-xl font-semibold">
                    فريق مراجعة مختص ومدرب
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="text-center bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 rounded-3xl p-12 border-2 border-red-200 dark:border-red-800">
            <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              ثقتكم أمانة في أعناقنا
            </h3>
            <p className="text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              نلتزم بأعلى معايير الشفافية والمصداقية لنكون جديرين بثقتكم في
              إنقاذ الأرواح
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="flex items-center space-x-3 space-x-reverse bg-white/80 dark:bg-slate-800/80 px-6 py-4 rounded-xl">
                <Users className="w-6 h-6 text-red-600" />
                <span className="text-lg font-semibold text-slate-900 dark:text-white">
                  مراجعون مختصون
                </span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse bg-white/80 dark:bg-slate-800/80 px-6 py-4 rounded-xl">
                <Shield className="w-6 h-6 text-red-600" />
                <span className="text-lg font-semibold text-slate-900 dark:text-white">
                  حماية البيانات
                </span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse bg-white/80 dark:bg-slate-800/80 px-6 py-4 rounded-xl">
                <FileCheck className="w-6 h-6 text-red-600" />
                <span className="text-lg font-semibold text-slate-900 dark:text-white">
                  توثيق كامل
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-24">
          <path
            d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,96C672,85,768,107,864,122.7C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="currentColor"
            className="text-white dark:text-slate-900"
          />
        </svg>
      </div>
    </section>
  );
};

export default TrustAndVerification;
