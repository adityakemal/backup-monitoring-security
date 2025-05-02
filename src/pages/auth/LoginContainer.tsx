import LogoCustom from "../shared/components/LogoCustom";
import FormLogin from "./components/FormLogin";

export default function LoginContainer() {
  return (
    <div
      className=" flex w-full h-screen justify-center items-center p-5 "
      // style={{ backgroundImage: `url(/img/wave.svg)` }}
    >
      <div className="border w-full max-w-[420px] p-5 shadow rounded-xl space-y-5">
        <div className="space-y-3">
          <LogoCustom className="" />
          <p className="text-base ">Silahkan login dengan akun anda</p>
        </div>
        <FormLogin />
      </div>
    </div>
  );
}
