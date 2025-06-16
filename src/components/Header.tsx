"use client";

// =======================================================================================
// 🌟 PROFESSIONAL COMPACT HEADER - Modern & Efficient Design
// =======================================================================================
//
// This header component features:
// ✨ Compact, professional design with optimal space usage
// 🎨 Clean glass-morphism with subtle effects
// 📱 Streamlined mobile navigation
// 🎭 Professional dark/light mode theming
// 🚀 Performance optimized with smooth interactions
// 🧭 Accessible navigation with clear hierarchy
//
// Design Features:
// - Compact layout that maximizes screen real estate
// - Professional glass-morphism with clean aesthetics
// - Efficient mobile menu with quick access
// - Subtle animations and clean transitions
// - Modern brand identity with professional styling
// =======================================================================================

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  User,
  Menu,
  X,
  Home,
  Info,
  Heart,
  Phone,
  LogOut,
  Settings,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  useIsAuthenticated,
  useUser,
  useAuthActions,
} from "@/stores/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// =======================================================================================
// 🎯 NAVIGATION ITEMS CONFIGURATION
// =======================================================================================
const navigationItems = [
  {
    href: "/",
    label: "الرئيسية",
    icon: Home,
    description: "العودة إلى الصفحة الرئيسية",
  },
  {
    href: "/about",
    label: "من نحن",
    icon: Info,
    description: "تعرف على مهمتنا ورؤيتنا",
  },
  {
    href: "/donate",
    label: "تبرع الآن",
    icon: Heart,
    description: "ابدأ رحلة التبرع بالدم",
  },
  {
    href: "/contact",
    label: "اتصل بنا",
    icon: Phone,
    description: "تواصل معنا للاستفسارات",
  },
];

