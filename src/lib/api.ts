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
    const response = await axiosInstance.get("/admin/users", {
      params: filters,
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
   * Upload user avatar
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
   * Update user avatar
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
   * Remove user avatar
   */
  removeUserAvatar: async (
    userId: string
  ): Promise<{ message: string; user: UserType }> => {
    const response = await axiosInstance.delete(
      `/admin/users/${userId}/avatar`
    );
    return response.data;
  },
};
