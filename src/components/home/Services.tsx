"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Calendar, Users, ChevronRight } from "lucide-react";

const Services = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-emerald-800 dark:text-emerald-400">
          خدماتنا المميزة
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
          <Card className="border-t-4 border-t-yellow-500 shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <HeartPulse className="h-12 w-12 text-emerald-600 dark:text-emerald-500 mb-2" />
              <CardTitle className="text-2xl text-emerald-800 dark:text-emerald-400">
                تبرع منتظم
              </CardTitle>
              <CardDescription>
                جدولة تبرعات دم منتظمة كل 3-4 أشهر
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                التبرع المنتظم بالدم يساعد في إنقاذ المزيد من الأرواح ويساهم في
                تعزيز صحتك أيضًا.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
              >
                <span className="flex items-center justify-center">
                  اقرأ المزيد
                  <ChevronRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-t-4 border-t-yellow-500 shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <Calendar className="h-12 w-12 text-emerald-600 dark:text-emerald-500 mb-2" />
              <CardTitle className="text-2xl text-emerald-800 dark:text-emerald-400">
                مواعيد التبرع
              </CardTitle>
              <CardDescription>جدولة موعد تبرع بالدم مناسب لك</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                نقدم مواعيد مرنة للتبرع بالدم. يمكنك اختيار الوقت والمكان
                المناسب لك من خلال منصتنا.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
              >
                <span className="flex items-center justify-center">
                  احجز موعداً
                  <ChevronRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-t-4 border-t-yellow-500 shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <Users className="h-12 w-12 text-emerald-600 dark:text-emerald-500 mb-2" />
              <CardTitle className="text-2xl text-emerald-800 dark:text-emerald-400">
                انضم إلى المتطوعين
              </CardTitle>
              <CardDescription>كن جزءًا من فريقنا المتطوع</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                نرحب بالمتطوعين للمساعدة في تنظيم حملات التبرع بالدم ونشر الوعي
                حول أهمية التبرع.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
              >
                <span className="flex items-center justify-center">
                  انضم إلينا
                  <ChevronRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
