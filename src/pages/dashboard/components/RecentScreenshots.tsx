import { memo } from "react";
import { Image } from "antd";
import { Screenshot } from "../../../types/dashboard.type";

interface RecentScreenshotsProps {
  screenshots: Screenshot[];
}

const RecentScreenshots = ({ screenshots }: RecentScreenshotsProps) => {
  return (
    <div className="p-5 rounded-xl bg-dynamic space-y-4">
      <p className="font-semibold flex justify-between items-center">
        Recent Screenshots
      </p>
      <div className="grid grid-cols-3 gap-2">
        {screenshots.map((item, i) => (
          <Image
            key={i}
            src={item.url}
            className="rounded-md object-cover"
            alt={item.window_title}
            preview={{
              destroyOnClose: true,
              footer: (
                <div className="mb-16 bg-black w-fit bg-opacity-50 text-white text-xs p-1 rounded mx-auto">
                  <div>
                    {item.is_flagged ? (
                      <span className="text-red-500 font-semibold text-xs">
                        Flagged
                      </span>
                    ) : (
                      <span className="text-green-500 font-semibold text-xs">
                        Safe
                      </span>
                    )}
                  </div>
                  {item.window_title}
                </div>
              ),
            }}
          />
        ))}
      </div>
    </div>
  );
};

RecentScreenshots.displayName = "RecentScreenshots";

export default memo(RecentScreenshots);
