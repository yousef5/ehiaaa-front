"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Droplet, Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ar } from "date-fns/locale";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "الاسم مطلوب ويجب أن يكون أكثر من حرفين" }),
  phone: z.string().min(10, { message: "رقم الهاتف مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  bloodType: z.string().min(1, { message: "نوع الدم مطلوب" }),
  date: z.date({ required_error: "يرجى اختيار تاريخ للتبرع" }),
  location: z.string().min(1, { message: "مكان التبرع مطلوب" }),
  previousDonation: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function DonatePage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      bloodType: "",
      previousDonation: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    setSubmitted(true);
    // Here you would normally submit to your API
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Droplet className="h-6 w-6 text-red-600 mr-2" />
            <h1 className="text-2xl font-bold">
              <span className="text-red-600">احياء</span> تبرع بالدم
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-6 mr-6">
              <Link href="/" className="text-sm font-medium hover:text-red-600">
                الرئيسية
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-red-600"
              >
                من نحن
              </Link>
              <Link href="/donate" className="text-sm font-medium text-red-600">
                تبرع الآن
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-red-600"
              >
                اتصل بنا
              </Link>
            </nav>
            <ModeToggle />
            <Button asChild>
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="bg-gray-100 dark:bg-gray-800 py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">تبرع الآن</h1>
            <p className="text-xl max-w-3xl mx-auto">
              قم بتسجيل بياناتك لحجز موعد للتبرع بالدم وكن جزءاً من إنقاذ
              الأرواح.
            </p>
          </div>
        </div>

        <div className="container mx-auto py-16">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <Alert className="mb-8 bg-green-50 dark:bg-green-900/20 border-green-600">
                <Check className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-600">
                  تم تسجيل طلبك بنجاح!
                </AlertTitle>
                <AlertDescription>
                  سنقوم بالتواصل معك قريباً لتأكيد موعد التبرع. شكراً لمساهمتك
                  في إنقاذ الأرواح.
                </AlertDescription>
                <Button
                  className="mt-4 bg-green-600 hover:bg-green-700"
                  onClick={() => setSubmitted(false)}
                >
                  العودة للنموذج
                </Button>
              </Alert>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم الكامل</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسمك الكامل" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الجوال</FormLabel>
                          <FormControl>
                            <Input placeholder="05xxxxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your@email.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>فصيلة الدم</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر فصيلة الدم" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                              <SelectItem value="unknown">لا أعرف</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="previousDonation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>هل تبرعت بالدم من قبل؟</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر إجابة" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">نعم</SelectItem>
                              <SelectItem value="no">لا</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>تاريخ التبرع</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-right font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPPP", { locale: ar })
                                  ) : (
                                    <span>اختر تاريخ</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date: Date) =>
                                  date < new Date() ||
                                  date >
                                    new Date(
                                      new Date().setMonth(
                                        new Date().getMonth() + 2
                                      )
                                    )
                                }
                                locale={ar}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            يمكنك اختيار تاريخ خلال الشهرين القادمين
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>مركز التبرع</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر مركز التبرع" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="center1">
                                مركز الرياض الرئيسي
                              </SelectItem>
                              <SelectItem value="center2">
                                مستشفى الملك فهد
                              </SelectItem>
                              <SelectItem value="center3">
                                مركز جدة للتبرع بالدم
                              </SelectItem>
                              <SelectItem value="center4">
                                مركز الدمام للتبرع بالدم
                              </SelectItem>
                              <SelectItem value="center5">
                                المركز الطبي الجامعي
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    تسجيل طلب التبرع
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} احياء تبرع بالدم. جميع الحقوق
            محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
