"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface DocumentUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  error?: string | null;
}

export function DocumentUpload({
  onFileSelect,
  selectedFile,
  error,
}: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (file: File) => {
      // Validate file type
      if (file.type !== "application/pdf") {
        onFileSelect(null);
        return "يرجى اختيار ملف PDF فقط";
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        onFileSelect(null);
        return "حجم الملف يجب أن يكون أقل من 10 ميجابايت";
      }

      onFileSelect(file);
      return null;
    },
    [onFileSelect]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
        صورة الهوية الشخصية (PDF)
      </Label>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          error
            ? "border-red-400 bg-red-50/50 dark:bg-red-900/10"
            : dragActive
            ? "border-red-400 bg-red-50 dark:bg-red-900/20"
            : "border-gray-300 dark:border-gray-600"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {selectedFile ? (
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-800 p-3">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedFile.name}
            </p>
            <p className="text-xs text-gray-500">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} ميجابايت
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBrowseClick}
              type="button"
            >
              اختيار ملف آخر
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                اسحب وأفلت ملف PDF هنا
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                أو{" "}
                <button
                  type="button"
                  className="text-red-600 hover:text-red-500"
                  onClick={handleBrowseClick}
                >
                  تصفح للاختيار
                </button>
              </p>
            </div>
            <p className="text-xs text-gray-400">
              PDF فقط (حد أقصى 10 ميجابايت)
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
