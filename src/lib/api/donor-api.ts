import axiosInstance from "@/lib/axios";
import { DonorRegistrationFormData } from "@/lib/validations/donor-registration";
import { DonorRegistrationResponse } from "@/types/donor";
import { AxiosError } from "axios";

// Error response types
interface ApiErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// Function to extract error message from API response
export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiErrorResponse | undefined;

    // Check for field validation errors
    if (errorData?.errors) {
      // Get the first error message from the errors object
      const firstErrorField = Object.keys(errorData.errors)[0];
      const firstErrorMessage = errorData.errors[firstErrorField]?.[0];
      if (firstErrorMessage) {
        return firstErrorMessage;
      }
    }

    // Return the main error message if available
    if (errorData?.message) {
      return errorData.message;
    }
  }

  // Fallback error message
  return "حدث خطأ أثناء العملية. يرجى المحاولة مرة أخرى.";
};

export const donorApi = {
  // Register a new donor
  async registerDonor(
    formData: DonorRegistrationFormData,
    identityPapers: File
  ): Promise<DonorRegistrationResponse> {
    try {
      const apiFormData = new FormData();

      apiFormData.append("name", formData.name);
      apiFormData.append("email", formData.email);
      apiFormData.append("password", formData.password);
      apiFormData.append("phone", formData.phone);
      apiFormData.append("address", formData.address);
      apiFormData.append("identityNumber", formData.identityNumber);
      apiFormData.append("birthDate", formData.birthDate);
      apiFormData.append("cityId", formData.cityId);
      apiFormData.append("bloodType", formData.bloodType);
      apiFormData.append("identityPapers", identityPapers);

      const response = await axiosInstance.post(
        "/donors/register",
        apiFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      // Extract error message and rethrow with the message
      const errorMessage = extractErrorMessage(error);
      throw new Error(errorMessage);
    }
  },

  // Check if email is already registered
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      await axiosInstance.post("/donors/check-email", { email });
      return false; // Email is available
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return true; // Email already exists
      }
      throw error; // Rethrow other errors
    }
  },

  // Check if phone number is already registered
  async checkPhoneExists(phone: string): Promise<boolean> {
    try {
      await axiosInstance.post("/donors/check-phone", { phone });
      return false; // Phone is available
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return true; // Phone already exists
      }
      throw error; // Rethrow other errors
    }
  },

  // Check if identity number is already registered
  async checkIdentityNumberExists(identityNumber: string): Promise<boolean> {
    try {
      await axiosInstance.post("/donors/check-identity", { identityNumber });
      return false; // Identity number is available
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return true; // Identity number already exists
      }
      throw error; // Rethrow other errors
    }
  },
};
