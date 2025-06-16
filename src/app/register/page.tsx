"use client";

// =======================================================================================
// 🩸 UNIFIED REGISTRATION PAGE - Donor & Hospital Registration
// =======================================================================================
//
// This is a unified registration system featuring:
// 👥 User type selection (Donor/Hospital)
// 📋 Dynamic form based on user type
// 📄 PDF document upload for verification
// 🏥 City/Governorate selection
// 🩸 Blood type selection (donors only)
// 💼 Tax/Commercial info (hospitals only)
// 📱 Mobile-responsive design
// 🔐 Secure file handling
// 🎨 Modern UI with excellent UX
//
// Design Philosophy:
// - Clean, maintainable code structure
// - Type-safe implementation
// - Professional medical interface
// - Accessible and intuitive
// - Secure document handling
// =======================================================================================

import type { DonorRegistrationResponse } from "@/types/donor";
import type { HospitalRegistrationResponse } from "@/types/hospital";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Components
import DonorRegistrationForm from "@/components/registration/DonorRegistrationForm";
import HospitalRegistrationForm from "@/components/registration/HospitalRegistrationForm";
import { RegistrationHeader } from "@/components/registration/layout/RegistrationHeader";
import { RegistrationLayout } from "@/components/registration/layout/RegistrationLayout";
import { RegistrationFormWrapper } from "@/components/registration/RegistrationFormWrapper";
import RegistrationSuccess from "@/components/registration/RegistrationSuccess";
import { UserTypeSelection } from "@/components/registration/UserTypeSelection";

type UserType = "donor" | "hospital" | null;
type RegistrationData =
  | DonorRegistrationResponse
  | HospitalRegistrationResponse;

// =======================================================================================
// 🎯 MAIN REGISTRATION PAGE COMPONENT
// =======================================================================================
export default function RegisterPage() {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);

  const handleRegistrationSuccess = (data: RegistrationData) => {
    setRegistrationData(data);
    setIsSuccess(true);
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleBackToSelection = () => {
    setSelectedUserType(null);
  };

  // Show success screen if registration is complete
  if (isSuccess) {
    return (
      <RegistrationSuccess
        data={registrationData}
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  return (
    <RegistrationLayout>
      {!selectedUserType ? (
        // User Type Selection Screen
        <>
          <RegistrationHeader
            title="انضم لمنصة إحياء"
            description="اختر نوع الحساب المناسب لك"
          />
          <UserTypeSelection
            onSelectUserType={setSelectedUserType}
            onBackToLogin={handleBackToLogin}
          />
        </>
      ) : (
        // Registration Form Screen
        <>
          <RegistrationHeader
            title={
              selectedUserType === "donor"
                ? "تسجيل متبرع جديد"
                : "تسجيل مؤسسة طبية جديدة"
            }
            description={
              selectedUserType === "donor"
                ? "ساهم في إنقاذ الأرواح من خلال التبرع بالدم"
                : "انضم لشبكة المؤسسات الطبية المعتمدة (مستشفيات وبنوك دم)"
            }
          />
          <RegistrationFormWrapper
            onBackToSelection={handleBackToSelection}
            onBackToLogin={handleBackToLogin}
          >
            {selectedUserType === "donor" ? (
              <DonorRegistrationForm onSuccess={handleRegistrationSuccess} />
            ) : (
              <HospitalRegistrationForm onSuccess={handleRegistrationSuccess} />
            )}
          </RegistrationFormWrapper>
        </>
      )}
    </RegistrationLayout>
  );
}
