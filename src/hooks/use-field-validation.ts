import { useCallback, useState } from "react";

interface FieldValidationState {
  isChecking: boolean;
  isValid: boolean;
  errorMessage: string | null;
  lastCheckedValue?: string; // Track the last value that was checked
}

export function useFieldValidation() {
  const [emailState, setEmailState] = useState<FieldValidationState>({
    isChecking: false,
    isValid: true,
    errorMessage: null,
    lastCheckedValue: "",
  });

  const [phoneState, setPhoneState] = useState<FieldValidationState>({
    isChecking: false,
    isValid: true,
    errorMessage: null,
    lastCheckedValue: "",
  });

  const [identityState, setIdentityState] = useState<FieldValidationState>({
    isChecking: false,
    isValid: true,
    errorMessage: null,
    lastCheckedValue: "",
  });

  // Set email validation state
  const setEmailValidation = useCallback(
    (isValid: boolean, errorMessage: string | null = null, value?: string) => {
      setEmailState({
        isChecking: false,
        isValid,
        errorMessage,
        lastCheckedValue: value || emailState.lastCheckedValue,
      });
    },
    [emailState.lastCheckedValue]
  );

  // Set phone validation state
  const setPhoneValidation = useCallback(
    (isValid: boolean, errorMessage: string | null = null, value?: string) => {
      setPhoneState({
        isChecking: false,
        isValid,
        errorMessage,
        lastCheckedValue: value || phoneState.lastCheckedValue,
      });
    },
    [phoneState.lastCheckedValue]
  );

  // Set identity validation state
  const setIdentityValidation = useCallback(
    (isValid: boolean, errorMessage: string | null = null, value?: string) => {
      setIdentityState({
        isChecking: false,
        isValid,
        errorMessage,
        lastCheckedValue: value || identityState.lastCheckedValue,
      });
    },
    [identityState.lastCheckedValue]
  );

  // Reset all validation states
  const resetValidation = useCallback(() => {
    setEmailState({
      isChecking: false,
      isValid: true,
      errorMessage: null,
      lastCheckedValue: "",
    });
    setPhoneState({
      isChecking: false,
      isValid: true,
      errorMessage: null,
      lastCheckedValue: "",
    });
    setIdentityState({
      isChecking: false,
      isValid: true,
      errorMessage: null,
      lastCheckedValue: "",
    });
  }, []);

  return {
    email: {
      ...emailState,
      setValidation: setEmailValidation,
      startChecking: (value: string) =>
        setEmailState((prev) => ({
          ...prev,
          isChecking: true,
          lastCheckedValue: value,
        })),
      shouldCheck: (value: string) =>
        value !== emailState.lastCheckedValue && value.length > 0,
    },
    phone: {
      ...phoneState,
      setValidation: setPhoneValidation,
      startChecking: (value: string) =>
        setPhoneState((prev) => ({
          ...prev,
          isChecking: true,
          lastCheckedValue: value,
        })),
      shouldCheck: (value: string) =>
        value !== phoneState.lastCheckedValue && value.length > 0,
    },
    identityNumber: {
      ...identityState,
      setValidation: setIdentityValidation,
      startChecking: (value: string) =>
        setIdentityState((prev) => ({
          ...prev,
          isChecking: true,
          lastCheckedValue: value,
        })),
      shouldCheck: (value: string) =>
        value !== identityState.lastCheckedValue && value.length > 0,
    },
    resetValidation,
    isAnyFieldChecking:
      emailState.isChecking ||
      phoneState.isChecking ||
      identityState.isChecking,
    areAllFieldsValid:
      emailState.isValid && phoneState.isValid && identityState.isValid,
  };
}
