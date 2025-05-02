import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { IRegion } from "../userManagement/userManagement.type";
// import { devtools, persist } from "zustand/middleware";

interface IStorage {
  auth: boolean;
  token: string;
  fullname: string;
  email: string;
  role: string | null;
  // refresh_token: string;
  // personal_number: string;
  // is_active: boolean;
  // location: any;
  handleToken: (params?: any) => void;
  // handleRefreshToken: (params?: any) => void;
  handleLogout: () => void;
  // region?: IRegion | null;
  // branch?: IRegion | null;
  // unit?: IRegion | null;
  // otpDate: number;
  // handleOtpDate: (state: any) => void;
  // isOnProcessUploadReferralBulk: boolean;
  // handleIsOnProcessUploadReferralBulk: (state: boolean) => void;
  // isOnProcessUploadUserBulk: boolean;
  // handleIsOnProcessUploadUserBulk: (state: boolean) => void;
}

interface IRole {
  // level?: number | undefined;
  name?: string | undefined;
  code?: string;
  // uuid?: string | undefined;
}

export const useStorageStore = create<IStorage>()(
  devtools(
    persist(
      (set) => ({
        auth: false,
        token: "",
        fullname: "",
        email: "",
        role: "",
        // otpDate: Date.now(),
        // refresh_token: "",
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

        handleToken: async (val) => {
          set({
            auth: true,
            token: val.token,
            fullname: val.full_name,
            email: val.email,
            role: val.role,
            // refresh_token: val.refresh_token,
            // personal_number: val.personal_number,
            // is_active: val.is_active,
            // location: val.location,
          });
          window.location.reload();
        },
        // handleRefreshToken: async (val) => {
        //   set({
        //     token: val.token,
        //     refresh_token: val.refresh_token,
        //   });
        //   // window.location.reload();
        // },
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
