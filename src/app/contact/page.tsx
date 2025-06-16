"use client";

// =======================================================================================
// 🌟 ULTIMATE CONTACT PAGE - Revolutionary Communication Experience
// =======================================================================================
//
// This is the most advanced contact page featuring:
// ✨ Fixed header/footer layout with premium glass-morphism
// 🎨 Interactive contact form with real-time validation
// 📱 Ultra-responsive design with premium animations
// 🚀 Performance-optimized with smooth micro-interactions
// 🎭 Cinematic visual experience with dynamic elements
//
// Design Philosophy:
// - Seamless communication experience
// - Fixed navigation for optimal UX
// - Interactive form with premium validation
// - Immersive contact information presentation
// - Accessibility-first implementation
// =======================================================================================

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Calendar,
  Heart,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";

// =======================================================================================
// 🎯 CONTACT METHODS DATA
// =======================================================================================
const contactMethods = [
  {
    icon: Phone,
    title: "اتصل بنا مباشرة",
    description: "تحدث مع فريقنا المختص",
    primary: "+966 12 345 6789",
    secondary: "+966 12 345 6780",
    color: "from-emerald-500 to-emerald-600",
    available: "متاح 24/7 للحالات الطارئة",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    description: "راسلنا في أي وقت",
    primary: "info@ehiaaa.org",
    secondary: "support@ehiaaa.org",
    color: "from-blue-500 to-blue-600",
    available: "نرد خلال ساعتين",
  },
  {
    icon: MapPin,
    title: "موقعنا",
    description: "زرنا في مقر المبادرة",
    primary: "شارع الرياض، حي النخيل",
    secondary: "الرياض، المملكة العربية السعودية",
    color: "from-purple-500 to-purple-600",
    available: "مفتوح يومياً",
  },
  {
    icon: MessageCircle,
    title: "الدردشة المباشرة",
    description: "تواصل فوري مع الدعم",
    primary: "متاح على الموقع",
    secondary: "دعم فني مختص",
    color: "from-orange-500 to-orange-600",
    available: "9:00 ص - 6:00 م",
  },
];

// =======================================================================================
// 🎭 WORKING HOURS DATA
// =======================================================================================
const workingHours = [
  { day: "الأحد - الخميس", hours: "9:00 ص - 6:00 م", available: true },
  { day: "الجمعة", hours: "9:00 ص - 1:00 م", available: true },
  { day: "السبت", hours: "مغلق", available: false },
];

