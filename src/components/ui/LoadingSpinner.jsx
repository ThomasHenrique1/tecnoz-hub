// src/components/ui/LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner({
  size = 6,
  color = "text-primary",
  label = "",
  fullScreen = false,
  className = "",
}) {
  const dimension = `h-${size} w-${size}`;

  const spinner = (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <svg
        className={`animate-spin ${dimension} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
      {label && <span className="text-sm">{label}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base-100/70 backdrop-blur-sm z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
