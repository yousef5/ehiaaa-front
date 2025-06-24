"use client";

import {
  Clock,
  Facebook,
  Heart,
  Hospital,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 dark:from-red-950 dark:via-red-900 dark:to-red-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white rounded-full"></div>
        <div className="absolute bottom-10 left-1/3 w-8 h-8 border border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Top Section with Logo and Mission */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Heart
              className="w-8 h-8 text-yellow-400 mr-3"
              fill="currentColor"
            />
            <h2 className="text-4xl font-bold text-white">إحياء</h2>
            <Heart
              className="w-8 h-8 text-yellow-400 ml-3"
              fill="currentColor"
            />
          </div>
          <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            منصة التبرع بالدم الرائدة في مصر - نربط المتبرعين بالمحتاجين لإنقاذ
            الأرواح وبناء مجتمع أكثر تضامناً
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
              <Heart className="w-6 h-6 mr-2" fill="currentColor" />
              عن إحياء
            </h3>
            <p className="text-red-100 leading-relaxed">
              نحن منصة مصرية متخصصة في تنظيم عمليات التبرع بالدم، نهدف لسد
              الفجوة بين المتبرعين والمحتاجين في جميع أنحاء القاهرة ومصر.
            </p>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-red-700/50 p-3 rounded-full">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="font-semibold text-yellow-400">+50,000</p>
                <p className="text-sm text-red-200">متبرع مسجل</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
              <Hospital className="w-6 h-6 mr-2" />
              خدماتنا
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-red-100 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  className="text-red-100 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  التوثيق والدليل
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-red-100 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  التسجيل في المنصة
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-red-100 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                  تسجيل الدخول
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              أوقات العمل
            </h3>
            <div className="space-y-4">
              <div className="bg-red-700/30 p-4 rounded-lg border border-red-600/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-yellow-400">
                    الأحد - الخميس
                  </span>
                  <span className="text-red-100">24/7</span>
                </div>
                <p className="text-sm text-red-200">
                  خدمة الطوارئ متاحة على مدار الساعة
                </p>
              </div>
              <div className="space-y-2 text-red-100">
                <div className="flex justify-between">
                  <span>الجمعة:</span>
                  <span>9:00 ص - 2:00 م</span>
                </div>
                <div className="flex justify-between">
                  <span>السبت:</span>
                  <span>10:00 ص - 6:00 م</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
              <Phone className="w-6 h-6 mr-2" />
              تواصل معنا
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-red-700/50 p-2 rounded-full mt-1">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">المقر الرئيسي</p>
                  <p className="text-red-100 text-sm">
                    شارع التحرير، وسط البلد، القاهرة، مصر
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-red-700/50 p-2 rounded-full mt-1">
                  <Phone className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">هاتف الطوارئ</p>
                  <p className="text-red-100 text-sm">+20 2 2345 6789</p>
                  <p className="text-red-100 text-sm">+20 10 1234 5678</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-x-reverse">
                <div className="bg-red-700/50 p-2 rounded-full mt-1">
                  <Mail className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">البريد الإلكتروني</p>
                  <p className="text-red-100 text-sm">info@ehyaa-egypt.org</p>
                  <p className="text-red-100 text-sm">
                    emergency@ehyaa-egypt.org
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-16 pt-8 border-t border-red-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6 space-x-reverse">
              <span className="text-red-100">تابعنا على:</span>
              <div className="flex space-x-4 space-x-reverse">
                <a
                  href="https://facebook.com/ehyaa.egypt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-700/50 hover:bg-blue-600 p-3 rounded-full transition-colors duration-300 group"
                >
                  <Facebook className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://t.me/ehyaa_egypt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-700/50 hover:bg-blue-500 p-3 rounded-full transition-colors duration-300 group"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="m9.417 15.181-.397-.131-.964.725A6.816 6.816 0 0 1 6.5 21 6.816 6.816 0 0 1 0 14.5 6.816 6.816 0 0 1 6.5 8 6.816 6.816 0 0 1 13 14.5a6.825 6.825 0 0 1-.582 2.683l-.725.964.131.397.725-.964A7.816 7.816 0 0 0 13 14.5 7.816 7.816 0 0 0 6.5 7 7.816 7.816 0 0 0-1 14.5 7.816 7.816 0 0 0 6.5 22a7.816 7.816 0 0 0 3.182-.681l.964-.725-.131-.397-.964.725z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-red-200 text-sm">
                مرخص من وزارة الصحة المصرية رقم: 2024/EG/HD/001
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-8 border-t border-red-700/50 text-center">
          <div className="bg-red-800/30 backdrop-blur-sm rounded-lg p-6 border border-red-600/30">
            <p className="text-red-100 text-lg mb-2">
              &copy; {new Date().getFullYear()} منصة إحياء للتبرع بالدم - مصر
            </p>
            <p className="text-red-300 text-sm">
              جميع الحقوق محفوظة | تم التطوير بحب في القاهرة، مصر 🇪🇬
            </p>
            <div className="flex justify-center items-center mt-4 space-x-4 space-x-reverse text-sm text-red-200">
              <a
                href="/privacy"
                className="hover:text-yellow-400 transition-colors"
              >
                سياسة الخصوصية
              </a>
              <span>|</span>
              <a
                href="/terms"
                className="hover:text-yellow-400 transition-colors"
              >
                شروط الاستخدام
              </a>
              <span>|</span>
              <a
                href="/help"
                className="hover:text-yellow-400 transition-colors"
              >
                المساعدة
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
