"use client";

import { DonorCard } from "@/components/ui/donor-card";
import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CheckCircle,
  CreditCard,
  Crown,
  Droplets,
  Eye,
  Heart,
  MapPin,
  Settings,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Actors = () => {
  const [showDonorCard, setShowDonorCard] = useState(false);

  const actors = [
    {
      id: "donors",
      title: "المتبرعين",
      subtitle: "أبطال إنقاذ الأرواح",
      description:
        "المتبرعون الكرام الذين يمنحون الحياة من خلال تبرعهم بالدم للحالات المحتاجة. يشكلون العمود الفقري لمنظومة الإنقاذ ويساهمون في إنقاذ الآلاف من الأرواح يومياً",
      icon: Heart,
      gradient: "from-red-500 to-pink-500",
      bgGradient:
        "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
      features: [
        {
          icon: CreditCard,
          title: "بطاقة المتبرع الرقمية",
          description: "بطاقة تعريف رقمية مع QR كود للتحقق السريع من الهوية",
        },
        {
          icon: Award,
          title: "متابعة التبرعات والحالات",
          description: "تتبع تاريخ تبرعاتك والحالات التي ساعدت في إنقاذها",
        },
        {
          icon: Bell,
          title: "إشعارات فورية",
          description: "تلقي إشعارات عاجلة للحالات الطارئة في منطقتك",
          isComingSoon: true,
        },
        {
          icon: MapPin,
          title: "متابعة الحالات في منطقتك",
          description: "معرفة الحالات المحتاجة لنقل الدم في منطقتك الجغرافية",
        },
        {
          icon: Calendar,
          title: "تذكير التبرع كل 56 يوم",
          description:
            "إشعار تلقائي عبر الإيميل عند حلول موعد التبرع المناسب لك",
        },
      ],
      stats: "15,000+ متبرع نشط",
      hasCard: true,
    },
    {
      id: "medical_institutions",
      title: "المستشفيات وبنوك الدم",
      subtitle: "شركاء الحفظ والتوزيع",
      description:
        "المؤسسات الطبية المتخصصة التي تدير عمليات التبرع وتخزين الدم. تشمل المستشفيات وبنوك الدم التي تعمل معاً لضمان توفر الدم للحالات المحتاجة",
      icon: Building2,
      gradient: "from-blue-500 to-emerald-500",
      bgGradient:
        "from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20",
      features: [
        {
          icon: Droplets,
          title: "تسجيل الحالات المرضية",
          description:
            "تسجيل الحالات التي تحتاج نقل دم مع تحديد فصيلة الدم المطلوبة",
        },
        {
          icon: CheckCircle,
          title: "تسجيل التبرعات وفحص المتبرعين",
          description: "استقبال المتبرعين وفحصهم للتأكد من صلاحيتهم للتبرع",
        },
        {
          icon: Users,
          title: "متابعة الحالات الخاصة",
          description: "تتبع الحالات المسجلة ومدى تقدم عملية التبرع لهم",
        },
      ],
      stats: "250+ مؤسسة طبية",
    },
    {
      id: "reviewers",
      title: "المراجعين المتطوعين",
      subtitle: "حماة الثقة والمصداقية",
      description:
        "متطوعون مؤهلون يشرف كل منهم على مدينة داخل محافظة. يقومون بتوثيق الحسابات الجديدة ومراجعة الحالات لضمان المصداقية ونشرها على المنصات المختلفة",
      icon: Eye,
      gradient: "from-purple-500 to-violet-500",
      bgGradient:
        "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
      features: [
        {
          icon: Users,
          title: "توثيق حسابات المتبرعين الجديدة",
          description:
            "مراجعة واعتماد حسابات المتبرعين الجدد من خلال الأوراق المرفقة",
        },
        {
          icon: Building2,
          title: "توثيق حسابات المستشفيات الجديدة",
          description: "التحقق من صحة بيانات المستشفيات وبنوك الدم الجديدة",
        },
        {
          icon: Shield,
          title: "مراجعة الأوراق المرفقة",
          description: "فحص دقيق للمستندات والأوراق الثبوتية المقدمة",
        },
        {
          icon: CheckCircle,
          title: "توثيق ونشر الحالات",
          description: "التأكد من صحة الحالات التي تحتاج دم ونشرها على المنصات",
        },
      ],
      stats: "مراجع لكل مدينة",
    },
    {
      id: "admins",
      title: "الإدارة",
      subtitle: "السلطة العليا والتحكم الكامل",
      description:
        "فريق الإدارة الذي يملك كل الصلاحيات دون قيود جغرافية. يدير جميع العمليات من إضافة وتعديل وحذف المراجعين والمتبرعين والمستشفيات والحالات مع الإشراف الكامل على المنصة",
      icon: Crown,
      gradient: "from-amber-500 to-orange-500",
      bgGradient:
        "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
      features: [
        {
          icon: Users,
          title: "إدارة كاملة للمراجعين",
          description: "إضافة وتعديل ومسح المراجعين مع تعديل بياناتهم",
        },
        {
          icon: Shield,
          title: "صلاحيات المراجع العامة",
          description: "توثيق الحسابات ومراجعة الحالات دون التقيد بالمناطق",
        },
        {
          icon: Trash2,
          title: "صلاحيات الحذف الكاملة",
          description: "حذف المتبرعين والمستشفيات والحالات حسب الحاجة",
        },
        {
          icon: Settings,
          title: "التحكم الكامل في النظام",
          description: "إدارة وتكوين جميع أجزاء المنصة والإعدادات",
        },
        {
          icon: BarChart3,
          title: "مراقبة شاملة للإحصائيات",
          description: "متابعة الأداء والإحصائيات العامة لكل المحافظات",
        },
        {
          icon: CheckCircle,
          title: "اعتماد وتوثيق فوري",
          description: "اعتماد الحسابات والحالات فورياً دون انتظار المراجعين",
        },
      ],
      stats: "كامل الصلاحيات",
    },
  ];

  // الحصول على بيانات المتبرعين
  const donorsData = actors.find((actor) => actor.id === "donors");
  // الحصول على بيانات المؤسسات الطبية
  const medicalData = actors.find(
    (actor) => actor.id === "medical_institutions"
  );
  // الحصول على بيانات المراجعين
  const reviewersData = actors.find((actor) => actor.id === "reviewers");
  // الحصول على بيانات الإدارة
  const adminsData = actors.find((actor) => actor.id === "admins");
  // باقي الأدوار
  const otherActors = actors.filter(
    (actor) =>
      actor.id !== "donors" &&
      actor.id !== "medical_institutions" &&
      actor.id !== "reviewers" &&
      actor.id !== "admins"
  );

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 relative overflow-hidden">
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mb-10 shadow-2xl">
            <Users className="h-12 w-12 text-white animate-pulse" />
          </div>
          <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            شركاء إنقاذ الأرواح
          </h2>
          <p className="text-3xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
            منظومة متكاملة من الأفراد والمؤسسات التي تعمل معاً{" "}
            <span className="text-red-600 dark:text-red-400 font-bold">
              لحظة بلحظة
            </span>{" "}
            لإنقاذ حياة الآخرين
          </p>
        </div>

        {/* Donors Full Screen Section */}
        {donorsData && (
          <div className="mb-20">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-200/50 dark:border-red-700/50 p-12 relative overflow-hidden min-h-[80vh]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 border-2 border-red-400 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 border border-red-400 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-red-400 rounded-full"></div>
                <div className="absolute top-1/4 right-1/3 w-20 h-20 border-2 border-red-400 rounded-full"></div>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
                {/* Left Side - Content */}
                <div className="space-y-8">
                  {/* Header */}
                  <div className="text-center lg:text-right">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl mb-8 shadow-lg">
                      <Heart className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                      {donorsData.title}
                    </h3>
                    <p className="text-2xl font-medium text-red-600 dark:text-red-400 mb-6">
                      {donorsData.subtitle}
                    </p>
                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                      {donorsData.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {donorsData.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      const hasComingSoon =
                        "isComingSoon" in feature && feature.isComingSoon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm"
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FeatureIcon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                {feature.title}
                              </h4>
                              {hasComingSoon && (
                                <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-pulse">
                                  قريباً
                                </span>
                              )}
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side - Large Donor Card */}
                <div className="flex items-center justify-center">
                  <div className="transform scale-150 hover:scale-[1.6] transition-transform duration-300">
                    {/* Donor Card Display Component */}
                    <div className="w-80 h-96 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 border border-white rounded-full"></div>
                        <div className="absolute top-1/2 left-1/4 w-8 h-8 border border-white rounded-full transform -translate-y-1/2"></div>
                      </div>

                      {/* Card Content */}
                      <div className="relative z-10 h-full flex flex-col items-center justify-between">
                        {/* Header */}
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                            <Heart className="h-4 w-4 fill-current" />
                            <span>بطاقة متبرع</span>
                          </div>
                        </div>

                        {/* Avatar */}
                        <div className="flex flex-col items-center space-y-4">
                          <div className="relative w-20 h-20 rounded-full bg-white p-1 shadow-lg">
                            <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                              <Image
                                src="/avatar.png"
                                alt="المتبرع"
                                width={80}
                                height={80}
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                          </div>
                          <h2 className="text-xl font-bold text-white text-center leading-tight">
                            أحمد محمد علي
                          </h2>
                        </div>

                        {/* QR Code */}
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center p-2">
                            <Image
                              src="/qr.png"
                              alt="QR Code"
                              width={128}
                              height={128}
                              className="w-full h-full object-contain rounded"
                            />
                          </div>
                          <p className="text-white/80 text-xs text-center">
                            امسح الكود للتحقق من الهوية
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                              <Heart className="h-4 w-4 text-red-500 fill-current" />
                            </div>
                            <span className="text-white font-bold text-lg">
                              إحياء
                            </span>
                          </div>
                          <p className="text-white/80 text-xs">
                            منصة التبرع بالدم والأعضاء
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="absolute bottom-8 left-8">
                <button
                  onClick={() => setShowDonorCard(true)}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full text-red-600 font-semibold text-lg border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CreditCard className="h-6 w-6" />
                  <span>عرض البطاقة التفاعلية</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Medical Institutions Full Screen Section */}
        {medicalData && (
          <div className="mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-200/50 dark:border-blue-700/50 p-12 relative overflow-hidden min-h-[80vh]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 border-2 border-blue-400 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 border border-emerald-400 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-blue-400 rounded-full"></div>
                <div className="absolute top-1/4 right-1/3 w-20 h-20 border-2 border-emerald-400 rounded-full"></div>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
                {/* Left Side - Content */}
                <div className="space-y-8">
                  {/* Header */}
                  <div className="text-center lg:text-right">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl mb-8 shadow-lg">
                      <Building2 className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                      {medicalData.title}
                    </h3>
                    <p className="text-2xl font-medium text-blue-600 dark:text-blue-400 mb-6">
                      {medicalData.subtitle}
                    </p>
                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                      {medicalData.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {medicalData.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30"
                        >
                          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FeatureIcon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                              {feature.title}
                            </h4>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side - Hospital/Medical Image */}
                <div className="flex items-center justify-center">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    {/* Medical Institution Card/Image */}
                    <div className="    rounded-3xl   relative overflow-hidden">
                      {/* Background Pattern */}

                      {/* Card Content */}
                      <div className="relative z-10 h-full flex items-center justify-center">
                        <Image
                          src="/hospital1.png"
                          alt="مستشفى"
                          width={500}
                          height={500}
                          className="w-full h-full object-cover rounded-2xl"
                          onError={() => {
                            // Fallback handled by Next.js
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviewers Full Screen Section */}
        {reviewersData && (
          <div className="mb-20">
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 dark:border-purple-700/50 p-12 relative overflow-hidden min-h-[80vh]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 border-2 border-purple-400 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 border border-violet-400 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-purple-400 rounded-full"></div>
                <div className="absolute top-1/4 right-1/3 w-20 h-20 border-2 border-violet-400 rounded-full"></div>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
                {/* Left Side - Content */}
                <div className="space-y-8">
                  {/* Header */}
                  <div className="text-center lg:text-right">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl mb-8 shadow-lg">
                      <Eye className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                      {reviewersData.title}
                    </h3>
                    <p className="text-2xl font-medium text-purple-600 dark:text-purple-400 mb-6">
                      {reviewersData.subtitle}
                    </p>
                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                      {reviewersData.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {reviewersData.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-purple-200/30 dark:border-purple-700/30"
                        >
                          <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FeatureIcon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                              {feature.title}
                            </h4>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side - Observer Image */}
                <div className="flex items-center justify-center">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    {/* Observer Image */}
                    <div className="rounded-3xl relative overflow-hidden">
                      {/* Card Content */}
                      <div className="relative z-10 h-full flex items-center justify-center">
                        <Image
                          src="/observer1.png"
                          alt="مراجع متطوع"
                          width={500}
                          height={500}
                          className="w-full h-full object-cover rounded-2xl"
                          onError={() => {
                            // Fallback handled by Next.js
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Administration Full Screen Section */}
        {adminsData && (
          <div className="mb-20">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/50 dark:border-amber-700/50 p-12 relative overflow-hidden min-h-[80vh]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 border-2 border-amber-400 rounded-full"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 border border-orange-400 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-amber-400 rounded-full"></div>
                <div className="absolute top-1/4 right-1/3 w-20 h-20 border-2 border-orange-400 rounded-full"></div>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
                {/* Left Side - Content */}
                <div className="space-y-8">
                  {/* Header */}
                  <div className="text-center lg:text-right">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-8 shadow-lg">
                      <Crown className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                      {adminsData.title}
                    </h3>
                    <p className="text-2xl font-medium text-amber-600 dark:text-amber-400 mb-6">
                      {adminsData.subtitle}
                    </p>
                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                      {adminsData.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {adminsData.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-amber-200/30 dark:border-amber-700/30"
                        >
                          <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FeatureIcon className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                              {feature.title}
                            </h4>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side - Admin Image */}
                <div className="flex items-center justify-center">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    {/* Admin Image */}
                    <div className="rounded-3xl relative overflow-hidden">
                      {/* Card Content */}
                      <div className="relative z-10 h-full flex items-center justify-center">
                        <Image
                          src="/admin1.png"
                          alt="مدير النظام"
                          width={500}
                          height={500}
                          className="w-full h-full object-cover rounded-2xl"
                          onError={() => {
                            // Fallback handled by Next.js
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Actors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {otherActors.map((actor, index) => {
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
                  className={`relative bg-gradient-to-br ${actor.bgGradient} backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50 h-full min-h-[500px]`}
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
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-3">
                      {actor.subtitle}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {actor.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {actor.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 bg-gradient-to-r ${actor.gradient} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}
                          >
                            <FeatureIcon className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                              {feature.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
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
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 p-12 md:p-16 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-red-400/10 to-pink-400/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                كيف نعمل معاً؟
              </h3>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                تدفق عمل متناغم يضمن وصول المساعدة في الوقت المناسب
              </p>
            </div>

            {/* Flow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
                <h4 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3">
                  المستشفى
                </h4>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  ترسل الحالة
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-gray-400 dark:text-gray-600" />
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Eye className="h-10 w-10 text-white" />
                </div>
                <h4 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3">
                  المراجع
                </h4>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  يراجع في دقائق
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-gray-400 dark:text-gray-600" />
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Settings className="h-10 w-10 text-white" />
                </div>
                <h4 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3">
                  الإدارة
                </h4>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  تنشر فوراً
                </p>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-gray-400 dark:text-gray-600" />
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h4 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-3">
                  المتبرع
                </h4>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  ينقذ الحياة
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 rounded-2xl p-12 border border-emerald-200 dark:border-emerald-800/30">
                <h4 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  كن جزءاً من فريق الإنقاذ
                </h4>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                  سواء كنت متبرعاً أو مستشفى أو بنك دم، انضم إلينا لنبني معاً
                  شبكة إنقاذ قوية وفعّالة
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <Heart className="h-6 w-6" />
                    <span>سجل كمتبرع</span>
                  </div>
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <Building2 className="h-6 w-6" />
                    <span>انضم كمؤسسة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donor Card Dialog */}
      <DonorCard
        userId="DONOR123"
        userName="أحمد محمد علي"
        userAvatar="/avatar.png"
        isOpen={showDonorCard}
        onOpenChange={setShowDonorCard}
      />

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
