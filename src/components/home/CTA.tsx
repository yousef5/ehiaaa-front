"use client";

import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 dark:from-emerald-800 dark:to-emerald-700 rounded-2xl p-16 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white">
            هل أنت مستعد للتبرع؟
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto text-emerald-100">
            انضم إلى آلاف المتبرعين الذين ينقذون الأرواح كل يوم. تبرعك بالدم
            يمكن أن يحدث فرقا.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-400 text-emerald-900 px-8 py-6 text-lg rounded-full shadow-lg transition-transform transform hover:scale-105">
            تبرع الآن
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
