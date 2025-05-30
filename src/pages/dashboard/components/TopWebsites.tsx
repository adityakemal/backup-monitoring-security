import { memo } from "react";
import { FaGlobe } from "react-icons/fa";
import { TopWebsite } from "../../../types/dashboard.type";

interface TopWebsitesProps {
  websites: TopWebsite[];
}

const TopWebsites = ({ websites }: TopWebsitesProps) => {
  return (
    <div className="p-5 rounded-xl bg-dynamic space-y-4">
      <p className="font-semibold">Top Websites</p>
      {websites.map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-start pb-3 gap-x-3 last:-none"
        >
          <div className="flex items-start gap-3 w-full overflow-hidden ">
            <div className="p-2 bg-blue-100 rounded-full flex items-center justify-center">
              <FaGlobe className="text-blue-500 w-4 h-4" />
            </div>
            <div className="flex flex-col w-full overflow-hidden">
              <span className="text-sm font-medium truncate">{item.title}</span>
              <span className="text-xs text-neutral-500 truncate">
                {item.url}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-sm font-medium ">{item.total_duration}s</span>
            <span className="text-xs text-blue-500 whitespace-nowrap">
              {item.visit_count} visits
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

TopWebsites.displayName = "TopWebsites";

export default memo(TopWebsites);