const Header = () => {
  const pathname = usePathname();

  // =======================================================================================
  // 🎭 STATE MANAGEMENT
  // =======================================================================================
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Authentication state
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const { logout } = useAuthActions();

  // =======================================================================================
  // 🎯 UTILITY FUNCTIONS
  // =======================================================================================
  const isActive = (path: string) => pathname === path;

  // Handle async logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails on server, we still want to clear local state
      // The logout function already handles this gracefully
    }
  };

  // Scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* 
        🎨 PROFESSIONAL COMPACT HEADER
        Clean, efficient design with modern aesthetics
      */}
      <header
        className={`
          /* 🎯 POSITIONING & LAYOUT */
          sticky top-0 z-50 w-full
          
          /* 🎨 PROFESSIONAL GLASS MORPHISM */
          ${
            isScrolled
              ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-2xl shadow-sm border-gray-200/60 dark:border-gray-700/60"
              : "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/40 dark:border-gray-700/40"
          }
          
          /* 🌈 CLEAN BORDERS */
          border-b
          
          /* ✨ SMOOTH TRANSITIONS */
          transition-all duration-300 ease-out
          
          /* 📱 COMPACT HEIGHT */
          h-14
        `}
      >
        <div className="container mx-auto h-full px-4">
          <div className="flex items-center justify-between h-full">
            {/* 
              🏢 COMPACT BRAND LOGO SECTION
              Professional styling with clean animations
            */}
            <Link
              href="/"
              className="flex items-center group"
              aria-label="احياء تبرع بالدم - الصفحة الرئيسية"
            >
              {/* Compact Logo */}
              <div className="relative mr-3">
                <Image
                  src="/logo.png"
                  alt="احياء تبرع بالدم"
                  width={28}
                  height={28}
                  className={`
                  h-7 w-7
                  transition-all duration-200 ease-out
                  group-hover:scale-105
                  rounded-md
                `}
                />
              </div>

              {/* Compact Brand Text */}
              <div>
                <h1 className="text-lg font-bold leading-tight">
                  <span className="text-emerald-600 dark:text-emerald-400 transition-colors duration-200">
                    احياء
                  </span>
                </h1>
              </div>
            </Link>

            {/* 
              🧭 COMPACT DESKTOP NAVIGATION
              Professional navigation with clean hover effects
            */}
            <nav className="hidden lg:flex mx-auto">
              <ul className="flex items-center space-x-1 rtl:space-x-reverse">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`
                          relative group px-3 py-2 rounded-lg font-medium text-sm
                          transition-all duration-200 ease-out
                          flex items-center gap-1.5
                          
                          /* 🎨 PROFESSIONAL ACTIVE STATES */
                          ${
                            active
                              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/30"
                              : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50/80 dark:hover:bg-gray-800/30"
                          }
                        `}
                        aria-label={item.description}
                      >
                        {/* Compact Navigation Icon */}
                        <IconComponent className="h-3.5 w-3.5" />

                        {/* Navigation Label */}
                        <span>{item.label}</span>

                        {/* Active Indicator */}
                        {active && (
                          <span
                            className={`
                            absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 
                            w-6 h-0.5 bg-emerald-500 dark:bg-emerald-400
                            rounded-full
                          `}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* 
              📱 COMPACT MOBILE MENU BUTTON
            */}
            <button
              className={`
                lg:hidden p-1.5 rounded-md
                text-gray-700 dark:text-gray-300
                hover:text-emerald-600 dark:hover:text-emerald-400
                hover:bg-gray-100/80 dark:hover:bg-gray-800/50
                transition-all duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20
              `}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative">
                <Menu
                  className={`
                    h-5 w-5 transition-all duration-200
                    ${
                      isMobileMenuOpen
                        ? "rotate-90 opacity-0"
                        : "rotate-0 opacity-100"
                    }
                  `}
                />
                <X
                  className={`
                    h-5 w-5 absolute inset-0 transition-all duration-200
                    ${
                      isMobileMenuOpen
                        ? "rotate-0 opacity-100"
                        : "rotate-90 opacity-0"
                    }
                  `}
                />
              </div>
            </button>

            {/* 
              ⚙️ COMPACT ACTIONS SECTION
              Professional theme toggle and login button
            */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Compact Theme Toggle */}
              <div className="relative">
                <ModeToggle />
              </div>

              {/* Compact Login/User Button */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 px-3 py-1.5 h-8 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200"
                    >
                      {/* User Avatar or Icon */}
                      {user?.avatar ? (
                        <div className="relative h-6 w-6 rounded-full overflow-hidden">
                          <Image
                            src={`${
                              process.env.NEXT_PUBLIC_API_URL ||
                              "http://localhost:3000"
                            }/public/avatars/${user.avatar}`}
                            alt={user.name || "مستخدم"}
                            width={24}
                            height={24}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              // Fallback to User icon if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              target.nextElementSibling?.classList.remove(
                                "hidden"
                              );
                            }}
                          />
                          <User className="h-3.5 w-3.5 text-emerald-600 hidden absolute inset-0 m-auto" />
                        </div>
                      ) : (
                        <User className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user?.name || "مستخدم"}
                      </span>
                      <ChevronDown className="h-3 w-3 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-right">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.name || "مستخدم"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Dashboard Link for Admin */}
                    {user?.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center gap-2 w-full cursor-pointer"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span>لوحة التحكم</span>
                        </Link>
                      </DropdownMenuItem>
                    )}

                    {/* Settings */}
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 w-full cursor-pointer"
                      >
                        <Settings className="h-4 w-4" />
                        <span>الإعدادات</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Logout */}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>تسجيل الخروج</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size="sm"
                  className={`
                    bg-emerald-600 hover:bg-emerald-700
                    dark:bg-emerald-500 dark:hover:bg-emerald-600
                    text-white text-sm font-medium
                    px-4 py-1.5 h-8 rounded-md
                    shadow-sm hover:shadow-md
                    transition-all duration-200 ease-out
                    hover:scale-[1.02] active:scale-[0.98]
                    flex items-center gap-1.5
                    border-0
                  `}
                >
                  <User className="h-3.5 w-3.5" />
                  <Link href="/login" className="font-medium">
                    تسجيل الدخول
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 
        📱 COMPACT MOBILE MENU
        Clean mobile navigation with efficient layout
      */}
      <div
        className={`
          lg:hidden fixed inset-0 z-50
          transition-all duration-300 ease-out
          ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 
            bg-black/40 dark:bg-black/60
            backdrop-blur-sm
            transition-all duration-300
            ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`
            absolute top-0 right-0 h-full w-72 max-w-[85vw]
            bg-white/95 dark:bg-gray-950/95
            backdrop-blur-xl
            border-l border-gray-200/50 dark:border-gray-700/50
            shadow-xl
            transition-all duration-300 ease-out
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              القائمة
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                p-1.5 rounded-md
                text-gray-500 dark:text-gray-400
                hover:text-gray-700 dark:hover:text-gray-200
                hover:bg-gray-100/80 dark:hover:bg-gray-800/50
                transition-all duration-200
              `}
              aria-label="إغلاق القائمة"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Navigation Items */}
          <nav className="p-3 space-y-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group flex items-center gap-3 p-3 rounded-lg
                    transition-all duration-200 ease-out
                    ${
                      active
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/30"
                        : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50/80 dark:hover:bg-gray-800/30"
                    }
                  `}
                >
                  <div
                    className={`
                    p-1.5 rounded-md
                    ${
                      active
                        ? "bg-emerald-100 dark:bg-emerald-900/40"
                        : "bg-gray-100 dark:bg-gray-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20"
                    }
                    transition-all duration-200
                  `}
                  >
                    <IconComponent className="h-4 w-4" />
                  </div>

                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Actions */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-3">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                تبديل السمة
              </span>
              <ModeToggle />
            </div>

            {/* Login/User Section */}
            {isAuthenticated ? (
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <User className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.name || "مستخدم"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className={`
                    w-full
                    border-red-300 dark:border-red-600
                    text-red-600 dark:text-red-400
                    hover:bg-red-50 hover:border-red-400
                    dark:hover:bg-red-950/20 dark:hover:border-red-500
                    text-sm font-medium
                    py-2.5 h-10 rounded-lg
                    transition-all duration-200 ease-out
                    flex items-center justify-center gap-2
                  `}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">تسجيل الخروج</span>
                </Button>
              </div>
            ) : (
              <Button
                className={`
                  w-full
                  bg-emerald-600 hover:bg-emerald-700
                  dark:bg-emerald-500 dark:hover:bg-emerald-600
                  text-white text-sm font-medium
                  py-2.5 h-10 rounded-lg
                  shadow-sm hover:shadow-md
                  transition-all duration-200 ease-out
                  flex items-center justify-center gap-2
                `}
              >
                <User className="h-4 w-4" />
                <Link href="/login" className="font-medium">
                  تسجيل الدخول
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
