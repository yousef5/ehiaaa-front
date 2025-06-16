export enum BloodType {
  A_POSITIVE = "A_POSITIVE",
  A_NEGATIVE = "A_NEGATIVE",
  B_POSITIVE = "B_POSITIVE",
  B_NEGATIVE = "B_NEGATIVE",
  AB_POSITIVE = "AB_POSITIVE",
  AB_NEGATIVE = "AB_NEGATIVE",
  O_POSITIVE = "O_POSITIVE",
  O_NEGATIVE = "O_NEGATIVE",
}

export interface DonorRegistrationData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  identityNumber: string;
  birthDate: string;
  cityId: string;
  bloodType: BloodType;
  identityPapers: File;
}

export interface DonorUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: string;
  userStatus: string;
  isActive: boolean;
  // Additional fields that may be present but not required for the mock
  address?: string;
  identityNumber?: string;
  birthDate?: string;
  bloodType?: BloodType;
  cityId?: string;
  city?: {
    id: string;
    name: string;
    nameAr: string;
    governorateId: string;
  };
}

export interface DonorRegistrationResponse {
  message: string;
  user: DonorUser;
  documentsUploaded: boolean;
  status: string;
  registeredAt: string;
}
