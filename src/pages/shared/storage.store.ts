import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IStorage {
  auth: boolean;
  token: string;
  fullname: string;
  email: string;
  role: string | null;
  refresh_token: string;
  handleToken: (params?: any) => void;
  handleRefreshToken: (params?: any) => void;
  handleLogout: () => void;

  // otpDate: number;
  // handleOtpDate: (state: any) => void;

  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

// interface IRole {
//   // level?: number | undefined;
//   name?: string | undefined;
//   code?: string;
//   // uuid?: string | undefined;
// }

type ThemeMode = "light" | "dark" | "system";

export const useStorageStore = create<IStorage>()(
  devtools(
    persist(
      (set, get) => ({
        auth: false,
        token: "",
        fullname: "",
        email: "",
        role: "",
        mode: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
        setMode: (mode) => set({ mode }),
        toggleTheme: () => {
          const currentMode = get().mode;
          if (currentMode === "light") {
            set({ mode: "dark" });
          } else if (currentMode === "dark") {
            set({ mode: "light" });
          } else {
            // If in system mode, toggle to the opposite of the current system preference
            const prefersDark = window.matchMedia(
              "(prefers-color-scheme: dark)"
            ).matches;
            set({ mode: prefersDark ? "light" : "dark" });
          }
        },
        // otpDate: Date.now(),
        // personal_number: "",
        // is_active: false,
        // location: null,
        // isOnProcessUploadReferralBulk: false,
        // isOnProcessUploadUserBulk: false,
        // handleIsOnProcessUploadReferralBulk: async (val) =>
        //   set({
        //     isOnProcessUploadReferralBulk: val,
        //   }),
        // handleIsOnProcessUploadUserBulk: async (val) =>
        //   set({
        //     isOnProcessUploadUserBulk: val,
        //   }),

        refresh_token: "",
        handleToken: async (val) => {
          set({
            auth: true,
            token: val.token,
            fullname: val.full_name,
            email: val.email,
            role: val.role,
            refresh_token: val.refresh_token,
            // is_active: val.is_active,
          });
          window.location.reload();
        },
        handleRefreshToken: async (val: any) => {
          set({
            token: val.token,
            refresh_token: val.refresh_token,
          });
          // window.location.reload();
        },
        // handleOtpDate: async (state) => set({ otpDate: state }),
        handleLogout: async () => {
          window.localStorage.clear();
          window.location.reload();
          window.location.href = "/";
        },
      }),
      { name: "god-eye-storage" }
    )
  )
);
