"use client";

const Benefits = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="bg-emerald-50 dark:bg-emerald-950 p-16 rounded-2xl mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-emerald-800 dark:text-emerald-400">
            لماذا التبرع بالدم مهم؟
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-8 rounded-xl bg-white dark:bg-card shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-500">
                إنقاذ الأرواح
              </h3>
              <p>
                تبرعك يمكن أن ينقذ حياة ما يصل إلى 3 أشخاص في حالات الطوارئ
                والعمليات الجراحية.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-white dark:bg-card shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-500">
                تجديد الخلايا
              </h3>
              <p>
                التبرع بالدم يحفز الجسم على إنتاج خلايا دم جديدة، مما يعزز صحة
                المتبرع.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-white dark:bg-card shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-500">
                الفحوصات المجانية
              </h3>
              <p>
                يخضع المتبرعون لفحوصات صحية مجانية تساعد في اكتشاف مشاكل صحية
                محتملة.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-white dark:bg-card shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-500">
                تعزيز التضامن
              </h3>
              <p>
                التبرع بالدم يعزز روح التضامن المجتمعي ويشجع على العطاء
                والمساعدة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
