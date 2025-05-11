// src/pages/auth/LoginContainer.tsx
import LogoCustom from "../shared/components/LogoCustom";
import ThemeToggle from "../shared/components/ThemeToggle";
import FormLogin from "./components/FormLogin";
import { useStorageStore } from "../shared/storage.store";

export default function LoginContainer() {
  const { mode } = useStorageStore();

  return (
    <div className="flex w-full h-screen justify-center items-center p-5 relative !bg-gradient-to-br from-mainBg to-mainBgPaper dark:from-mainBgDark dark:to-neutral-900">
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-[420px] px-5 py-10 rounded-xl  backdrop-blur-lg bg-white/80 dark:bg-neutral-900/80 border border-mainBorder/20 shadow-2xl">
        <div className="space-y-3">
          <LogoCustom />
          <p className="text-base text-mainText dark:text-mainTextDark font-medium">
            Silahkan login dengan akun anda
          </p>
        </div>
        <FormLogin />
      </div>
    </div>
  );
}
