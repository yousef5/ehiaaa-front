import { z } from "zod";

// Validation schema with proper Arabic error messages
export const updateObserverSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم يجب أن يكون على الأقل حرفين")
    .max(100, "الاسم يجب أن يكون أقل من 100 حرف")
    .regex(
      /^[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\s]+$/,
      "يجب أن يحتوي الاسم على أحرف عربية فقط"
    ),

  email: z.string().email("البريد الإلكتروني غير صحيح").toLowerCase(),

  password: z
    .string()
    .optional()
    .refine((val) => {
      // If password is provided, it must meet requirements
      if (val && val.length > 0) {
        return val.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val);
      }
      // If password is empty or undefined, it's valid (no change)
      return true;
    }, "كلمة المرور يجب أن تكون على الأقل 8 أحرف وتحتوي على حرف كبير وصغير ورقم"),

  phone: z
    .string()
    .regex(
      /^(\+20|0)[0-9]{10}$/,
      "رقم الهاتف يجب أن يبدأ بـ +20 أو 0 ويحتوي على 11 رقم"
    ),

  address: z
    .string()
    .min(10, "العنوان يجب أن يكون على الأقل 10 أحرف")
    .max(500, "العنوان يجب أن يكون أقل من 500 حرف"),

  identityNumber: z
    .string()
    .regex(/^[0-9]{14}$/, "رقم الهوية يجب أن يحتوي على 14 رقم بالضبط"),

  governorateId: z.string().min(1, "المحافظة مطلوبة"),

  cityId: z.string().min(1, "المدينة مطلوبة"),

  birthDate: z
    .string()
    .min(1, "تاريخ الميلاد مطلوب")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18 && age <= 65;
    }, "العمر يجب أن يكون بين 18-65 سنة"),

  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    errorMap: () => ({ message: "فصيلة الدم غير صحيحة" }),
  }),
});

export type UpdateObserverFormData = z.infer<typeof updateObserverSchema>;

// Blood type options with proper Arabic labels
export const BLOOD_TYPES = [
  { value: "A+", label: "A+ موجب", color: "bg-red-100 text-red-800" },
  { value: "A-", label: "A- سالب", color: "bg-red-50 text-red-700" },
  { value: "B+", label: "B+ موجب", color: "bg-blue-100 text-blue-800" },
  { value: "B-", label: "B- سالب", color: "bg-blue-50 text-blue-700" },
  { value: "AB+", label: "AB+ موجب", color: "bg-purple-100 text-purple-800" },
  { value: "AB-", label: "AB- سالب", color: "bg-purple-50 text-purple-700" },
  { value: "O+", label: "O+ موجب", color: "bg-green-100 text-green-800" },
  { value: "O-", label: "O- سالب", color: "bg-green-50 text-green-700" },
] as const;

export type BloodType = (typeof BLOOD_TYPES)[number]["value"];
