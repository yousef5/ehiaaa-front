import type {
  DonorRegistrationData,
  DonorRegistrationResponse,
} from "@/types/donor";
import type {
  HospitalRegistrationData,
  HospitalRegistrationResponse,
} from "@/types/hospital";
import {
  Governorate,
  Observer,
  ObserverPaginatedResponse,
} from "@/types/observer";
import { axiosInstance } from "./axios";

/**
 * Observer API Service
 */
export const observerApi = {
  /**
   * Get all observers with pagination and filtering
   */
  getAllObservers: async (
    status: "active" | "inactive" | "all" = "all",
    page: number = 1,
    limit: number = 10
  ): Promise<ObserverPaginatedResponse> => {
    const response = await axiosInstance.get("/observers", {
      params: {
        status,
        page,
        limit,
        includeCity: true,
        includeGovernorate: true,
      },
    });
    return response.data;
  },

  /**
   * Get observer by ID
   */
  getObserverById: async (observerId: string): Promise<Observer> => {
    const response = await axiosInstance.get(`/observers/${observerId}`);
    return response.data;
  },

  /**
   * Toggle observer active status
   */
  toggleObserverStatus: async (
    observerId: string,
    isActive: boolean
  ): Promise<{ message: string; observer: Observer }> => {
    const response = await axiosInstance.patch(
      `/observers/${observerId}/status`,
      {
        isActive: !isActive,
      }
    );
    return response.data;
  },

  /**
   * Update observer information
   */
  updateObserver: async (
    observerId: string,
    data: Partial<Observer>
  ): Promise<{
    message: string;
    observer: Observer;
    updatedBy: string;
    updatedAt: string;
  }> => {
    const response = await axiosInstance.put(`/observers/${observerId}`, data);
    return response.data;
  },

  /**
   * Delete observer by ID
   */
  deleteObserver: async (observerId: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/observers/${observerId}`);
    return response.data;
  },

  /**
   * Deactivate observer with reason
   */
  deactivateObserver: async (
    observerId: string,
    reason: string
  ): Promise<{
    message: string;
    observer: Observer;
    reason: string;
    deactivatedBy: string;
    deactivatedAt: string;
  }> => {
    const response = await axiosInstance.patch(
      `/observers/${observerId}/deactivate`,
      { reason }
    );
    return response.data;
  },

  /**
   * Activate observer
   */
  activateObserver: async (
    observerId: string
  ): Promise<{
    message: string;
    observer: Observer;
    activatedBy: string;
    activatedAt: string;
  }> => {
    const response = await axiosInstance.patch(
      `/observers/${observerId}/activate`
    );
    return response.data;
  },

  /**
   * Update observer avatar
   */
  updateObserverAvatar: async (
    observerId: string,
    avatarFile: File
  ): Promise<{
    message: string;
    observer: Observer;
    avatarUrl: string;
    previousAvatar: string | null;
    updatedBy: string;
    updatedAt: string;
  }> => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await axiosInstance.put(
      `/observers/${observerId}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Get all governorates with their cities
   */
  getGovernorates: async (): Promise<Governorate[]> => {
    const response = await axiosInstance.get("/governorates?withCities=true");
    return response.data;
  },
};

// =======================================================================================
// 🩸 DONOR REGISTRATION API
// =======================================================================================
export const donorApi = {
  /**
   * Register new donor with identity documents
   */
  registerDonor: async (
    donorData: DonorRegistrationData
  ): Promise<DonorRegistrationResponse> => {
    const formData = new FormData();

    // Append all text fields
    Object.entries(donorData).forEach(([key, value]) => {
      if (key !== "identityPapers") {
        formData.append(key, value as string);
      }
    });

    // Append the file
    formData.append("identityPapers", donorData.identityPapers);

    const response = await axiosInstance.post("/registration/donor", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

// =======================================================================================
// 🏥 HOSPITAL REGISTRATION API
// =======================================================================================
export const hospitalApi = {
  /**
   * Register new hospital or bloodbank
   */
  registerHospital: async (
    hospitalData: HospitalRegistrationData
  ): Promise<HospitalRegistrationResponse> => {
    // For the new API, we send JSON data with file upload optional
    if (hospitalData.identityPapers) {
      const formData = new FormData();

      // Append all text fields
      Object.entries(hospitalData).forEach(([key, value]) => {
        if (key !== "identityPapers") {
          formData.append(key, value as string);
        }
      });

      // Append the file if provided
      formData.append("identityPapers", hospitalData.identityPapers);

      const response = await axiosInstance.post(
        "/registration/hospital",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } else {
      // Send JSON data without file
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { identityPapers, ...dataWithoutFile } = hospitalData;
      const response = await axiosInstance.post(
        "/registration/hospital",
        dataWithoutFile,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    }
  },
};

// =======================================================================================
// 👥 USERS API
// =======================================================================================

export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  userType: "user" | "hospital" | "bloodbank";
  userStatus: "PENDING_DATA_REVIEW" | "ACTIVE" | "REJECTED";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  bloodType?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  birthDate?: string;
  city?: {
    id: string;
    nameAr: string;
    governorate?: {
      id: string;
      nameAr: string;
    };
  };
  statusLogs?: Array<{
    id: string;
    status: string;
    createdAt: string;
  }>;
  observers: UserObserver[];
}

export interface UserObserver {
  uuid: string;
  name: string;
  avatar: string;
  cityNameAr: string;
  governorateNameAr: string;
}

export interface UserFilters {
  page: number;
  limit: number;
  status: "active" | "inactive" | "all";
  approval: "pending" | "approved" | "rejected" | "all";
  userType: "user" | "hospital" | "bloodbank" | "all";
  search?: string;
  cityId?: string;
  governorateId?: string;
}

export interface UserSummary {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  approved: number;
  rejected: number;
  users: {
    total: number;
    active: number;
    inactive: number;
    needApproval: number;
  };
  hospitals: {
    total: number;
    active: number;
    inactive: number;
    needApproval: number;
  };
  bloodBanks: {
    total: number;
    active: number;
    inactive: number;
    needApproval: number;
  };
  approvalSummary: {
    totalNeedingApproval: number;
    usersNeedingApproval: number;
    hospitalsNeedingApproval: number;
    bloodBanksNeedingApproval: number;
  };
}

export interface UsersPaginatedResponse {
  users: UserType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  summary: UserSummary;
}

export interface UserFullData {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    identityNumber?: string;
    taxNumber?: string;
    commercialRecord?: string;
    birthDate: string;
    bloodType?: string;
    identityPapers?: string[];
    cityId: string;
    avatar?: string | null;
    role: string;
    refreshToken?: string | null;
    userType: string;
    userStatus: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    statusLogs: {
      id: string;
      userId: string;
      status: string;
      description: string;
      observerId: string | null;
      createdAt: string;
      updatedAt: string;
    }[];
    city: {
      id: string;
      nameAr: string;
      nameEn: string;
      code: string;
      description?: string | null;
      isActive: boolean;
      governorateId: string;
      createdAt: string;
      updatedAt: string;
      governorate: {
        id: string;
        nameAr: string;
        nameEn: string;
        code: string;
        description: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
  documents: {
    identityPapers: {
      url: string;
      filename: string;
      uploadedAt: string;
      index: number;
    }[];
  };
  reviewInfo: {
    reviewedBy: string;
    reviewedAt: string;
    canApprove: boolean;
    canReject: boolean;
    requiredFields: string[];
  };
  requestedBy: string;
  requestedAt: string;
}

export const usersApi = {
  /**
   * Get all users with filtering and pagination
   */
  getAllUsersWithFilters: async (
    filters: UserFilters
  ): Promise<UsersPaginatedResponse> => {
    // Filter out empty strings and undefined values for API call
    const apiParams = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string | number>);

    const response = await axiosInstance.get("/admin/users", {
      params: apiParams,
    });
    return response.data;
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId: string): Promise<UserType> => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Get full user data with documents and review info
   */
  getFullUserData: async (userId: string): Promise<UserFullData> => {
    const response = await axiosInstance.get(`/admin/users/${userId}/full`);
    return response.data;
  },

  /**
   * Toggle user active status
   */
  toggleUserStatus: async (
    userId: string,
    isActive: boolean
  ): Promise<{ message: string; user: UserType }> => {
    const response = await axiosInstance.patch(
      `/admin/users/${userId}/status`,
      {
        isActive: !isActive,
      }
    );
    return response.data;
  },

  /**
   * Activate user with optional reason
   */
  activateUser: async (
    userId: string,
    reason?: string
  ): Promise<{ message: string; user: UserType }> => {
    const response = await axiosInstance.patch(
      `/admin/users/${userId}/activate`,
      {
        reason,
      }
    );
    return response.data;
  },

  /**
   * Deactivate user with required reason
   */
  deactivateUser: async (
    userId: string,
    reason: string
  ): Promise<{ message: string; user: UserType }> => {
    const response = await axiosInstance.patch(
      `/admin/users/${userId}/deactivate`,
      {
        reason,
      }
    );
    return response.data;
  },

  /**
   * Approve user
   */
  approveUser: async (
    userId: string
  ): Promise<{ message: string; user: UserType }> => {
    const response = await axiosInstance.patch(`/users/${userId}/approve`);
    return response.data;
  },

  /**
   * Reject user
   */
  rejectUser: async (
    userId: string,
    reason: string
  ): Promise<{ message: string; user: UserType }> => {
    const response = await axiosInstance.patch(`/users/${userId}/reject`, {
      reason,
    });
    return response.data;
  },

  /**
   * Delete user
   */
  deleteUser: async (userId: string): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  },

  /**
   * Upload user avatar (admin)
   */
  uploadUserAvatar: async (
    userId: string,
    file: File
  ): Promise<{ message: string; user: UserType }> => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axiosInstance.post(
      `/admin/users/${userId}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Update user avatar (admin)
   */
  updateUserAvatar: async (
    userId: string,
    file: File
  ): Promise<{ message: string; user: UserType }> => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axiosInstance.put(
      `/admin/users/${userId}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Remove user avatar (admin)
   */
  removeUserAvatar: async (
    userId: string
  ): Promise<{ message: string; user: UserType }> => {
    const response = await axiosInstance.delete(
      `/admin/users/${userId}/avatar`
    );
    return response.data;
  },

  /**
   * Upload own avatar (self-service)
   */
  uploadOwnAvatar: async (
    file: File,
    userId: string
  ): Promise<{ message: string; user: UserType }> => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axiosInstance.post(
      `/admin/users/${userId}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Update own avatar (self-service)
   */
  updateOwnAvatar: async (
    file: File,
    userId: string
  ): Promise<{ message: string; user: UserType }> => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await axiosInstance.put(
      `/admin/users/${userId}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Remove own avatar (self-service)
   */
  removeOwnAvatar: async (
    userId: string
  ): Promise<{ message: string; user: UserType }> => {
    const response = await axiosInstance.delete(
      `/admin/users/${userId}/avatar`
    );
    return response.data;
  },

  /**
   * Change user password (admin/observer)
   */
  changeUserPassword: async (
    userId: string,
    newPassword: string,
    reason?: string
  ): Promise<{ message: string; user: UserType }> => {
    const response = await axiosInstance.patch(
      `/admin/users/${userId}/password`,
      {
        newPassword,
        reason,
      }
    );
    return response.data;
  },

  /**
   * Change own password (self-service) - simplified version
   */
  changeOwnPassword: async (
    userId: string,
    newPassword: string,
    reason?: string
  ): Promise<{ message: string; user: UserType }> => {
    const response = await axiosInstance.patch(
      `/admin/users/${userId}/password`,
      {
        newPassword,
        ...(reason && { reason }),
      }
    );
    return response.data;
  },
};

// =======================================================================================
// 👁️ OBSERVER DASHBOARD API
// =======================================================================================
export const observerDashboardApi = {
  /**
   * Get cases statistics in observer area
   */
  getCasesStatistics: async () => {
    const response = await axiosInstance.get(
      "/cases/observer/my-area/statistics"
    );
    return response.data;
  },

  /**
   * Get users statistics in observer area
   */
  getUsersStatistics: async () => {
    const response = await axiosInstance.get(
      "/users/observer/my-area/statistics"
    );
    return response.data;
  },
};

// =======================================================================================
// 👁️ OBSERVER USERS API
// =======================================================================================
export interface ObserverUsersFilters {
  page: number;
  limit: number;
  userType?: "hospital" | "donor" | "bloodbank" | "all";
  status?: "active" | "inactive" | "all";
  search?: string;
}

export interface ObserverUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  userType: "hospital" | "donor" | "bloodbank";
  status: "active" | "inactive";
  avatar?: string;
  city?: {
    nameAr: string;
    nameEn: string;
  };
  createdAt: string;
  isVerified?: boolean;
}

export interface ObserverUsersResponse {
  data: ObserverUser[];
  limit: number;
  page: number;
  total: number;
}

export const observerUsersApi = {
  /**
   * Get users in observer area with pagination and filtering
   */
  getObserverAreaUsers: async (
    filters: ObserverUsersFilters
  ): Promise<ObserverUsersResponse> => {
    const response = await axiosInstance.get("/users/observer/my-area", {
      params: filters,
    });

    return response.data;
  },

  /**
   * Get user details by ID
   */
  getUserById: async (userId: string): Promise<UserFullData["user"]> => {
    const response = await axiosInstance.get(`/users/${userId}`);
    console.log(response.data);
    return response.data;
  },
};

// =======================================================================================
// 👁️ OBSERVER CASES API
// =======================================================================================
export interface ObserverCasesFilters {
  page: number;
  limit: number;
  status?: string;
  bloodType?: string;
  donationType?: string;
}

export interface ObserverCasesPaginatedResponse {
  cases: import("@/lib/cases-api").CaseResponse[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  observerArea: {
    cityId: string;
    cityName: string;
    cityNameAr: string;
    governorateId: string;
    governorateName: string;
    governorateNameAr: string;
    citiesWithoutObservers: number;
    citiesWithoutObserversList: Array<{
      id: string;
      nameEn: string;
      nameAr: string;
    }>;
  };
}

export const observerCasesApi = {
  /**
   * Get cases in observer area with pagination and filtering
   */
  getObserverAreaCases: async (
    filters: ObserverCasesFilters
  ): Promise<ObserverCasesPaginatedResponse> => {
    const response = await axiosInstance.get("/cases/observer/my-area", {
      params: filters,
    });
    return response.data;
  },
};

// User donation data types
export interface UserDonationInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  avatar: string;
}

export interface DonationStats {
  totalDonations: number;
  completedDonations: number;
  pendingDonations: number;
  refusedDonations: number;
  totalQuantityDonated: number;
}

export interface NextEligibilityInfo {
  isEligible: boolean;
  reason: string;
  daysSinceLastDonation: number | null;
  minimumWaitDays: number;
}

export interface UserDonation {
  id: string;
  caseId: string;
  donorId: string;
  quantity: number;
  notes: string | null;
  donationDate: Date | null;
  scheduledDate: Date | null;
  status: string;
  statusNotes: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  case?: {
    id: string;
    patientName: string;
    bloodType: string;
    hospital: {
      name: string;
    };
  };
}

export interface UserDonationData {
  user: UserDonationInfo;
  donations: UserDonation[];
  donationStats: DonationStats;
  nextEligibilityDate: Date | null;
  nextEligibilityInfo: NextEligibilityInfo;
  compatibleBloodTypes: string[];
}

export interface UserDonationDataResponse {
  success: boolean;
  message: string;
  userDonationData: UserDonationData;
}

// Add to the existing API object
export const donationsApi = {
  /**
   * Get comprehensive user donation data
   */
  async getUserDonationData(userId: string): Promise<UserDonationData> {
    const response = await axiosInstance.get<UserDonationDataResponse>(
      `/donations/user/${userId}`
    );
    return response.data.userDonationData;
  },
};

// User Profile Types
export interface IdentityPaperResponse {
  type: string;
  number: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate: string;
  frontImageUrl?: string;
  backImageUrl?: string;
  verified: boolean;
  verificationNotes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface CityResponse {
  id: string;
  nameEn: string;
  nameAr: string;
  governorate?: {
    id: string;
    nameEn: string;
    nameAr: string;
  };
}

export interface UserDataResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  birthDate: string;
  gender: "male" | "female";
  bloodType: string;
  weight: number;
  height: number;
  userType: string;
  role: string;
  isActive: boolean;
  verificationStatus: string;
  profilePictureUrl?: string;
  lastDonationDate?: string;
  nextEligibleDonationDate?: string;
  totalDonations: number;
  city: CityResponse;
  identityPapers: IdentityPaperResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface UserDonationResponse {
  id: string;
  donationType: string;
  donationDate: string;
  status: string;
  notes?: string;
  bloodBags: number;
  case?: {
    id: string;
    patientName: string;
    bloodType: string;
    hospitalName: string;
  };
  createdAt: string;
}

export interface ActiveCaseResponse {
  id: string;
  patientName: string;
  patientAge: number;
  bloodType: string;
  donationType: string;
  bagsNeeded: number;
  currentDonations: number;
  remainingBags: number;
  status: string;
  description?: string;
  urgencyLevel: "low" | "medium" | "high" | "critical";
  hospital: {
    id: string;
    name: string;
    phone?: string;
    address?: string;
    city: CityResponse;
  };
  createdAt: string;
  lastUpdated: string;
}

export interface UserProfileResponseDto {
  userData: UserDataResponse;
  donations: UserDonationResponse[];
  activeCasesInCity: ActiveCaseResponse[];
  statistics: {
    totalDonations: number;
    completedDonations: number;
    pendingDonations: number;
    activeCasesInCity: number;
    daysUntilNextEligible: number;
    canDonateToday: boolean;
  };
  eligibility: {
    canDonate: boolean;
    nextEligibleDate?: string;
    reasonIfNotEligible?: string;
    compatibleBloodTypes: string[];
  };
}

/**
 * Get full user profile including donations and active cases
 */
export const getUserFullProfile = async (): Promise<UserProfileResponseDto> => {
  const response = await axiosInstance.get<UserProfileResponseDto>(
    "/users/profile/full"
  );
  return response.data;
};

// =======================================================================================
// 📊 ADMIN DASHBOARD STATISTICS API
// =======================================================================================
export interface DashboardStatistics {
  users: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    totalHospitals: number;
    activeHospitals: number;
    inactiveHospitals: number;
    totalBloodBanks: number;
    activeBloodBanks: number;
    inactiveBloodBanks: number;
    totalObservers: number;
    activeObservers: number;
    inactiveObservers: number;
  };
  locations: {
    totalGovernorates: number;
    totalCities: number;
  };
  donations: {
    totalDonations: number;
  };
  cases: {
    totalCases: number;
    activeCases: number;
    pendingCases: number;
  };
  requestedBy: string;
  requestedAt: string;
}

export const getDashboardStatistics =
  async (): Promise<DashboardStatistics> => {
    const response = await axiosInstance.get(
      "admin/users/dashboard/statistics"
    );
    return response.data;
  };

// =======================================================================================
// 📋 ADMIN CASES API
// =======================================================================================
export interface AdminCasesFilters {
  page: number;
  limit: number;
  status?: string;
  hospitalId?: string;
  bloodType?: string;
  donationType?: string;
  cityId?: string;
  governorateId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  isActive?: boolean;
}

export interface AdminCasesSummary {
  totalCases: number;
  activeCases: number;
  pendingCases: number;
  approvedCases: number;
  rejectedCases: number;
  completedCases: number;
}

export interface AdminCasesPaginatedResponse {
  cases: import("@/lib/cases-api").CaseResponse[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: {
    status: string | null;
    hospitalId: string | null;
    bloodType: string | null;
    donationType: string | null;
    cityId: string | null;
    governorateId: string | null;
    search: string | null;
    dateFrom: string | null;
    dateTo: string | null;
    isActive: boolean | null;
  };
  summary: AdminCasesSummary;
  requestedBy: string;
  requestedAt: string;
}

export const getAllCasesAdmin = async (
  filters: AdminCasesFilters
): Promise<AdminCasesPaginatedResponse> => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  const response = await axiosInstance.get(
    `/cases/admin/all?${queryParams.toString()}`
  );
  return response.data;
};