// =======================================================================================
// 🎯 FORM VALIDATION
// =======================================================================================
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

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
// 🎯 MAIN CONTACT PAGE COMPONENT
// =======================================================================================
export default function ContactPage() {
  // =======================================================================================
  // 🎭 STATE MANAGEMENT
  // =======================================================================================
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [scrollY, setScrollY] = useState(0);

  // Intersection observers for animations
  const [heroRef, heroVisible] = useIntersectionObserver(0.2);
  const [contactRef, contactVisible] = useIntersectionObserver(0.3);
  const [formRef, formVisible] = useIntersectionObserver(0.2);

  // =======================================================================================
  // 🚀 SCROLL ANIMATION EFFECT
  // =======================================================================================
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // =======================================================================================
  // 🎯 FORM HANDLING
  // =======================================================================================
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!formData.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "بريد إلكتروني غير صحيح";
    if (!formData.subject.trim()) newErrors.subject = "الموضوع مطلوب";
    if (!formData.message.trim()) newErrors.message = "الرسالة مطلوبة";
    else if (formData.message.length < 10)
      newErrors.message = "الرسالة قصيرة جداً (10 أحرف على الأقل)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* 
        🏢 SHARED HEADER COMPONENT
        Using the centralized Header component
      */}
      <Header />

      {/* 
        🎨 IMMERSIVE MAIN CONTENT
        Cinematic experience with animations and interactions
      */}
      <main className="flex-1 pt-20">
        {/* 
          🌟 HERO SECTION - DYNAMIC INTRODUCTION
        */}
        <section
          ref={heroRef}
          className="relative min-h-[60vh] flex items-center overflow-hidden"
        >
          {/* Dynamic Background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-emerald-950/20 dark:to-indigo-950/20"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`
                  absolute w-24 h-24 rounded-full opacity-10
                  bg-gradient-to-br from-emerald-400 to-blue-400
                  animate-pulse
                `}
                style={{
                  top: `${15 + i * 20}%`,
                  left: `${15 + i * 25}%`,
                  animationDelay: `${i * 800}ms`,
                  animationDuration: `${2500 + i * 800}ms`,
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
                  <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                    نحن هنا للاستماع إليك
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                  <span className="text-emerald-600 dark:text-emerald-400">
                    تواصل
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 mr-4">
                    معنا
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                  نحن هنا للإجابة على جميع استفساراتك ومساعدتك في رحلة التبرع
                  بالدم. تواصل معنا بأي طريقة تناسبك وسنكون سعداء بخدمتك
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
                    onClick={() => {
                      document.getElementById("contact-form")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <Send className="h-5 w-5 ml-2" />
                    أرسل رسالة
                  </Button>

                  <Button
                    variant="outline"
                    className={`
                      border-2 border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400
                      px-8 py-6 text-lg rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/50
                      transition-all duration-300 hover:scale-105
                    `}
                    onClick={() => {
                      document.getElementById("contact-info")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <Phone className="h-5 w-5 ml-2" />
                    معلومات الاتصال
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 
          📞 PREMIUM CONTACT METHODS SECTION
        */}
        <section ref={contactRef} id="contact-info" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-950/20" />

          <div className="container mx-auto px-4 relative z-10">
            <div
              className={`
                text-center mb-16 transition-all duration-1000
                ${
                  contactVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                طرق التواصل
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                اختر الطريقة التي تناسبك للتواصل معنا
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={index}
                    className={`
                      group relative p-8 rounded-2xl bg-white dark:bg-gray-800
                      shadow-xl shadow-black/5 dark:shadow-black/20
                      border border-gray-200/50 dark:border-gray-700/50
                      transition-all duration-700 hover:scale-105 hover:-translate-y-2
                      ${
                        contactVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-12"
                      }
                    `}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div
                      className={`
                        w-16 h-16 mb-6 rounded-full flex items-center justify-center
                        bg-gradient-to-br ${method.color} shadow-lg
                        group-hover:scale-110 transition-transform duration-300
                      `}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                      {method.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {method.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {method.primary}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {method.secondary}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 rounded-full">
                      <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm text-emerald-700 dark:text-emerald-300">
                        {method.available}
                      </span>
                    </div>

                    {/* Hover Effect */}
                    <div
                      className={`
                        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                        bg-gradient-to-br ${method.color} transition-opacity duration-300
                        mix-blend-multiply dark:mix-blend-screen
                      `}
                      style={{ opacity: 0.03 }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Working Hours Card */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div
                className={`
                  p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl
                  border border-gray-200/50 dark:border-gray-700/50
                  transition-all duration-1000 delay-500
                  ${
                    contactVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }
                `}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    ساعات العمل
                  </h3>
                </div>

                <div className="space-y-4">
                  {workingHours.map((schedule, index) => (
                    <div
                      key={index}
                      className={`
                        flex justify-between items-center p-4 rounded-lg
                        ${
                          schedule.available
                            ? "bg-emerald-50 dark:bg-emerald-900/20"
                            : "bg-gray-50 dark:bg-gray-700/50"
                        }
                      `}
                    >
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {schedule.day}
                      </span>
                      <span
                        className={`
                          font-semibold
                          ${
                            schedule.available
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-gray-500 dark:text-gray-400"
                          }
                        `}
                      >
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 
          📝 PREMIUM CONTACT FORM SECTION
        */}
        <section ref={formRef} id="contact-form" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div
                className={`
                  text-center mb-16 transition-all duration-1000
                  ${
                    formVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }
                `}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  أرسل رسالة
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  املأ النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن
                </p>
              </div>

              <div
                className={`
                  relative p-8 md:p-12 rounded-3xl bg-white dark:bg-gray-800
                  shadow-2xl border border-gray-200/50 dark:border-gray-700/50
                  transition-all duration-1000 delay-300
                  ${
                    formVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }
                `}
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                      تم إرسال رسالتك بنجاح!
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                      شكراً لتواصلك معنا. سنقوم بالرد عليك خلال ساعتين كحد أقصى.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className={`
                        bg-gradient-to-r from-emerald-600 to-emerald-700
                        hover:from-emerald-700 hover:to-emerald-800
                        text-white px-8 py-4 rounded-full
                        shadow-lg shadow-emerald-500/25 hover:shadow-xl
                        transition-all duration-300 hover:scale-105
                      `}
                    >
                      إرسال رسالة أخرى
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                          الاسم الكامل *
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="أدخل اسمك الكامل"
                          className={`
                            h-12 rounded-xl border-2 transition-all duration-300
                            ${
                              errors.name
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 dark:border-gray-600 focus:border-emerald-500"
                            }
                          `}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                          البريد الإلكتروني *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your@email.com"
                          className={`
                            h-12 rounded-xl border-2 transition-all duration-300
                            ${
                              errors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 dark:border-gray-600 focus:border-emerald-500"
                            }
                          `}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone and Subject Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                          رقم الهاتف (اختياري)
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+966 XX XXX XXXX"
                          className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-500 transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                          موضوع الرسالة *
                        </label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            handleInputChange("subject", e.target.value)
                          }
                          placeholder="ما موضوع استفسارك؟"
                          className={`
                            h-12 rounded-xl border-2 transition-all duration-300
                            ${
                              errors.subject
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 dark:border-gray-600 focus:border-emerald-500"
                            }
                          `}
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.subject}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                      >
                        الرسالة *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="اكتب رسالتك هنا... (10 أحرف على الأقل)"
                        rows={6}
                        className={`
                          rounded-xl border-2 transition-all duration-300 resize-none
                          ${
                            errors.message
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-200 dark:border-gray-600 focus:border-emerald-500"
                          }
                        `}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formData.message.length}/500 حرف
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        w-full h-14 text-lg font-semibold rounded-xl
                        bg-gradient-to-r from-emerald-600 to-emerald-700
                        hover:from-emerald-700 hover:to-emerald-800
                        disabled:from-gray-400 disabled:to-gray-500
                        shadow-xl shadow-emerald-500/25 hover:shadow-2xl
                        transition-all duration-300 hover:scale-[1.02]
                        disabled:cursor-not-allowed disabled:scale-100
                      `}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>جارٍ الإرسال...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="h-5 w-5" />
                          <span>إرسال الرسالة</span>
                        </div>
                      )}
                    </Button>
                  </form>
                )}
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
              انضم إلى مهمتنا النبيلة
            </h2>
            <p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto">
              كن جزءاً من حركة عالمية لإنقاذ الأرواح. تبرعك بالدم يمكن أن يحدث
              فرقاً حقيقياً في حياة الآخرين
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
                <Link href="/about">تعرف علينا أكثر</Link>
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
                  { href: "/about", label: "من نحن" },
                  { href: "/donate", label: "تبرع الآن" },
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
