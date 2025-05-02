import { create } from "zustand";
import { fetcherPOST } from "../../lib/fetcher";

interface ISettingStore {
  loading: boolean;
  postChangePassword: (params?: any, signal?: any) => void;
}

export const useSettingStore = create<ISettingStore>()((set) => ({
  loading: false,

  postChangePassword: async (body) => {
    set({ loading: true });
    try {
      const data = await fetcherPOST(`/auth/change-password/`, body);
      console.log(data);

      set({
        loading: false,
      });
      return Promise.resolve(data);
    } catch (error: any) {
      console.log(error.message, "error zustand");
      set({ loading: false });
      return Promise.reject(error);
    }
  },
}));
