import { memo } from "react";
import { AiFillSecurityScan } from "react-icons/ai";

function LogoCustom({ className }: { className?: string }) {
  return (
    <p
      className={`text-3xl font-bold  uppercase leading-6 tracking-tighter text-main ${className}`}>
      Security <br />
      <span className=" flex items-center gap-x-1">
        Monitor
        <AiFillSecurityScan />
      </span>
    </p>
  );
}

export default memo(LogoCustom);
