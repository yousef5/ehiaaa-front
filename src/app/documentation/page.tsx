"use client";

import Header from "@/components/Header";
import {
  AlertTriangle,
  ArrowDownUp,
  Ban,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  Clock,
  Cloud,
  Code,
  Cog,
  Cpu,
  CreditCard,
  Crown,
  Database,
  Download,
  Eye,
  FileCode,
  FileText,
  Fingerprint,
  Globe,
  Heart,
  Hospital,
  Key,
  Layers,
  Lock,
  Monitor,
  Package,
  Phone,
  Puzzle,
  RefreshCw,
  Search,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  Smartphone,
  Timer,
  UserCheck,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("architecture");

  const sections = [
    {
      id: "architecture",
      title: "هندسة النظام",
      icon: Layers,
      content: "تعرف على البنية التقنية لمنصة إحياء",
    },
    {
      id: "nestjs",
      title: "شرح NestJS",
      icon: Code,
      content: "دليل شامل لفهم NestJS والـ Backend",
    },
    {
      id: "auth",
      title: "المصادقة والتفويض",
      icon: Shield,
      content: "Authentication, Authorization, JWT Tokens & Guards",
    },
    {
      id: "introduction",
      title: "مقدمة",
      icon: FileText,
      content: "تعرف على منصة إحياء وأهدافها",
    },
    {
      id: "donors",
      title: "دليل المتبرعين",
      icon: Users,
      content: "كيفية التسجيل والتبرع بالدم",
    },
    {
      id: "hospitals",
      title: "دليل المستشفيات",
      icon: Hospital,
      content: "إدارة الحالات وطلب الدم",
    },
    {
      id: "observers",
      title: "دليل المراجعين",
      icon: Eye,
      content: "مراجعة البيانات والتحقق",
    },
    {
      id: "admins",
      title: "دليل المديرين",
      icon: Settings,
      content: "إدارة النظام والمستخدمين",
    },
    {
      id: "privacy",
      title: "الخصوصية والأمان",
      icon: Shield,
      content: "سياسات الحماية والأمان",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-slate-950 dark:via-slate-900 dark:to-red-950">
      <Header />

      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-12">
            <FileText className="w-20 h-20 text-red-600 mr-6" />
            <h1 className="text-7xl lg:text-8xl font-black text-slate-900 dark:text-white">
              التوثيق
            </h1>
          </div>
          <p className="text-3xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto">
            دليل شامل لاستخدام منصة إحياء للتبرع بالدم
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mt-8"></div>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl sticky top-24">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                أقسام التوثيق
              </h3>
              <nav className="space-y-4">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`
                        w-full text-right p-5 rounded-xl transition-all duration-200 flex items-center space-x-4 space-x-reverse
                        ${
                          activeSection === section.id
                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-r-4 border-red-500"
                            : "hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                        }
                      `}
                    >
                      <IconComponent className="w-8 h-8" />
                      <span className="text-xl font-medium">
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
              {/* System Architecture */}
              {activeSection === "architecture" && (
                <div className="space-y-12">
                  <div className="flex items-center space-x-6 space-x-reverse mb-8">
                    <Layers className="w-16 h-16 text-red-600" />
                    <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
                      هندسة النظام التقنية
                    </h2>
                  </div>

                  {/* Architecture Overview */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-900/50 p-12 rounded-3xl border border-blue-200 dark:border-blue-800 mb-12">
                    <h3 className="text-5xl font-bold text-slate-900 dark:text-white mb-12 text-center">
                      نظرة عامة على البنية التقنية
                    </h3>

                    {/* 3-Layer Architecture */}
                    <div className="space-y-16">
                      {/* Frontend Layer */}
                      <div className="relative">
                        <div className="bg-white/90 dark:bg-slate-800/90 p-12 rounded-3xl shadow-2xl border-4 border-blue-300 dark:border-blue-700">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-6 space-x-reverse">
                              <Monitor className="w-16 h-16 text-blue-600" />
                              <h4 className="text-4xl font-bold text-slate-900 dark:text-white">
                                طبقة العرض (Frontend)
                              </h4>
                            </div>
                            <Smartphone className="w-12 h-12 text-blue-500" />
                          </div>

                          <div className="grid grid-cols-2 gap-12">
                            <div className="flex items-center space-x-6 space-x-reverse p-8 bg-blue-50 dark:bg-blue-950/30 rounded-2xl">
                              <div className="relative w-24 h-24">
                                <Image
                                  src="/images/icons/reactjs.png"
                                  alt="React"
                                  width={96}
                                  height={96}
                                  className="w-24 h-24 object-contain"
                                />
                              </div>
                              <div>
                                <h5 className="text-3xl font-bold text-slate-900 dark:text-white">
                                  React 18
                                </h5>
                                <p className="text-xl text-slate-600 dark:text-slate-400">
                                  مكتبة التفاعل
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-6 space-x-reverse p-8 bg-black/5 dark:bg-white/5 rounded-2xl">
                              <div className="relative w-24 h-24">
                                <Image
                                  src="/images/icons/nextjs.png"
                                  alt="Next.js"
                                  width={96}
                                  height={96}
                                  className="w-24 h-24 object-contain"
                                />
                              </div>
                              <div>
                                <h5 className="text-3xl font-bold text-slate-900 dark:text-white">
                                  Next.js 14
                                </h5>
                                <p className="text-xl text-slate-600 dark:text-slate-400">
                                  إطار العمل
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Arrow Down */}
                        <div className="flex justify-center my-8">
                          <ArrowDownUp className="w-16 h-16 text-slate-400 animate-pulse" />
                        </div>
                      </div>

                      {/* Backend Layer */}
                      <div className="relative">
                        <div className="bg-white/90 dark:bg-slate-800/90 p-12 rounded-3xl shadow-2xl border-4 border-red-300 dark:border-red-700">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-6 space-x-reverse">
                              <Server className="w-16 h-16 text-red-600" />
                              <h4 className="text-4xl font-bold text-slate-900 dark:text-white">
                                طبقة التطبيق (Backend API)
                              </h4>
                            </div>
                            <Cloud className="w-12 h-12 text-red-500" />
                          </div>

                          <div className="flex items-center justify-center">
                            <div className="flex items-center space-x-6 space-x-reverse p-8 bg-red-50 dark:bg-red-950/30 rounded-2xl">
                              <div className="relative w-24 h-24">
                                <Image
                                  src="/images/icons/nestjs.png"
                                  alt="NestJS"
                                  width={96}
                                  height={96}
                                  className="w-24 h-24 object-contain"
                                />
                              </div>
                              <div>
                                <h5 className="text-3xl font-bold text-slate-900 dark:text-white">
                                  NestJS
                                </h5>
                                <p className="text-xl text-slate-600 dark:text-slate-400">
                                  خادم التطبيق
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Arrow Down */}
                        <div className="flex justify-center my-8">
                          <div className="grid grid-cols-2 gap-16 w-full max-w-lg">
                            <div className="flex justify-center">
                              <ArrowDownUp className="w-12 h-12 text-slate-400 animate-pulse" />
                            </div>
                            <div className="flex justify-center">
                              <ArrowDownUp className="w-12 h-12 text-slate-400 animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Data & Integration Layer */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Database */}
                        <div className="bg-white/90 dark:bg-slate-800/90 p-12 rounded-3xl shadow-2xl border-4 border-green-300 dark:border-green-700">
                          <div className="flex items-center space-x-6 space-x-reverse mb-8">
                            <Database className="w-16 h-16 text-green-600" />
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                              طبقة البيانات
                            </h4>
                          </div>

                          <div className="flex items-center space-x-6 space-x-reverse p-8 bg-green-50 dark:bg-green-950/30 rounded-2xl">
                            <div className="relative w-24 h-24">
                              <Image
                                src="/images/icons/postgre.png"
                                alt="PostgreSQL"
                                width={96}
                                height={96}
                                className="w-24 h-24 object-contain"
                              />
                            </div>
                            <div>
                              <h5 className="text-3xl font-bold text-slate-900 dark:text-white">
                                PostgreSQL
                              </h5>
                              <p className="text-xl text-slate-600 dark:text-slate-400">
                                قاعدة البيانات
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Integrations */}
                        <div className="bg-white/90 dark:bg-slate-800/90 p-12 rounded-3xl shadow-2xl border-4 border-purple-300 dark:border-purple-700">
                          <div className="flex items-center space-x-6 space-x-reverse mb-8">
                            <Globe className="w-16 h-16 text-purple-600" />
                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                              طبقة التكامل
                            </h4>
                          </div>

                          <div className="space-y-6">
                            <div className="flex items-center space-x-6 space-x-reverse p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                              <div className="relative w-16 h-16">
                                <Image
                                  src="/images/icons/telegram.png"
                                  alt="Telegram"
                                  width={64}
                                  height={64}
                                  className="w-16 h-16 object-contain"
                                />
                              </div>
                              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                Telegram
                              </span>
                            </div>

                            <div className="flex items-center space-x-6 space-x-reverse p-6 bg-blue-600/10 dark:bg-blue-500/10 rounded-xl">
                              <div className="relative w-16 h-16">
                                <Image
                                  src="/images/icons/facebook.png"
                                  alt="Facebook"
                                  width={64}
                                  height={64}
                                  className="w-16 h-16 object-contain"
                                />
                              </div>
                              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                Facebook
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Features */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 p-10 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
                      <Zap className="w-16 h-16 text-emerald-600 mb-6" />
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        أداء عالي
                      </h3>
                      <p className="text-xl text-slate-700 dark:text-slate-300">
                        تحسين للسرعة مع Server-Side Rendering وتحميل ديناميكي
                        للمحتوى
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 p-10 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                      <Shield className="w-16 h-16 text-blue-600 mb-6" />
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        أمان متقدم
                      </h3>
                      <p className="text-xl text-slate-700 dark:text-slate-300">
                        تشفير SSL/TLS، مصادقة JWT، وحماية من هجمات CSRF
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 p-10 rounded-2xl border-2 border-purple-200 dark:border-purple-800">
                      <Database className="w-16 h-16 text-purple-600 mb-6" />
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        إدارة بيانات
                      </h3>
                      <p className="text-xl text-slate-700 dark:text-slate-300">
                        قاعدة بيانات PostgreSQL مع نسخ احتياطية تلقائية
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 p-10 rounded-2xl border-2 border-orange-200 dark:border-orange-800">
                      <Smartphone className="w-16 h-16 text-orange-600 mb-6" />
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        تجاوب كامل
                      </h3>
                      <p className="text-xl text-slate-700 dark:text-slate-300">
                        تصميم متجاوب يعمل على جميع الأجهزة والشاشات
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 p-10 rounded-2xl border-2 border-red-200 dark:border-red-800">
                      <Globe className="w-16 h-16 text-red-600 mb-6" />
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        تكامل اجتماعي
                      </h3>
                      <p className="text-xl text-slate-700 dark:text-slate-300">
                        ربط مباشر مع Telegram و Facebook للتبليغ السريع
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/50 dark:to-teal-900/50 p-10 rounded-2xl border-2 border-teal-200 dark:border-teal-800">
                      <Eye className="w-16 h-16 text-teal-600 mb-6" />
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        مراقبة مستمرة
                      </h3>
                      <p className="text-xl text-slate-700 dark:text-slate-300">
                        نظام مراقبة متقدم لضمان استمرارية الخدمة
                      </p>
                    </div>
                  </div>

                  {/* Technology Stack */}
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 p-16 rounded-3xl">
                    <h3 className="text-5xl font-bold text-slate-900 dark:text-white mb-12 text-center">
                      مجموعة التقنيات المستخدمة
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                      <div className="text-center p-8 bg-white dark:bg-slate-600 rounded-2xl shadow-xl">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                          <Image
                            src="/images/icons/reactjs.png"
                            alt="React"
                            width={128}
                            height={128}
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                        <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                          React
                        </h4>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                          مكتبة UI
                        </p>
                      </div>

                      <div className="text-center p-8 bg-white dark:bg-slate-600 rounded-2xl shadow-xl">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                          <Image
                            src="/images/icons/nextjs.png"
                            alt="Next.js"
                            width={128}
                            height={128}
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                        <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                          Next.js
                        </h4>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                          إطار React
                        </p>
                      </div>

                      <div className="text-center p-8 bg-white dark:bg-slate-600 rounded-2xl shadow-xl">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                          <Image
                            src="/images/icons/nestjs.png"
                            alt="NestJS"
                            width={128}
                            height={128}
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                        <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                          NestJS
                        </h4>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                          خادم API
                        </p>
                      </div>

                      <div className="text-center p-8 bg-white dark:bg-slate-600 rounded-2xl shadow-xl">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                          <Image
                            src="/images/icons/postgre.png"
                            alt="PostgreSQL"
                            width={128}
                            height={128}
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                        <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                          PostgreSQL
                        </h4>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                          قاعدة البيانات
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NestJS Deep Dive */}
              {activeSection === "nestjs" && (
                <div className="space-y-12">
                  <div className="flex items-center space-x-6 space-x-reverse mb-8">
                    <Code className="w-16 h-16 text-red-600" />
                    <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
                      شرح NestJS المتقدم
                    </h2>
                  </div>

                  {/* Why NestJS */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-950/50 dark:to-orange-900/50 p-12 rounded-3xl border-4 border-red-300 dark:border-red-700 mb-12">
                    <div className="flex items-center space-x-6 space-x-reverse mb-8">
                      <Package className="w-16 h-16 text-red-600" />
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        لماذا استخدمنا NestJS؟
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                          المميزات الرئيسية:
                        </h4>
                        <div className="space-y-4">
                          {[
                            { icon: Cpu, text: "بنية معمارية قوية ومنظمة" },
                            {
                              icon: Lock,
                              text: "أمان متقدم مع Guards و Interceptors",
                            },
                            { icon: Zap, text: "أداء عالي مع TypeScript" },
                            { icon: Puzzle, text: "سهولة الصيانة والتطوير" },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-4 space-x-reverse p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl"
                            >
                              <item.icon className="w-8 h-8 text-red-600" />
                              <span className="text-xl text-slate-700 dark:text-slate-300">
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl"></div>
                        <div className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-red-200 dark:border-red-800">
                          <div className="flex items-center justify-center mb-6">
                            <Image
                              src="/images/icons/nestjs.png"
                              alt="NestJS"
                              width={120}
                              height={120}
                              className="w-32 h-32 object-contain"
                            />
                          </div>
                          <p className="text-center text-xl text-slate-700 dark:text-slate-300">
                            إطار عمل Node.js احترافي لبناء تطبيقات خادم قابلة
                            للتطوير وفعالة
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Architecture Pattern */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-900/50 p-12 rounded-3xl border-4 border-blue-300 dark:border-blue-700 mb-12">
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                      النمط المعماري: Controller → Service → Repository → Entity
                    </h3>

                    <div className="grid gap-8">
                      {/* Controllers */}
                      <div className="bg-white/90 dark:bg-slate-800/90 p-10 rounded-2xl border-2 border-green-300 dark:border-green-700">
                        <div className="flex items-center space-x-6 space-x-reverse mb-6">
                          <Workflow className="w-12 h-12 text-green-600" />
                          <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Controllers (المتحكمات)
                          </h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                              الوظيفة:
                            </h5>
                            <ul className="space-y-2 text-lg text-slate-700 dark:text-slate-300">
                              <li>• استقبال طلبات HTTP من العميل</li>
                              <li>• التحقق من صحة البيانات الواردة</li>
                              <li>• توجيه الطلبات للـ Services المناسبة</li>
                              <li>• إرجاع الاستجابة للعميل</li>
                            </ul>
                          </div>
                          <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl">
                            <div className="text-green-400 text-sm mb-2">{`// users.controller.ts`}</div>
                            <pre className="text-white text-sm overflow-x-auto">
                              {`@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Post()
  @ApiOperation({ summary: 'إنشاء مستخدم جديد' })
  async create(
    @Body() createUserDto: CreateUserDto
  ) {
    return this.usersService.create(createUserDto);
  }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="bg-white/90 dark:bg-slate-800/90 p-10 rounded-2xl border-2 border-blue-300 dark:border-blue-700">
                        <div className="flex items-center space-x-6 space-x-reverse mb-6">
                          <Cog className="w-12 h-12 text-blue-600" />
                          <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Services (الخدمات)
                          </h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                              الوظيفة:
                            </h5>
                            <ul className="space-y-2 text-lg text-slate-700 dark:text-slate-300">
                              <li>• تنفيذ منطق العمل (Business Logic)</li>
                              <li>
                                • التعامل مع الـ Repository لقاعدة البيانات
                              </li>
                              <li>• معالجة البيانات وتحويلها</li>
                              <li>• إدارة المعاملات (Transactions)</li>
                            </ul>
                          </div>
                          <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl">
                            <div className="text-blue-400 text-sm mb-2">{`// users.service.ts`}</div>
                            <pre className="text-white text-sm overflow-x-auto">
                              {`@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    
    // Business Logic
    if (user.age < 18) {
      throw new BadRequestException('العمر يجب أن يكون 18 سنة أو أكثر');
    }
    
    return this.usersRepository.save(user);
  }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Repository */}
                      <div className="bg-white/90 dark:bg-slate-800/90 p-10 rounded-2xl border-2 border-purple-300 dark:border-purple-700">
                        <div className="flex items-center space-x-6 space-x-reverse mb-6">
                          <Database className="w-12 h-12 text-purple-600" />
                          <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Repository Pattern
                          </h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                              الوظيفة:
                            </h5>
                            <ul className="space-y-2 text-lg text-slate-700 dark:text-slate-300">
                              <li>• التفاعل المباشر مع قاعدة البيانات</li>
                              <li>• عمليات CRUD (إنشاء، قراءة، تحديث، حذف)</li>
                              <li>• استعلامات معقدة ومخصصة</li>
                              <li>• إدارة العلاقات بين الجداول</li>
                            </ul>
                          </div>
                          <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl">
                            <div className="text-purple-400 text-sm mb-2">{`// TypeORM Repository`}</div>
                            <pre className="text-white text-sm overflow-x-auto">
                              {`// في الـ Service
async findByBloodType(bloodType: string): Promise<User[]> {
  return this.usersRepository.find({
    where: { 
      bloodType,
      isActive: true,
      role: UserRole.DONOR 
    },
    relations: ['donations', 'medicalReports'],
    order: { createdAt: 'DESC' }
  });
}

// استعلام مخصص
async findDonorsNearby(lat: number, lng: number, radius: number) {
  return this.usersRepository
    .createQueryBuilder('user')
    .where('ST_DWithin(user.location, ST_Point(:lng, :lat), :radius)')
    .setParameters({ lat, lng, radius })
    .getMany();
}`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Entity */}
                      <div className="bg-white/90 dark:bg-slate-800/90 p-10 rounded-2xl border-2 border-orange-300 dark:border-orange-700">
                        <div className="flex items-center space-x-6 space-x-reverse mb-6">
                          <FileCode className="w-12 h-12 text-orange-600" />
                          <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Entity (الكيانات)
                          </h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                              الوظيفة:
                            </h5>
                            <ul className="space-y-2 text-lg text-slate-700 dark:text-slate-300">
                              <li>• تمثيل جداول قاعدة البيانات</li>
                              <li>• تعريف العلاقات والقيود</li>
                              <li>• تحديد أنواع البيانات والقواعد</li>
                              <li>• ربط التطبيق بقاعدة البيانات</li>
                            </ul>
                          </div>
                          <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl">
                            <div className="text-orange-400 text-sm mb-2">{`// user.entity.ts`}</div>
                            <pre className="text-white text-sm overflow-x-auto">
                              {`@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'enum', enum: BloodType })
  bloodType: BloodType;

  @Column({ type: 'point', nullable: true })
  location: Point;

  @OneToMany(() => Donation, donation => donation.donor)
  donations: Donation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Validation & DTOs */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/50 dark:to-green-900/50 p-12 rounded-3xl border-4 border-emerald-300 dark:border-emerald-700 mb-12">
                    <div className="flex items-center space-x-6 space-x-reverse mb-8">
                      <Shield className="w-16 h-16 text-emerald-600" />
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        Validation & DTOs (التحقق من البيانات)
                      </h3>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                          Class Validator:
                        </h4>
                        <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl">
                          <div className="text-emerald-400 text-sm mb-2">{`// create-user.dto.ts`}</div>
                          <pre className="text-white text-sm overflow-x-auto">
                            {`export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'الاسم مطلوب' })
  @Length(2, 50, { message: 'الاسم يجب أن يكون بين 2-50 حرف' })
  name: string;

  @IsEmail({}, { message: 'البريد الإلكتروني غير صحيح' })
  email: string;

  @IsEnum(BloodType, { message: 'نوع الدم غير صحيح' })
  bloodType: BloodType;

  @IsNumber()
  @Min(18, { message: 'العمر يجب أن يكون 18 سنة أو أكثر' })
  @Max(65, { message: 'العمر يجب أن يكون 65 سنة أو أقل' })
  age: number;

  @IsOptional()
  @IsString()
  @Matches(/^01[0-9]{9}$/, { 
    message: 'رقم الهاتف يجب أن يكون رقم مصري صحيح' 
  })
  phone?: string;
}`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                          Custom Validators:
                        </h4>
                        <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl">
                          <div className="text-emerald-400 text-sm mb-2">{`// validators/is-egyptian-id.validator.ts`}</div>
                          <pre className="text-white text-sm overflow-x-auto">
                            {`@ValidatorConstraint({ async: false })
export class IsEgyptianIdConstraint implements ValidatorConstraintInterface {
  validate(nationalId: string) {
    // التحقق من أن الرقم القومي مصري صحيح
    if (!/^[0-9]{14}$/.test(nationalId)) return false;
    
    // التحقق من صحة تاريخ الميلاد
    const century = nationalId[0] === '2' ? '19' : '20';
    const year = century + nationalId.substr(1, 2);
    const month = nationalId.substr(3, 2);
    const day = nationalId.substr(5, 2);
    
    const date = new Date(+year, +month - 1, +day);
    return date.getFullYear() == +year && 
           date.getMonth() == +month - 1 && 
           date.getDate() == +day;
  }

  defaultMessage() {
    return 'الرقم القومي المصري غير صحيح';
  }
}

export const IsEgyptianId = () => 
  ValidateBy({ validator: IsEgyptianIdConstraint });`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorators */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950/50 dark:to-purple-900/50 p-12 rounded-3xl border-4 border-indigo-300 dark:border-indigo-700 mb-12">
                    <div className="flex items-center space-x-6 space-x-reverse mb-8">
                      <Puzzle className="w-16 h-16 text-indigo-600" />
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        Decorators (المزخرفات)
                      </h3>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                      {[
                        {
                          title: "Route Decorators",
                          color: "blue",
                          items: [
                            "@Controller()",
                            "@Get()",
                            "@Post()",
                            "@Put()",
                            "@Delete()",
                            "@Patch()",
                          ],
                        },
                        {
                          title: "Parameter Decorators",
                          color: "green",
                          items: [
                            "@Body()",
                            "@Param()",
                            "@Query()",
                            "@Headers()",
                            "@Request()",
                            "@Response()",
                          ],
                        },
                        {
                          title: "Validation Decorators",
                          color: "purple",
                          items: [
                            "@IsEmail()",
                            "@IsNotEmpty()",
                            "@IsNumber()",
                            "@Length()",
                            "@Min()",
                            "@Max()",
                          ],
                        },
                      ].map((category, index) => (
                        <div
                          key={index}
                          className={`bg-white/90 dark:bg-slate-800/90 p-8 rounded-2xl border-2 border-${category.color}-300 dark:border-${category.color}-700`}
                        >
                          <h4
                            className={`text-2xl font-bold text-${category.color}-600 mb-6`}
                          >
                            {category.title}
                          </h4>
                          <div className="space-y-3">
                            {category.items.map((item, i) => (
                              <div
                                key={i}
                                className={`p-3 bg-${category.color}-50 dark:bg-${category.color}-950/30 rounded-lg`}
                              >
                                <code
                                  className={`text-${category.color}-700 dark:text-${category.color}-300 font-mono text-lg`}
                                >
                                  {item}
                                </code>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Swagger Documentation */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-950/50 dark:to-orange-900/50 p-12 rounded-3xl border-4 border-yellow-300 dark:border-yellow-700">
                    <div className="flex items-center space-x-6 space-x-reverse mb-8">
                      <BookOpen className="w-16 h-16 text-yellow-600" />
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        Swagger API Documentation
                      </h3>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                          مميزات Swagger:
                        </h4>
                        <div className="space-y-4">
                          {[
                            { icon: Search, text: "توثيق تفاعلي للـ API" },
                            { icon: Code, text: "اختبار الـ Endpoints مباشرة" },
                            { icon: FileText, text: "توليد الوثائق تلقائياً" },
                            { icon: Users, text: "سهولة التعاون بين الفرق" },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-4 space-x-reverse p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl"
                            >
                              <item.icon className="w-8 h-8 text-yellow-600" />
                              <span className="text-xl text-slate-700 dark:text-slate-300">
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                          Swagger Decorators:
                        </h4>
                        <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl">
                          <pre className="text-white text-sm overflow-x-auto">
                            {`@Controller('users')
@ApiTags('إدارة المستخدمين')
export class UsersController {
  
  @Post()
  @ApiOperation({ 
    summary: 'إنشاء مستخدم جديد',
    description: 'إنشاء حساب متبرع أو مستشفى جديد'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'تم إنشاء المستخدم بنجاح',
    type: User 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'بيانات غير صحيحة' 
  })
  @ApiBearerAuth()
  async create(
    @Body() 
    @ApiBody({ 
      description: 'بيانات المستخدم الجديد',
      type: CreateUserDto 
    })
    createUserDto: CreateUserDto
  ) {
    return this.usersService.create(createUserDto);
  }
}`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-8 bg-gradient-to-r from-yellow-200 to-orange-200 dark:from-yellow-900/50 dark:to-orange-900/50 rounded-2xl">
                      <div className="text-center">
                        <Globe className="w-12 h-12 text-yellow-700 mx-auto mb-4" />
                        <h5 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                          الوصول لتوثيق API
                        </h5>
                        <p className="text-xl text-slate-700 dark:text-slate-300 mb-4">
                          يمكن الوصول لتوثيق Swagger من خلال:
                        </p>
                        <div className="bg-slate-900 rounded-lg p-4 inline-block">
                          <code className="text-green-400 text-lg">
                            http://localhost:3000/api/docs
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-950/50 dark:to-cyan-900/50 p-12 rounded-3xl border-4 border-teal-300 dark:border-teal-700">
                    <div className="flex items-center space-x-6 space-x-reverse mb-8">
                      <CheckCircle className="w-16 h-16 text-teal-600" />
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        أفضل الممارسات في NestJS
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        {
                          title: "هيكل المشروع",
                          items: [
                            "فصل الـ Modules بوضوح",
                            "استخدام Feature Modules",
                            "تنظيم الملفات حسب الوظيفة",
                            "فصل الـ Shared Modules",
                          ],
                        },
                        {
                          title: "معالجة الأخطاء",
                          items: [
                            "استخدام Exception Filters",
                            "رسائل خطأ واضحة بالعربية",
                            "تسجيل الأخطاء (Logging)",
                            "إرجاع HTTP Status صحيح",
                          ],
                        },
                        {
                          title: "الأمان",
                          items: [
                            "استخدام Guards للمصادقة",
                            "تطبيق CORS بحذر",
                            "تشفير كلمات المرور",
                            "Rate Limiting للحماية",
                          ],
                        },
                      ].map((section, index) => (
                        <div
                          key={index}
                          className="bg-white/90 dark:bg-slate-800/90 p-8 rounded-2xl"
                        >
                          <h4 className="text-2xl font-bold text-teal-600 mb-6">
                            {section.title}
                          </h4>
                          <ul className="space-y-3">
                            {section.items.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start space-x-3 space-x-reverse"
                              >
                                <CheckCircle className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
                                <span className="text-lg text-slate-700 dark:text-slate-300">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Introduction */}
              {activeSection === "introduction" && (
                <div className="space-y-12">
                  <div className="flex items-center space-x-6 space-x-reverse mb-8">
                    <FileText className="w-16 h-16 text-red-600" />
                    <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
                      مقدمة عن منصة إحياء
                    </h2>
                  </div>

                  <div className="prose prose-2xl max-w-none text-slate-700 dark:text-slate-300">
                    <p className="text-3xl leading-relaxed mb-8">
                      مرحباً بكم في منصة إحياء للتبرع بالدم - المنصة الرائدة في
                      مصر لربط المتبرعين بالمحتاجين لإنقاذ الأرواح.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-12">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 p-10 rounded-2xl border-2 border-red-200 dark:border-red-800">
                        <Heart className="w-16 h-16 text-red-600 mb-6" />
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                          رؤيتنا
                        </h3>
                        <p className="text-xl text-slate-700 dark:text-slate-300">
                          بناء شبكة فعالة وموثوقة للتبرع بالدم تضمن وصول الدم
                          للمحتاجين في الوقت المناسب.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 p-10 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800">
                        <Shield className="w-16 h-16 text-emerald-600 mb-6" />
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                          مهمتنا
                        </h3>
                        <p className="text-xl text-slate-700 dark:text-slate-300">
                          توفير منصة آمنة وموثوقة تضمن أعلى معايير المصداقية في
                          عمليات التبرع بالدم.
                        </p>
                      </div>
                    </div>

                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
                      المميزات الرئيسية
                    </h3>
                    <div className="grid gap-6">
                      {[
                        {
                          icon: CheckCircle,
                          text: "تسجيل آمن للمتبرعين مع التحقق من البيانات",
                        },
                        {
                          icon: Hospital,
                          text: "ربط مباشر بين المستشفيات والمتبرعين",
                        },
                        { icon: Eye, text: "نظام مراجعة صارم لضمان المصداقية" },
                        { icon: Phone, text: "خدمة طوارئ متاحة 24/7" },
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-6 space-x-reverse p-8 bg-slate-50 dark:bg-slate-700/50 rounded-2xl"
                        >
                          <feature.icon className="w-12 h-12 text-red-600" />
                          <span className="text-2xl text-slate-700 dark:text-slate-300">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Donors Guide */}
              {activeSection === "donors" && (
                <div className="space-y-12">
                  <div className="flex items-center space-x-6 space-x-reverse mb-8">
                    <Users className="w-16 h-16 text-red-600" />
                    <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
                      دليل المتبرعين
                    </h2>
                  </div>

                  <div className="space-y-10">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 p-10 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                        خطوات التسجيل
                      </h3>
                      <ol className="list-decimal list-inside space-y-4 text-slate-700 dark:text-slate-300 text-xl">
                        <li>اذهب إلى صفحة التسجيل من الرابط الرئيسي</li>
                        <li>اختر متبرع من قائمة أنواع المستخدمين</li>
                        <li>املأ البيانات الشخصية بدقة</li>
                        <li>ارفع المستندات المطلوبة (البطاقة، شهادة طبية)</li>
                        <li>انتظر مراجعة المراجع المختص</li>
                        <li>استلم تأكيد التفعيل عبر البريد الإلكتروني</li>
                      </ol>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 p-10 rounded-2xl border-2 border-green-200 dark:border-green-800">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                        شروط التبرع
                      </h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                            العمر والوزن
                          </h4>
                          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 text-xl">
                            <li>العمر: 18-65 سنة</li>
                            <li>الوزن: أكثر من 50 كيلو</li>
                            <li>صحة جيدة عامة</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                            الفترات الزمنية
                          </h4>
                          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 text-xl">
                            <li>فترة 8 أسابيع بين التبرعات</li>
                            <li>صيام 8 ساعات قبل التبرع</li>
                            <li>نوم كافي ليلة التبرع</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hospitals Guide */}
              {activeSection === "hospitals" && (
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 space-x-reverse mb-6">
                    <Hospital className="w-8 h-8 text-red-600" />
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      دليل المستشفيات
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        إنشاء حالة طبية
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className="bg-purple-200 dark:bg-purple-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-purple-800 dark:text-purple-200 font-bold text-sm">
                              1
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">
                              تسجيل الدخول للوحة التحكم
                            </h4>
                            <p className="text-slate-700 dark:text-slate-300">
                              استخدم بيانات المستشفى للوصول للوحة التحكم
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className="bg-purple-200 dark:bg-purple-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-purple-800 dark:text-purple-200 font-bold text-sm">
                              2
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">
                              إضافة حالة جديدة
                            </h4>
                            <p className="text-slate-700 dark:text-slate-300">
                              املأ بيانات المريض ونوع الدم المطلوب
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className="bg-purple-200 dark:bg-purple-800 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-purple-800 dark:text-purple-200 font-bold text-sm">
                              3
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">
                              رفع المستندات الطبية
                            </h4>
                            <p className="text-slate-700 dark:text-slate-300">
                              أرفق التقارير والتحاليل اللازمة
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        <AlertTriangle className="w-6 h-6 text-orange-600 inline-block mr-2" />
                        متطلبات مهمة
                      </h3>
                      <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                        <li className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>ترخيص المستشفى ساري المفعول</span>
                        </li>
                        <li className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>تقرير طبي مفصل للحالة</span>
                        </li>
                        <li className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>موافقة المريض أو الولي</span>
                        </li>
                        <li className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>تحديد نوع الدم وكميته بدقة</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Observers Guide */}
              {activeSection === "observers" && (
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 space-x-reverse mb-6">
                    <Eye className="w-8 h-8 text-red-600" />
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      دليل المراجعين
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/50 dark:to-teal-900/50 p-6 rounded-xl border border-teal-200 dark:border-teal-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        مسؤوليات المراجع
                      </h3>
                      <div className="grid gap-4">
                        {[
                          "مراجعة طلبات تسجيل المتبرعين الجدد",
                          "التحقق من صحة المستندات المرفوعة",
                          "مراجعة الحالات الطبية من المستشفيات",
                          "ضمان التزام الجميع بمعايير النظام",
                          "حل النزاعات والمشاكل التقنية",
                          "تقديم التقارير الدورية للإدارة",
                        ].map((responsibility, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 space-x-reverse p-3 bg-white/70 dark:bg-slate-700/50 rounded-lg"
                          >
                            <div className="w-6 h-6 bg-teal-200 dark:bg-teal-800 rounded-full flex items-center justify-center">
                              <span className="text-teal-800 dark:text-teal-200 font-bold text-xs">
                                {index + 1}
                              </span>
                            </div>
                            <span className="text-slate-700 dark:text-slate-300">
                              {responsibility}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        أدوات المراجعة
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            قوائم التحقق
                          </h4>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-sm">
                            <li>• مراجعة البيانات الشخصية</li>
                            <li>• التحقق من المستندات</li>
                            <li>• فحص الحالة الطبية</li>
                            <li>• تأكيد الهوية</li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            أدوات الاتصال
                          </h4>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-sm">
                            <li>• نظام الرسائل الداخلي</li>
                            <li>• التنبيهات الفورية</li>
                            <li>• تقارير التقدم</li>
                            <li>• سجل الأنشطة</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Admins Guide */}
              {activeSection === "admins" && (
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 space-x-reverse mb-6">
                    <Settings className="w-8 h-8 text-red-600" />
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      دليل المديرين
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        صلاحيات المدير العامة
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                            إدارة المستخدمين
                          </h4>
                          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                            <li className="flex items-center space-x-2 space-x-reverse">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>إضافة وحذف المستخدمين</span>
                            </li>
                            <li className="flex items-center space-x-2 space-x-reverse">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>تعديل الصلاحيات</span>
                            </li>
                            <li className="flex items-center space-x-2 space-x-reverse">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>مراقبة الأنشطة</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                            إدارة النظام
                          </h4>
                          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                            <li className="flex items-center space-x-2 space-x-reverse">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>النسخ الاحتياطية</span>
                            </li>
                            <li className="flex items-center space-x-2 space-x-reverse">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>تحديثات الأمان</span>
                            </li>
                            <li className="flex items-center space-x-2 space-x-reverse">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>مراقبة الأداء</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy & Security */}
              {activeSection === "privacy" && (
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 space-x-reverse mb-6">
                    <Shield className="w-8 h-8 text-red-600" />
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      الخصوصية والأمان
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 p-6 rounded-xl border border-red-200 dark:border-red-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        حماية البيانات
                      </h3>
                      <div className="grid gap-4">
                        {[
                          {
                            icon: Shield,
                            text: "تشفير جميع البيانات الحساسة",
                            desc: "نستخدم تشفير SSL/TLS للحماية الكاملة",
                          },
                          {
                            icon: Eye,
                            text: "المراجعة المستمرة",
                            desc: "فريق أمن يراقب النظام على مدار الساعة",
                          },
                          {
                            icon: CheckCircle,
                            text: "النسخ الاحتياطية",
                            desc: "نسخ احتياطية يومية للبيانات المهمة",
                          },
                          {
                            icon: AlertTriangle,
                            text: "التنبيهات الأمنية",
                            desc: "إشعارات فورية في حالة أي نشاط مشبوه",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 space-x-reverse p-4 bg-white/70 dark:bg-slate-700/50 rounded-lg"
                          >
                            <item.icon className="w-6 h-6 text-red-600 mt-1" />
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white">
                                {item.text}
                              </h4>
                              <p className="text-slate-600 dark:text-slate-400 text-sm">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/50 dark:to-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        سياسة الخصوصية
                      </h3>
                      <div className="space-y-4 text-slate-700 dark:text-slate-300">
                        <p>
                          نحن في منصة إحياء نلتزم بحماية خصوصيتكم وأمان
                          بياناتكم:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mr-4">
                          <li>لا نشارك بياناتكم الشخصية مع أطراف ثالثة</li>
                          <li>نستخدم البيانات فقط لأغراض التبرع بالدم</li>
                          <li>يمكنكم حذف حسابكم وبياناتكم في أي وقت</li>
                          <li>نحترم حقوقكم في الوصول وتعديل البيانات</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Authentication & Authorization */}
              {activeSection === "auth" && (
                <div className="space-y-12">
                  <div className="flex items-center space-x-6 space-x-reverse mb-8">
                    <Shield className="w-16 h-16 text-red-600" />
                    <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
                      المصادقة والتفويض
                    </h2>
                  </div>

                  {/* Authentication vs Authorization */}
                  <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 p-12 rounded-3xl border-4 border-blue-300 dark:border-blue-700">
                      <div className="flex items-center space-x-6 space-x-reverse mb-8">
                        <UserCheck className="w-16 h-16 text-blue-600" />
                        <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                          Authentication
                        </h3>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                          من هو هذا المستخدم؟
                        </h4>
                        <ul className="space-y-3 text-xl text-slate-700 dark:text-slate-300">
                          <li className="flex items-center space-x-3 space-x-reverse">
                            <Fingerprint className="w-6 h-6 text-blue-600" />
                            <span>التحقق من هوية المستخدم</span>
                          </li>
                          <li className="flex items-center space-x-3 space-x-reverse">
                            <Key className="w-6 h-6 text-blue-600" />
                            <span>إدخال اسم المستخدم وكلمة المرور</span>
                          </li>
                          <li className="flex items-center space-x-3 space-x-reverse">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                            <span>إصدار JWT Token</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 p-12 rounded-3xl border-4 border-green-300 dark:border-green-700">
                      <div className="flex items-center space-x-6 space-x-reverse mb-8">
                        <ShieldCheck className="w-16 h-16 text-green-600" />
                        <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                          Authorization
                        </h3>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-2xl font-bold text-green-700 dark:text-green-300">
                          ماذا يمكن أن يفعل؟
                        </h4>
                        <ul className="space-y-3 text-xl text-slate-700 dark:text-slate-300">
                          <li className="flex items-center space-x-3 space-x-reverse">
                            <Crown className="w-6 h-6 text-green-600" />
                            <span>تحديد الصلاحيات والأدوار</span>
                          </li>
                          <li className="flex items-center space-x-3 space-x-reverse">
                            <Ban className="w-6 h-6 text-green-600" />
                            <span>منع أو السماح بالوصول</span>
                          </li>
                          <li className="flex items-center space-x-3 space-x-reverse">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                            <span>حماية الموارد الحساسة</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* JWT Tokens Explanation */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950/50 dark:to-indigo-900/50 p-12 rounded-3xl border-4 border-purple-300 dark:border-purple-700 mb-12">
                    <div className="flex items-center space-x-6 space-x-reverse mb-8">
                      <Key className="w-16 h-16 text-purple-600" />
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        JWT Tokens (JSON Web Tokens)
                      </h3>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                          هيكل JWT Token:
                        </h4>
                        <div className="space-y-4">
                          <div className="p-6 bg-red-100 dark:bg-red-950/30 rounded-xl border-2 border-red-300 dark:border-red-700">
                            <h5 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">
                              Header
                            </h5>
                            <p className="text-lg text-slate-700 dark:text-slate-300">
                              معلومات التشفير ونوع التوكن
                            </p>
                          </div>
                          <div className="p-6 bg-green-100 dark:bg-green-950/30 rounded-xl border-2 border-green-300 dark:border-green-700">
                            <h5 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">
                              Payload
                            </h5>
                            <p className="text-lg text-slate-700 dark:text-slate-300">
                              بيانات المستخدم والصلاحيات
                            </p>
                          </div>
                          <div className="p-6 bg-blue-100 dark:bg-blue-950/30 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                            <h5 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                              Signature
                            </h5>
                            <p className="text-lg text-slate-700 dark:text-slate-300">
                              التوقيع الرقمي للتحقق
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                          مثال JWT Payload:
                        </h4>
                        <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl">
                          <pre className="text-white text-sm overflow-x-auto">
                            {`{
  "sub": "user-uuid-here",
  "email": "ahmed@example.com",
  "name": "أحمد محمد",
  "role": "DONOR",
  "bloodType": "O+",
  "isActive": true,
  "iat": 1640995200,
  "exp": 1640998800
}`}
                          </pre>
                        </div>
                        <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-950/30 rounded-lg">
                          <p className="text-lg text-yellow-800 dark:text-yellow-300">
                            <strong>ملاحظة:</strong> لا تضع معلومات حساسة في الـ
                            Payload لأنها قابلة للقراءة
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Access Token vs Refresh Token */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-900/50 p-12 rounded-3xl border-4 border-orange-300 dark:border-orange-700 mb-12">
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                      Access Token vs Refresh Token
                    </h3>

                    <div className="grid lg:grid-cols-2 gap-10">
                      {/* Access Token */}
                      <div className="bg-white/90 dark:bg-slate-800/90 p-10 rounded-2xl border-2 border-orange-300 dark:border-orange-700">
                        <div className="flex items-center space-x-6 space-x-reverse mb-6">
                          <CreditCard className="w-12 h-12 text-orange-600" />
                          <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Access Token
                          </h4>
                        </div>

                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                              <Timer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                              <p className="text-lg font-bold text-slate-900 dark:text-white">
                                المدة
                              </p>
                              <p className="text-orange-700 dark:text-orange-300">
                                15 دقيقة
                              </p>
                            </div>
                            <div className="text-center p-4 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                              <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                              <p className="text-lg font-bold text-slate-900 dark:text-white">
                                الاستخدام
                              </p>
                              <p className="text-orange-700 dark:text-orange-300">
                                الوصول للـ API
                              </p>
                            </div>
                          </div>

                          <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
                            <li>• يُستخدم للوصول للموارد المحمية</li>
                            <li>• مدة انتهاء قصيرة للأمان</li>
                            <li>• يُرسل مع كل طلب API</li>
                            <li>• يحتوي على معلومات المستخدم</li>
                          </ul>

                          <div className="bg-slate-900 dark:bg-slate-950 p-4 rounded-lg">
                            <div className="text-orange-400 text-sm mb-2">{`// استخدام Access Token`}</div>
                            <pre className="text-white text-xs overflow-x-auto">
                              {`Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Refresh Token */}
                      <div className="bg-white/90 dark:bg-slate-800/90 p-10 rounded-2xl border-2 border-red-300 dark:border-red-700">
                        <div className="flex items-center space-x-6 space-x-reverse mb-6">
                          <RefreshCw className="w-12 h-12 text-red-600" />
                          <h4 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Refresh Token
                          </h4>
                        </div>

                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-red-100 dark:bg-red-950/30 rounded-lg">
                              <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                              <p className="text-lg font-bold text-slate-900 dark:text-white">
                                المدة
                              </p>
                              <p className="text-red-700 dark:text-red-300">
                                7 أيام
                              </p>
                            </div>
                            <div className="text-center p-4 bg-red-100 dark:bg-red-950/30 rounded-lg">
                              <Key className="w-8 h-8 text-red-600 mx-auto mb-2" />
                              <p className="text-lg font-bold text-slate-900 dark:text-white">
                                الاستخدام
                              </p>
                              <p className="text-red-700 dark:text-red-300">
                                تجديد التوكن
                              </p>
                            </div>
                          </div>

                          <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
                            <li>• يُستخدم لتجديد Access Token</li>
                            <li>• مدة انتهاء أطول</li>
                            <li>• يُحفظ بشكل آمن</li>
                            <li>• يمكن إلغاؤه من الخادم</li>
                          </ul>

                          <div className="bg-slate-900 dark:bg-slate-950 p-4 rounded-lg">
                            <div className="text-red-400 text-sm mb-2">{`// تجديد التوكن`}</div>
                            <pre className="text-white text-xs overflow-x-auto">
                              {`POST /auth/refresh
{
  "refreshToken": "abc123..."
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Authentication Flow */}
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-950/50 dark:to-cyan-900/50 p-12 rounded-3xl border-4 border-teal-300 dark:border-teal-700 mb-12">
                    <div className="flex items-center space-x-6 space-x-reverse mb-8">
                      <Workflow className="w-16 h-16 text-teal-600" />
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        تدفق المصادقة (Authentication Flow)
                      </h3>
                    </div>

                    <div className="grid gap-6">
                      {[
                        {
                          step: 1,
                          title: "تسجيل الدخول",
                          description:
                            "المستخدم يُدخل البريد الإلكتروني وكلمة المرور",
                          icon: UserCheck,
                          color: "blue",
                        },
                        {
                          step: 2,
                          title: "التحقق من البيانات",
                          description:
                            "الخادم يتحقق من صحة البيانات في قاعدة البيانات",
                          icon: Database,
                          color: "green",
                        },
                        {
                          step: 3,
                          title: "إنشاء التوكنز",
                          description:
                            "إنشاء Access Token (15 دقيقة) و Refresh Token (7 أيام)",
                          icon: Key,
                          color: "purple",
                        },
                        {
                          step: 4,
                          title: "إرسال التوكنز",
                          description:
                            "إرسال التوكنز للعميل مع HttpOnly Cookie للـ Refresh Token",
                          icon: CreditCard,
                          color: "orange",
                        },
                        {
                          step: 5,
                          title: "استخدام Access Token",
                          description:
                            "العميل يُرسل Access Token مع كل طلب API",
                          icon: Shield,
                          color: "red",
                        },
                        {
                          step: 6,
                          title: "تجديد التوكن",
                          description:
                            "عند انتهاء Access Token، استخدام Refresh Token لتجديده",
                          icon: RefreshCw,
                          color: "teal",
                        },
                      ].map((flow, index) => (
                        <div
                          key={index}
                          className={`flex items-start space-x-6 space-x-reverse p-8 bg-white/90 dark:bg-slate-800/90 rounded-2xl border-2 border-${flow.color}-300 dark:border-${flow.color}-700`}
                        >
                          <div
                            className={`bg-${flow.color}-100 dark:bg-${flow.color}-950/30 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <span
                              className={`text-2xl font-bold text-${flow.color}-700 dark:text-${flow.color}-300`}
                            >
                              {flow.step}
                            </span>
                          </div>
                          <flow.icon
                            className={`w-12 h-12 text-${flow.color}-600 flex-shrink-0 mt-2`}
                          />
                          <div>
                            <h4
                              className={`text-2xl font-bold text-${flow.color}-700 dark:text-${flow.color}-300 mb-2`}
                            >
                              {flow.title}
                            </h4>
                            <p className="text-xl text-slate-700 dark:text-slate-300">
                              {flow.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Role-Based Access Control */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950/50 dark:to-purple-900/50 p-12 rounded-3xl border-4 border-indigo-300 dark:border-indigo-700 mb-12">
                    <div className="flex items-center space-x-6 space-x-reverse mb-8">
                      <Crown className="w-16 h-16 text-indigo-600" />
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        الأدوار والصلاحيات (Role-Based Access Control)
                      </h3>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8 mb-10">
                      {[
                        {
                          role: "ADMIN",
                          title: "المدير العام",
                          color: "red",
                          icon: Crown,
                          permissions: [
                            "إدارة جميع المستخدمين",
                            "حذف أي بيانات",
                            "إعدادات النظام",
                            "التقارير الشاملة",
                          ],
                        },
                        {
                          role: "OBSERVER",
                          title: "المراجع",
                          color: "blue",
                          icon: Eye,
                          permissions: [
                            "مراجعة طلبات التسجيل",
                            "قبول/رفض المتبرعين",
                            "مراجعة الحالات الطبية",
                            "تقارير المراجعة",
                          ],
                        },
                        {
                          role: "HOSPITAL",
                          title: "المستشفى",
                          color: "green",
                          icon: Hospital,
                          permissions: [
                            "إضافة حالات طبية",
                            "البحث عن متبرعين",
                            "إدارة طلبات الدم",
                            "تحديث حالة الطلبات",
                          ],
                        },
                        {
                          role: "DONOR",
                          title: "المتبرع",
                          color: "purple",
                          icon: Heart,
                          permissions: [
                            "تحديث البيانات الشخصية",
                            "عرض سجل التبرعات",
                            "الاستجابة لطلبات التبرع",
                            "تحديث الموقع",
                          ],
                        },
                      ].map((roleData, index) => (
                        <div
                          key={index}
                          className={`bg-white/90 dark:bg-slate-800/90 p-8 rounded-2xl border-2 border-${roleData.color}-300 dark:border-${roleData.color}-700`}
                        >
                          <div className="text-center mb-6">
                            <div
                              className={`bg-${roleData.color}-100 dark:bg-${roleData.color}-950/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                            >
                              <roleData.icon
                                className={`w-8 h-8 text-${roleData.color}-600`}
                              />
                            </div>
                            <h4
                              className={`text-2xl font-bold text-${roleData.color}-700 dark:text-${roleData.color}-300 mb-2`}
                            >
                              {roleData.title}
                            </h4>
                            <p
                              className={`text-lg font-mono text-${roleData.color}-600 dark:text-${roleData.color}-400`}
                            >
                              {roleData.role}
                            </p>
                          </div>

                          <ul className="space-y-3">
                            {roleData.permissions.map((permission, i) => (
                              <li
                                key={i}
                                className="flex items-start space-x-3 space-x-reverse"
                              >
                                <CheckCircle
                                  className={`w-5 h-5 text-${roleData.color}-500 mt-1 flex-shrink-0`}
                                />
                                <span className="text-lg text-slate-700 dark:text-slate-300">
                                  {permission}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Role Guard Implementation */}
                    <div className="bg-white/90 dark:bg-slate-800/90 p-10 rounded-2xl">
                      <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                        تطبيق Role Guards في NestJS:
                      </h4>

                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            إنشاء Role Guard:
                          </h5>
                          <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl">
                            <div className="text-indigo-400 text-sm mb-2">{`// roles.guard.ts`}</div>
                            <pre className="text-white text-sm overflow-x-auto">
                              {`@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}`}
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h5 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            استخدام Role Decorator:
                          </h5>
                          <div className="bg-slate-900 dark:bg-slate-950 p-6 rounded-xl">
                            <div className="text-indigo-400 text-sm mb-2">{`// users.controller.ts`}</div>
                            <pre className="text-white text-sm overflow-x-auto">
                              {`@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminUsersController {
  
  @Get()
  @Roles(Role.ADMIN, Role.OBSERVER)
  @ApiOperation({ summary: 'عرض جميع المستخدمين' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'حذف مستخدم' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Best Practices */}
                  <div className="bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-950/50 dark:to-pink-900/50 p-12 rounded-3xl border-4 border-red-300 dark:border-red-700">
                    <div className="flex items-center space-x-6 space-x-reverse mb-8">
                      <ShieldCheck className="w-16 h-16 text-red-600" />
                      <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                        أفضل ممارسات الأمان
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        {
                          title: "حماية كلمات المرور",
                          icon: Lock,
                          items: [
                            "استخدام bcrypt للتشفير",
                            "Salt rounds عالية (12+)",
                            "التحقق من قوة كلمة المرور",
                            "عدم حفظ كلمات المرور الأصلية",
                          ],
                        },
                        {
                          title: "إدارة التوكنز",
                          icon: Key,
                          items: [
                            "Access Token قصير المدى",
                            "Refresh Token في HttpOnly Cookie",
                            "إلغاء التوكنز عند تسجيل الخروج",
                            "تدوير Refresh Tokens",
                          ],
                        },
                        {
                          title: "حماية الـ API",
                          icon: Shield,
                          items: [
                            "Rate Limiting للطلبات",
                            "CORS محدود ومضبوط",
                            "تنظيف وتحقق من البيانات",
                            "HTTPS فقط في الإنتاج",
                          ],
                        },
                        {
                          title: "تسجيل الأنشطة",
                          icon: FileText,
                          items: [
                            "تسجيل محاولات تسجيل الدخول",
                            "مراقبة الأنشطة المشبوهة",
                            "تنبيهات الأمان",
                            "تدقيق العمليات الحساسة",
                          ],
                        },
                        {
                          title: "إدارة الجلسات",
                          icon: Timer,
                          items: [
                            "انتهاء صلاحية تلقائي",
                            "إلغاء الجلسات النشطة",
                            "تسجيل خروج من جميع الأجهزة",
                            "تتبع الأجهزة المتصلة",
                          ],
                        },
                        {
                          title: "التحديات الأمنية",
                          icon: AlertTriangle,
                          items: [
                            "حماية من XSS",
                            "منع SQL Injection",
                            "حماية من CSRF",
                            "تنظيف البيانات المدخلة",
                          ],
                        },
                      ].map((practice, index) => (
                        <div
                          key={index}
                          className="bg-white/90 dark:bg-slate-800/90 p-8 rounded-2xl"
                        >
                          <div className="flex items-center space-x-4 space-x-reverse mb-6">
                            <practice.icon className="w-10 h-10 text-red-600" />
                            <h4 className="text-2xl font-bold text-red-700 dark:text-red-300">
                              {practice.title}
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {practice.items.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start space-x-3 space-x-reverse"
                              >
                                <CheckCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                <span className="text-lg text-slate-700 dark:text-slate-300">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Introduction */}
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 rounded-3xl p-20 text-white">
            <Download className="w-20 h-20 mx-auto mb-10" />
            <h3 className="text-5xl font-bold mb-8">هل تحتاج للتوثيق كملف؟</h3>
            <p className="text-3xl mb-12 opacity-90">
              يمكنكم تحميل دليل الاستخدام الكامل كملف PDF
            </p>
            <button className="bg-white text-red-600 px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-red-50 transition-colors duration-200 flex items-center space-x-4 space-x-reverse mx-auto">
              <Download className="w-8 h-8" />
              <span>تحميل دليل الاستخدام PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16 mt-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-10">
            <Heart
              className="w-12 h-12 text-red-500 mr-4"
              fill="currentColor"
            />
            <h3 className="text-4xl font-bold">منصة إحياء للتبرع بالدم</h3>
          </div>
          <p className="text-2xl text-slate-300 mb-10">
            جميع الحقوق محفوظة © {new Date().getFullYear()} - تم التطوير بحب في
            القاهرة، مصر 🇪🇬
          </p>
          <div className="flex justify-center space-x-8 space-x-reverse">
            <Link
              href="/"
              className="text-xl text-slate-400 hover:text-white transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/contact"
              className="text-xl text-slate-400 hover:text-white transition-colors"
            >
              اتصل بنا
            </Link>
            <Link
              href="/privacy"
              className="text-xl text-slate-400 hover:text-white transition-colors"
            >
              سياسة الخصوصية
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
