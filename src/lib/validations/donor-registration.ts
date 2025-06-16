import { BloodType } from "@/types/donor";
import { z } from "zod";

export const donorRegistrationSchema = z
  .object({
    name: z
      .string()
      .min(2, "الاسم مطلوب")
      .max(100, "الاسم يجب أن لا يتجاوز 100 حرف"),

    email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),

    password: z.string().min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),

    confirmPassword: z.string(),

    phone: z
      .string()
      .regex(/^01[0-9]{9}$/, "رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01"),

    address: z.string().min(10, "العنوان يجب أن يكون 10 أحرف على الأقل"),

    identityNumber: z
      .string()
      .length(14, "رقم الهوية يجب أن يكون 14 رقم بالضبط")
      .regex(/^[0-9]{14}$/, "رقم الهوية يجب أن يحتوي على 14 رقم فقط"),

    birthDate: z.string().min(1, "تاريخ الميلاد مطلوب"),

    governorateId: z.string().min(1, "المحافظة مطلوبة"),

    cityId: z.string().min(1, "المدينة مطلوبة"),

    bloodType: z.nativeEnum(BloodType, { required_error: "فصيلة الدم مطلوبة" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export type DonorRegistrationFormData = z.infer<typeof donorRegistrationSchema>;
