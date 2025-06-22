import api from "@/lib/axios";

// Case status enum
export enum CaseStatus {
  PENDING = "pending",
  ACTIVE = "active",
  CLOSED = "closed",
  REJECTED = "rejected",
}

// Case interfaces
export interface CaseData {
  patientName: string;
  patientAge: number;
  bloodType: string;
  donationType: string;
  bagsNeeded: number;
  description?: string;
  reportDocument: File;
}

export interface StatusLog {
  id: string;
  caseId: string;
  status: string;
  description: string;
  observerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
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
  donor?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    bloodType: string;
  };
}

export interface Hospital {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  identityNumber: string;
  taxNumber: string | null;
  commercialRecord: string | null;
  birthDate: string;
  bloodType: string;
  identityPapers: string | null;
  cityId: string;
  avatar: string | null;
  role: string;
  refreshToken: string;
  userType: string;
  userStatus: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  city: {
    id: string;
    nameAr: string;
    nameEn: string;
    code: string;
    description: string | null;
    isActive: boolean;
    governorateId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CaseResponse {
  id: string;
  patientName: string;
  patientAge: number;
  bloodType: string;
  donationType: string;
  hospitalId: string;
  bagsNeeded: number;
  status: string;
  reportDocument: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  hospital: Hospital;
  statusLogs: StatusLog[];
  donations: Donation[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CreateDonationResponseDto {
  success: boolean;
  message: string;
  donation?: DonationResponse;
  compatibility: BloodCompatibilityReport;
  donationEligibility: DonationEligibilityCheck;
  donorInfo: DonorInfo;
}

export interface CreateDonationDto {
  caseId: string;
  donorId: string;
  quantity: number;
  notes?: string;
  status?: string;
  statusNotes?: string;
}

export interface CreateDonationData {
  caseId?: string;
  donorId?: string;
  quantity: number;
  notes?: string;
  donationDate?: string;
  scheduledDate?: string;
  status?: string;
  statusNotes?: string;
}

export interface DonationResponse {
  id: string;
  caseId: string;
  donorId: string;
  hospitalId: string;
  quantity: number;
  notes: string | null;
  scheduledDate: string | null;
  donationDate: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BloodCompatibilityReport {
  isCompatible: boolean;
  reason: string;
  donorType: string;
  recipientType: string;
  compatibleDonorTypes: string[];
}

export interface DonationEligibilityCheck {
  isEligible: boolean;
  reason: string;
  daysSinceLastDonation?: number | null;
  minimumWaitDays?: number;
  waitingPeriodDays?: number;
  nextEligibleDate?: string | null;
}

export interface DonorInfo {
  id: string;
  name: string;
  avatar: string | null;
  bloodType: string;
}

export interface CompatibilityResponse {
  success: boolean;
  message: string;
  compatibility: BloodCompatibilityReport;
  donationEligibility: DonationEligibilityCheck;
  donorInfo: DonorInfo;
}

export interface PublishCaseToFacebookDto {
  accessToken?: string;
  pageId?: string;
  websiteUrl?: string;
  includeHospitalContact?: boolean;
  customMessage?: string;
}

export interface PublishCaseResponseDto {
  success: boolean;
  message: string;
  postId: string;
  caseDetails: {
    caseId: string;
    patientName: string;
    bloodType: string;
    hospitalName: string;
    postContent: string;
  };
  usingEnvConfig: boolean;
}

export interface PublishCaseToTelegramDto {
  customMessage?: string;
  includeContactInfo?: boolean;
  includeStatistics?: boolean;
  includeCallToAction?: boolean;
  websiteUrl?: string;
}

export interface PublishCaseToTelegramResponseDto {
  success: boolean;
  message: string;
  caseDetails: {
    caseId: string;
    patientName: string;
    bloodType: string;
    hospitalName: string;
    messageContent: string;
  };
  telegramStatus: string;
}

export const casesApi = {
  /**
   * Create a new case with document upload
   */
  async createCase(caseData: CaseData): Promise<ApiResponse<CaseResponse>> {
    const formData = new FormData();

    // Append all the required fields
    formData.append("patientName", caseData.patientName);
    formData.append("patientAge", caseData.patientAge.toString());
    formData.append("bloodType", caseData.bloodType);
    formData.append("donationType", caseData.donationType);
    formData.append("bagsNeeded", caseData.bagsNeeded.toString());

    // Append optional fields if they exist
    if (caseData.description) {
      formData.append("description", caseData.description);
    }

    // Append the file
    formData.append("reportDocument", caseData.reportDocument);

    const response = await api.post<ApiResponse<CaseResponse>>(
      "/cases",
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
   * Get all cases for the current hospital
   */
  async getHospitalCases(hospitalId: string): Promise<CaseResponse[]> {
    const response = await api.get<CaseResponse[]>(
      `/cases/hospital/${hospitalId}`
    );
    return response.data;
  },

  /**
   * Get all cases for the current hospital
   */
  async getCases(): Promise<ApiResponse<CaseResponse[]>> {
    const response = await api.get<ApiResponse<CaseResponse[]>>("/cases");
    return response.data;
  },

  /**
   * Get a specific case by ID
   */
  async getCaseById(id: string): Promise<CaseResponse> {
    const response = await api.get<CaseResponse>(`/cases/${id}`);
    return response.data;
  },

  /**
   * Update case status (for admin use)
   */
  async updateCase(
    id: string,
    caseData: Partial<CaseData>
  ): Promise<ApiResponse<CaseResponse>> {
    const response = await api.patch<ApiResponse<CaseResponse>>(
      `/cases/${id}`,
      caseData
    );
    return response.data;
  },

  async deleteCase(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`/cases/${id}`);
    return response.data;
  },

  /**
   * Update case status by observer
   */
  async updateCaseStatusByObserver(
    caseId: string,
    status: string,
    description: string
  ): Promise<ApiResponse<CaseResponse>> {
    const response = await api.patch<ApiResponse<CaseResponse>>(
      `/cases/observer/${caseId}/status`,
      {
        status,
        description,
      }
    );
    return response.data;
  },

  /**
   * Get cases for observer in their area
   */
  async getObserverCases(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<
    ApiResponse<{ data: CaseResponse[]; totalPages: number; total: number }>
  > {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      params.append("search", search);
    }

    const response = await api.get<
      ApiResponse<{ data: CaseResponse[]; totalPages: number; total: number }>
    >(`/cases/observer?${params.toString()}`);
    return response.data;
  },

  /**
   * Publish case to Facebook
   */
  async publishCaseToFacebook(
    caseId: string,
    publishOptions: PublishCaseToFacebookDto
  ): Promise<PublishCaseResponseDto> {
    const response = await api.post<PublishCaseResponseDto>(
      `/cases/${caseId}/publish-facebook`,
      publishOptions
    );
    return response.data;
  },

  /**
   * Publish case to Telegram
   */
  async publishCaseToTelegram(
    caseId: string,
    publishOptions: PublishCaseToTelegramDto
  ): Promise<PublishCaseToTelegramResponseDto> {
    const response = await api.post<PublishCaseToTelegramResponseDto>(
      `/cases/${caseId}/publish-telegram`,
      publishOptions
    );
    return response.data;
  },

  /**
   * Get active cases in user's city
   */
  async getActiveCasesInMyCity(
    page: number = 1,
    limit: number = 10,
    bloodType?: string,
    donationType?: string
  ): Promise<{
    cases: CaseResponse[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    userCity: {
      id: string;
      nameEn: string | null;
      nameAr: string | null;
    };
    filters: {
      bloodType: string | null;
      donationType: string | null;
    };
  }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (bloodType) {
      params.append("bloodType", bloodType);
    }

    if (donationType) {
      params.append("donationType", donationType);
    }

    const response = await api.get<{
      cases: CaseResponse[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      userCity: {
        id: string;
        nameEn: string | null;
        nameAr: string | null;
      };
      filters: {
        bloodType: string | null;
        donationType: string | null;
      };
    }>(`/cases/my-city/active?${params.toString()}`);
    return response.data;
  },
};

// Donation API
export const donationsApi = {
  /**
   * Check blood compatibility and donation eligibility before creating donation
   */
  async checkCompatibility(
    caseId: string,
    donorId: string
  ): Promise<ApiResponse<CompatibilityResponse>> {
    console.log("Making compatibility check request:", { caseId, donorId });
    const response = await api.get<ApiResponse<CompatibilityResponse>>(
      `/donations/case/${caseId}/donor/${donorId}/compatibility`
    );
    console.log("Raw API response:", response);
    console.log("Response data:", response.data);
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    return response.data;
  },

  /**
   * Create donation for a case using donor ID (for hospitals)
   * Matches backend endpoint: POST /case/:caseId/donor/:donorId
   */
  async createDonationForCase(
    caseId: string,
    donorId: string,
    createDonationDto: CreateDonationDto
  ): Promise<CreateDonationResponseDto> {
    const response = await api.post<CreateDonationResponseDto>(
      `/donations/case/${caseId}/donor/${donorId}`,
      createDonationDto
    );
    return response.data;
  },
};
