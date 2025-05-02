import ResetPasswordForm from './components/ResetPasswordForm';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function NewPasswordContainer() {
  return (
    <div
      className=" h-screen p-6 md:p-8 lg:p-12 grid lg:grid-cols-2 items-center justify-items-center login-container relative bg-white"
      // style={{ backgroundImage: `url(/img/wave.svg)` }}
    >
      <div className="text-2xl absolute left-6 top-6 md:left-12 md:top-12 font-bold uppercase text-[#E8B014]">
        Ecosystem <br /> Tree
      </div>
      <div className=" md:max-w-[450px] w-full px-5 py-10 space-y-10 ">
        <Link
          to={'/'}
          className="pl-1 font-semibold text-lg flex items-center space-x-2"
        >
          <p>
            <ArrowLeftOutlined />
          </p>
          <p>Login</p>
        </Link>
        <div className="space-y-2 flex flex-col items-start justify-start">
          {/* <img
          src="/img/bri.png"
          className=" object-contain mb-0 h-10"
          alt=""
        /> */}
          <p className="text-2xl font-bold uppercase text-[#00529C] text-center text-main">
            Buat Password
          </p>
          <p className="text-sm ">Silahkan tentukan password baru anda</p>
        </div>
        <ResetPasswordForm />
      </div>
      <div className="h-full hidden lg:block bg-[#00529C] max-w-[618px] w-full rounded-xl"></div>
    </div>
  );
}
