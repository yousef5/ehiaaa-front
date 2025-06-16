export interface Observer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  identityNumber?: string;
  taxNumber?: string | null;
  commercialRecord?: string | null;
  birthDate?: string;
  bloodType?: string;
  identityPapers?: string | null;
  cityId?: string | null;
  avatar?: string | null;
  role: string;
  userType: string;
  userStatus: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  city?: City | null;
  statusLogs?: StatusLog[];
}

export interface CreateObserverRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  identityNumber?: string;
  cityId?: string;
  birthDate?: Date;
  bloodType?: string;
  avatar?: string;
  governorateId?: string;
}

export interface CreateObserverResponse {
  message: string;
  observer: Observer;
  createdBy: string;
  createdAt: string;
}

export interface Governorate {
  id: string;
  nameAr: string;
  nameEn: string;
  code: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  cities?: City[];
}

export interface City {
  id: string;
  nameAr: string;
  nameEn: string;
  code: string;
  description: string | null;
  isActive: boolean;
  governorateId: string;
  createdAt: string;
  updatedAt: string;
  governorate?: Governorate;
}

export enum BloodType {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

export interface StatusLog {
  id: string;
  status: string;
  reason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ObserverPaginatedResponse {
  observers?: Observer[];
  pagination?: {
    currentPage: string;
    totalPages: number;
    totalItems: number;
    itemsPerPage: string;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  summary?: {
    total: number;
    active: number;
    inactive: number;
  };
}
