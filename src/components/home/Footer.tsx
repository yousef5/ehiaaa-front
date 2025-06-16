"use client";

const Footer = () => {
  return (
    <footer className="bg-emerald-900 dark:bg-emerald-950 text-white py-16">
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">
              احياء تبرع بالدم
            </h3>
            <p className="text-emerald-200">
              معاً لإنقاذ الأرواح وبناء مجتمع أكثر تضامناً من خلال التبرع بالدم.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-emerald-200 hover:text-yellow-400 transition-colors"
                >
                  من نحن
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-emerald-200 hover:text-yellow-400 transition-colors"
                >
                  تبرع الآن
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-emerald-200 hover:text-yellow-400 transition-colors"
                >
                  اتصل بنا
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-emerald-200 hover:text-yellow-400 transition-colors"
                >
                  الأسئلة الشائعة
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">
              ساعات العمل
            </h3>
            <ul className="space-y-3 text-emerald-200">
              <li>الأحد - الخميس: 9:00 ص - 6:00 م</li>
              <li>الجمعة: 9:00 ص - 1:00 م</li>
              <li>السبت: مغلق</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">
              تواصل معنا
            </h3>
            <ul className="space-y-3 text-emerald-200">
              <li>العنوان: شارع الرياض، حي النخيل، الرياض</li>
              <li>البريد الإلكتروني: info@blooddonation.org</li>
              <li>الهاتف: +966 12 345 6789</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-emerald-700 text-center text-emerald-300">
          &copy; {new Date().getFullYear()} احياء تبرع بالدم. جميع الحقوق
          محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
