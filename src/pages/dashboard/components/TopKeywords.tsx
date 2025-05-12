import { memo } from "react";
import { FaKey } from "react-icons/fa";
import { KeywordCount } from "../../../types/dashboard.type";

interface TopKeywordsProps {
  keywords: KeywordCount[];
}

const TopKeywords = ({ keywords }: TopKeywordsProps) => {
  return (
    <div className="p-5 rounded-xl bg-dynamic space-y-4">
      <p className="font-semibold">Top Keywords</p>
      {keywords.map((item, index) => (
        <div key={index} className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-full">
              <FaKey className="text-blue-500 w-4 h-4" />
            </div>
            <p className="text-sm">{item.keyword}</p>
          </div>
          <span className="text-neutral-500 text-sm">{item.count}x</span>
        </div>
      ))}
    </div>
  );
};

TopKeywords.displayName = "TopKeywords";

export default memo(TopKeywords);
