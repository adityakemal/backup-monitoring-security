import { memo } from "react";
import { AiFillSecurityScan } from "react-icons/ai";
import { cn } from "../../../lib/helper";
import { useStorageStore } from "../storage.store";
import colors from "../../../lib/colors";

function LogoCustom({ className }: { className?: string }) {
  const { mode } = useStorageStore();
  return (
    <p
      className={cn(
        `text-3xl !font-bold uppercase leading-6 tracking-tighter ${className}`,
        mode === "dark" ? "text-neutral-50" : `!text-[var(--main-color)]`
      )}>
      Employee Security <br />
      <span className=" flex items-center gap-x-1">
        Monitor
        {/* <AiFillSecurityScan /> */}
      </span>
    </p>
  );
}

export default memo(LogoCustom);
