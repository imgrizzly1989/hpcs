"use client";
import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: { borderRadius: "12px", background: "#1A1D23", color: "#fff", fontSize: "14px" },
        success: { iconTheme: { primary: "#E11D2E", secondary: "#fff" } },
      }}
    />
  );
}
