"use client";

import {
  ArrowRight,
  Building2,
  Crown,
  Droplets,
  Eye,
  Heart,
  Settings,
  Users,
} from "lucide-react";

const Actors = () => {
  const actors = [
    {
      id: "donors",
      title: "المتبرعين",
      subtitle: "أبطال إنقاذ الأرواح",
      description:
        "المتبرعون الكرام الذين يمنحون الحياة من خلال تبرعهم بالدم للحالات المحتاجة",
      icon: Heart,
      gradient: "from-red-500 to-pink-500",
      bgGradient:
        "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
      features: [
        "تسجيل معلومات شخصية كاملة",
        "تتبع تاريخ التبرعات",
        "استقبال إشعارات الحالات الطارئة",
        "عرض بطاقة المتبرع الرقمية",
      ],
      stats: "15,000+ متبرع نشط",
    },
    {
      id: "hospitals",
      title: "المستشفيات",
      subtitle: "نقطة البداية للإنقاذ",
      description:
        "المستشفيات التي ترسل الحالات المحتاجة للدم وتستقبل المتبرعين",
      icon: Building2,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient:
        "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
      features: [
        "إرسال طلبات الدم الطارئة",
        "إدارة الحالات المرضية",
        "تسجيل المتبرعين",
        "تتبع حالة التبرعات",
      ],
      stats: "200+ مستشفى شريك",
    },
    {
      id: "blood_banks",
      title: "بنوك الدم",
      subtitle: "حفظة الحياة",
      description: "بنوك الدم المتخصصة في تخزين وتوزيع الدم ومشتقاته",
      icon: Droplets,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient:
        "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
      features: [
        "إدارة مخزون الدم",
        "تنسيق التوزيع",
        "ضمان جودة الدم",
        "تقارير الإحصائيات",
      ],
      stats: "50+ بنك دم معتمد",
    },
    {
      id: "reviewers",
      title: "المراجعين",
      subtitle: "ضمان الجودة والدقة",
      description:
        "فريق المراجعين المتخصص الذي يدرس ويراجع الحالات المرضية في دقائق",
      icon: Eye,
      gradient: "from-purple-500 to-violet-500",
      bgGradient:
        "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
      features: [
        "مراجعة التقارير الطبية",
        "التحقق من صحة المعلومات",
        "اعتماد الحالات الطارئة",
        "ضمان سرعة الاستجابة",
      ],
      stats: "مراجعة خلال دقائق",
    },
    {
      id: "admins",
      title: "الإدارة",
      subtitle: "قادة التنسيق",
      description:
        "فريق الإدارة الذي يشرف على النظام ويدير العمليات ويضمن سير العمل",
      icon: Crown,
      gradient: "from-amber-500 to-orange-500",
      bgGradient:
        "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
      features: [
        "إدارة النظام الكامل",
        "إشراف على العمليات",
        "إدارة المستخدمين",
        "تحليل البيانات والتقارير",
      ],
      stats: "إدارة 24/7",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-red-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-amber-400/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl">
            <Users className="h-10 w-10 text-white animate-pulse" />
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            شركاء إنقاذ الأرواح
          </h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            منظومة متكاملة من الأفراد والمؤسسات التي تعمل معاً{" "}
            <span className="text-red-600 dark:text-red-400 font-bold">
              لحظة بلحظة
            </span>{" "}
            لإنقاذ حياة الآخرين
          </p>
        </div>

        {/* Actors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {actors.map((actor, index) => {
            const IconComponent = actor.icon;
            return (
              <div
                key={actor.id}
                className={`
                  group relative transform transition-all duration-500 hover:scale-105
                  animate-fade-in-up
                `}
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                {/* Card Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${actor.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                ></div>

                {/* Main Card */}
                <div
                  className={`relative bg-gradient-to-br ${actor.bgGradient} backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50 h-full`}
                >
                  {/* Card Header */}
                  <div className="text-center mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${actor.gradient} rounded-2xl mb-4 shadow-lg group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                      {actor.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                      {actor.subtitle}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {actor.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {actor.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 bg-gradient-to-r ${actor.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${actor.gradient} text-white text-sm font-semibold shadow-lg`}
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      {actor.stats}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Flow */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-8 md:p-12 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-red-400/10 to-pink-400/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                كيف نعمل معاً؟
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                تدفق عمل متناغم يضمن وصول المساعدة في الوقت المناسب
              </p>
            </div>

            {/* Flow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                  المستشفى
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ترسل الحالة
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-600" />
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                  المراجع
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  يراجع في دقائق
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-600" />
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                  الإدارة
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  تنشر فوراً
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-gray-400 dark:text-gray-600" />
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                  المتبرع
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ينقذ الحياة
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800/30">
                <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  كن جزءاً من فريق الإنقاذ
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  سواء كنت متبرعاً أو مستشفى أو بنك دم، انضم إلينا لنبني معاً
                  شبكة إنقاذ قوية وفعّالة
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow">
                    <Heart className="h-5 w-5" />
                    <span>سجل كمتبرع</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow">
                    <Building2 className="h-5 w-5" />
                    <span>انضم كمؤسسة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default Actors;
