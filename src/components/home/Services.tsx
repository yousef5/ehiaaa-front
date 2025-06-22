"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  CheckCircle,
  Clock,
  Facebook,
  HeartHandshake,
  Hospital,
  Mail,
  MapPin,
  Send,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

const Services = () => {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          {/* Main Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6">
              <HeartHandshake className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 via-teal-600 to-blue-600 dark:from-emerald-400 dark:via-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
              رؤيتنا
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              نسعى لأن نكون حلقة الوصل الفعّالة بين الحالات المرضية المحتاجة
              لنقل الدم والمتبرعين الكرام
            </p>
          </div>

          {/* Main Mission Card */}
          <div className="mb-16">
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader className="text-center py-12">
                <div className="flex justify-center items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  الجسر الذي يربط بين القلوب
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                  نؤمن بأن كل قطرة دم تُتبرع بها هي قطرة أمل تُضيء حياة إنسان
                  آخر. نحن هنا لنسهل هذا العطاء ونجعله أكثر فعالية وأثراً.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-12 pb-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                          نربط بين المحتاج والمعطي
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          نوفر منصة تقنية متطورة تربط المرضى المحتاجين للدم
                          بأقرب المتبرعين المتوافقين معهم
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                          نسرّع عملية الإنقاذ
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          من خلال نظام الإشعارات الفوري والتنسيق المتقدم، نقلل
                          وقت الانتظار ونزيد فرص النجاة
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                          نبني مجتمع العطاء
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          نخلق شبكة قوية من المتبرعين والمراقبين والمستشفيات
                          لضمان استدامة العمل الإنساني
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8 text-center">
                      <div className="space-y-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto flex items-center justify-center">
                          <HeartHandshake className="h-10 w-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                          كل تبرع يُحدث فرقاً
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          وحدة دم واحدة يمكنها إنقاذ حياة ثلاثة أشخاص
                        </p>
                        <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                          <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-100"></div>
                          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 rtl:space-x-reverse bg-white dark:bg-gray-800 rounded-full px-8 py-4 shadow-lg">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 px-8"
              >
                ابدأ رحلة العطاء معنا
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                كن جزءاً من التغيير الإيجابي
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Why Blood Donation is Important & How We Work */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-6">
              <Activity className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 dark:from-red-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
              لماذا التبرع بالدم مهم؟
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              نحن ببساطة{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                حلقة وصل
              </span>{" "}
              بين من يحتاج للحياة ومن يستطيع منحها
            </p>
          </div>

          {/* Main Process Flow */}
          <div className="mb-16">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/10 dark:to-pink-950/10">
              <CardHeader className="text-center py-12">
                <CardTitle className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  الهدف الرئيسي من البرنامج
                </CardTitle>
                <CardDescription className="text-xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
                  عندما تصل إلينا حالة مرضية محتاجة للدم من المستشفى، نتحرك
                  فوراً لإنقاذ حياة إنسان في أسرع وقت ممكن
                </CardDescription>
              </CardHeader>
              <CardContent className="px-12 pb-12">
                {/* Process Steps */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
                  {/* Step 1 */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Hospital className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      استقبال الحالة
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      المستشفى ترسل لنا الحالة المرضية المحتاجة للدم
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      مراجعة فورية
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      دراسة سريعة ومراجعة التقرير الطبي في{" "}
                      <span className="font-bold text-red-600">
                        أقل من دقائق
                      </span>
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      تحديد النطاق
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      تحليل المتبرعين حسب القرب الجغرافي من الحالة
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Share2 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                      نشر فوري
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      إيميلات + فيسبوك + تليجرام لكل المتبرعين
                    </p>
                  </div>
                </div>

                {/* Detailed Process */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
                  <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                    كيف نعمل كحلقة وصل؟
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            مراجعة التقرير الطبي
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            فريق المراجعين المتخصص يدرس كل حالة بدقة للتوثيق
                            والتأكد من صحة المعلومات
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            تحليل جغرافي ذكي
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            نحدد المدينة والنطاق الجغرافي ونبحث عن أقرب
                            المتبرعين المتوافقين مع فصيلة الدم المطلوبة
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            تواصل متعدد القنوات
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            إرسال إيميلات مباشرة للمتبرعين المناسبين في المنطقة
                            الجغرافية المحددة
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Facebook className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            نشر فوري على فيسبوك
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            نشر طلب المساعدة على صفحة &ldquo;إحياء&rdquo; على
                            فيسبوك للوصول لأكبر عدد من المتبرعين
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Send className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            تليجرام للتواصل السريع
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            نشر على قناة التليجرام لضمان وصول الرسالة لكل
                            المشتركين بسرعة فائقة
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            متابعة ما بعد التبرع
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            نتابع مع المستشفى استقبال المتبرعين وتسجيلهم في
                            السيستم للتوثيق الكامل
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-8">
                      <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        نحن حلقة وصل... لا أكثر من ذلك
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                        نبذل كل ما في وسعنا لنشر طلب المساعدة إلى كل المتبرعين
                        في أسرع وقت ممكن، لأن كل دقيقة تعني الفرق بين الحياة
                        والموت. هدفنا واحد:
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {" "}
                          ربط من يحتاج بمن يستطيع العطاء
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-6 rtl:space-x-reverse bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-2xl px-12 py-8 shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  كن جزءاً من حلقة الحياة
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  سجل اليوم وكن متبرعاً يُنقذ الأرواح
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white border-0 px-8"
                >
                  انضم للمتبرعين الآن
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
