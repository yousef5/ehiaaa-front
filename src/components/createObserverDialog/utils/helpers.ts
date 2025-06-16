import { CreateObserverFormData } from "../schema";

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Check if it starts with 20 (Egypt country code)
  if (cleaned.startsWith("20")) {
    return `+${cleaned}`;
  }

  // Check if it starts with 0 (local format)
  if (cleaned.startsWith("0")) {
    return `+2${cleaned}`;
  }

  // If it's just 10 digits, assume it's missing the leading 0
  if (cleaned.length === 10) {
    return `+20${cleaned}`;
  }

  return phone;
}

// Validate Egyptian identity number
export function validateEgyptianId(id: string): boolean {
  if (id.length !== 14) return false;

  // Check if all characters are digits
  if (!/^\d{14}$/.test(id)) return false;

  // Extract birth date parts
  const century = id.charAt(0);

  const month = id.substring(3, 5);
  const day = id.substring(5, 7);

  // Validate century (2 for 1900s, 3 for 2000s)
  if (century !== "2" && century !== "3") return false;

  // Validate month
  const monthNum = parseInt(month);
  if (monthNum < 1 || monthNum > 12) return false;

  // Validate day
  const dayNum = parseInt(day);
  if (dayNum < 1 || dayNum > 31) return false;

  return true;
}

// Calculate age from birth date
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Format form data for submission
export function formatFormDataForSubmission(data: CreateObserverFormData) {
  return {
    ...data,
    phone: formatPhoneNumber(data.phone),
    email: data.email.toLowerCase().trim(),
    name: data.name.trim(),
    address: data.address.trim(),
    identityNumber: data.identityNumber.trim(),
    birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
  };
}

// Generate strong password suggestions
export function generatePasswordSuggestions(): string[] {
  const suggestions = [
    "اقتراح كلمة مرور قوية:",
    "• استخدم مزيج من الأحرف الكبيرة والصغيرة",
    "• أضف أرقام ورموز خاصة",
    "• تجنب المعلومات الشخصية",
    "• استخدم على الأقل 8 أحرف",
  ];

  return suggestions;
}

// Validation helpers
export const validationHelpers = {
  isValidEgyptianPhone: (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, "");
    return /^(\+20|20|0)[0-9]{10}$/.test(cleaned);
  },

  isValidEmail: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isStrongPassword: (password: string): boolean => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  },

  isValidArabicName: (name: string): boolean => {
    return /^[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\s]+$/.test(name);
  },
};

// Error message translations
export const errorMessages = {
  NETWORK_ERROR: "خطأ في الاتصال بالخادم، يرجى المحاولة مرة أخرى",
  VALIDATION_ERROR: "يرجى التحقق من البيانات المدخلة",
  SERVER_ERROR: "خطأ في الخادم، يرجى المحاولة لاحقاً",
  UNAUTHORIZED: "غير مصرح لك بهذا الإجراء",
  DUPLICATE_EMAIL: "البريد الإلكتروني مستخدم بالفعل",
  DUPLICATE_PHONE: "رقم الهاتف مستخدم بالفعل",
  DUPLICATE_IDENTITY: "رقم الهوية مستخدم بالفعل",
  INVALID_GOVERNORATE: "المحافظة غير صحيحة",
  INVALID_CITY: "المدينة غير صحيحة",
  // Add translations for specific backend error messages
  "Email already exists": "البريد الإلكتروني مستخدم بالفعل",
  "Phone number already exists": "رقم الهاتف مستخدم بالفعل",
  "Identity number already exists": "رقم الهوية مستخدم بالفعل",
  "Invalid credentials": "بيانات الدخول غير صحيحة",
  "User not found": "المستخدم غير موجود",
  "Invalid password": "كلمة المرور غير صحيحة",
  "Session expired": "انتهت صلاحية الجلسة",
};

// Success message translations
export const successMessages = {
  OBSERVER_CREATED: "تم إنشاء المراقب بنجاح",
  DATA_SAVED: "تم حفظ البيانات بنجاح",
  FORM_SUBMITTED: "تم إرسال النموذج بنجاح",
};
