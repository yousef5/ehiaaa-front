// =======================================================================================
// 🏥 HOSPITAL TYPE DEFINITIONS
// =======================================================================================

export enum HospitalType {
  HOSPITAL = "hospital",
  BLOODBANK = "bloodbank",
}

export interface HospitalRegistrationData {
  type: HospitalType;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  cityId: string;
  identityPapers?: File; // Optional file upload
}

export interface HospitalUser {
  id: string;
  type: HospitalType;
  name: string;
  email: string;
  phone: string;
  address: string;
  cityId: string;
  userType: string;
  role: string;
  userStatus: string;
  isActive: boolean;
  identityPapers?: string[];
  createdAt: string;
  updatedAt: string;
  city?: {
    id: string;
    nameAr: string;
    nameEn: string;
    governorate?: {
      id: string;
      nameAr: string;
      nameEn: string;
    };
  };
}

export interface HospitalRegistrationResponse {
  message: string;
  user: HospitalUser;
  type: HospitalType;
  status: string;
  registeredAt: string;
}
