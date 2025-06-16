import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useId, useRef } from "react";
import { useDialogFocus } from "./DialogFocusProvider";

interface AccessibleSelectProps {
  value: string;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
  className?: string;
}

export function AccessibleSelect({
  value,
  onValueChange,
  onChange,
  placeholder = "اختر...",
  options,
  disabled,
  className,
}: AccessibleSelectProps) {
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { registerFocusable, unregisterFocusable, trapFocus, releaseFocus } =
    useDialogFocus();

  // Use either onValueChange or onChange
  const handleValueChange = (val: string) => {
    if (onValueChange) onValueChange(val);
    if (onChange) onChange(val);
  };

  useEffect(() => {
    const trigger = triggerRef.current;
    if (trigger) {
      registerFocusable(id, trigger);
    }

    return () => {
      unregisterFocusable(id);
    };
  }, [id, registerFocusable, unregisterFocusable]);

  return (
    <Select
      value={value}
      onValueChange={handleValueChange}
      disabled={disabled}
      onOpenChange={(open) => {
        if (open) {
          trapFocus(id);
        } else {
          releaseFocus();
        }
      }}
    >
      <SelectTrigger ref={triggerRef} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={5}
        className="rtl z-[9999]"
        avoidCollisions={true}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
