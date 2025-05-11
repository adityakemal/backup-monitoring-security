import {
  BsActivity,
  BsApp,
  BsDeviceSsd,
  BsFileCheck,
  BsUsb,
} from "react-icons/bs";

import LayoutCustom from "../shared/components/LayoutCustom";

import { cn } from "../../lib/helper";
import DeviceActivities from "./components/DeviceActivities";
import HoursActivities from "./components/HoursActivities";
import { FaAppStore, FaGlobe, FaKey, FaMinus, FaSquare } from "react-icons/fa";
import { Image } from "antd";
import { TbAppsFilled } from "react-icons/tb";
import CustomBox from "../shared/components/CustomBox";

const data = [
  {
    color: "text-blue-600 bg-blue-0",
    icon: <BsDeviceSsd />,
    label: "Total Devices",
    value: 2,
  },
  {
    color: "text-green-600 bg-green-0",
    icon: <BsActivity />,
    label: "Total Activities",
    value: 42,
  },
  {
    color: "text-violet-600 bg-violet-0",
    icon: <BsUsb />,
    label: "USB Events",
    value: 21,
  },
  {
    color: "text-yellow-600 bg-yellow-0",
    icon: <BsFileCheck />,
    label: "File Operations",
    value: 22,
  },
];

export default function DashboardContainer() {
  return (
    <LayoutCustom>
      <div className=" space-y-4">
        <div className="grid grid-cols-4 gap-4">
          {data.map((res, i) => (
            <div
              key={i}
              className=" p-4 bg-dynamic  flex items-center gap-3 rounded-xl">
              <div
                className={cn(
                  "p-3 aspect-square rounded-full shrink-0 text-xl",
                  res?.color
                )}>
                {res.icon}
              </div>
              <div className="">
                <p className="">{res.label}</p>
                <p className="text-3xl font-bold">{res.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-xl  bg-dynamic  space-y-4 max-h-[50vh]">
            <p className="font-semibold flex justify-between items-center">
              Device Activity Overview
              <span className="text-neutral-400 font-normal">
                Total Devices 3
              </span>
            </p>
            <DeviceActivities />
          </div>
          <div className="p-5 rounded-xl  bg-dynamic space-y-4 max-h-[50vh] relative">
            <p className="font-semibold">24-Hour Activity Distribution</p>
            {/* <div className="  h-full w-full"> */}
            <HoursActivities />
            {/* </div> */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-xl  bg-dynamic space-y-4 ">
            <p className="font-semibold flex justify-between items-center">
              Recent Screenshots
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  id: 1,
                  url: "https://picsum.photos/seed/1/600/400",
                  path: "C:/Users/John/Desktop/file1.png",
                  flagged: true,
                },
                {
                  id: 2,
                  url: "https://picsum.photos/seed/2/600/400",
                  path: "C:/Users/John/Documents/file2.png",
                  flagged: false,
                },
                {
                  id: 3,
                  url: "https://picsum.photos/seed/3/600/400",
                  path: "C:/Users/Alice/Downloads/file3.png",
                  flagged: true,
                },
                {
                  id: 4,
                  url: "https://picsum.photos/seed/4/600/400",
                  path: "C:/Users/Bob/Desktop/file4.png",
                  flagged: false,
                },
              ].map((item, i) => (
                <Image
                  key={i}
                  src={item.url}
                  className="rounded-md object-cover"
                  alt="dsfasfas"
                  preview={{
                    // mask: <div className="text-xs text-white">View Image</div>,
                    destroyOnClose: true,
                    footer: (
                      <div className="mb-16 bg-black w-fit bg-opacity-50 text-white text-xs p-1 rounded mx-auto">
                        <div>
                          {item.flagged ? (
                            <span className="text-red-500 font-semibold text-xs">
                              Flagged
                            </span>
                          ) : (
                            <span className="text-green-500 font-semibold text-xs">
                              Safe
                            </span>
                          )}
                        </div>
                        {item.path}
                      </div>
                    ),
                  }}
                />
              ))}
            </div>
          </div>
          <div className="p-5 rounded-xl  bg-dynamic space-y-4">
            <p className="font-semibold">Top Keywords</p>
            {[
              { word: "general", count: 8 },
              { word: "activity", count: 8 },
              { word: "delete", count: 3 },
              { word: "classified", count: 2 },
              { word: "restricted", count: 2 },
              { word: "create", count: 2 },
              { word: "sensitive", count: 2 },
              { word: "secret", count: 1 },
              { word: "confidential", count: 1 },
              { word: "internal", count: 1 },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <FaKey className="text-blue-500 w-4 h-4" />
                  </div>
                  <p className=" text-sm">{item.word}</p>
                </div>
                <span className="text-neutral-500 text-sm">{item.count}x</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-xl  bg-dynamic space-y-4 ">
            <p className="font-semibold flex justify-between items-center">
              Top Applications
            </p>
            {[
              {
                id: 1,
                name: "C:\\Users\\ThinkPad\\Downloads\\monitor-agent (9).exe",
                used: 1,
                duration: "0:00:25",
                activeDuration: "0:00:25",
              },
              {
                id: 2,
                name: "Arna Tech - Innovative IT Solutions for the Digital Age - Google Chrome",
                used: 1,
                duration: "0:00:14",
                activeDuration: "0:00:14",
              },
              {
                id: 3,
                name: "New Tab - Google Chrome",
                used: 1,
                duration: "0:00:03",
                activeDuration: "0:00:03",
              },
              {
                id: 4,
                name: "Employee Monitoring Tools - Files - Nextcloud - Google Chrome",
                used: 1,
                duration: "0:00:02",
                activeDuration: "0:00:02",
              },
              {
                id: 5,
                name: "Downloads",
                used: 1,
                duration: "0:00:01",
                activeDuration: "0:00:01",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start -b pb-3 last:-none">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-50 rounded-full flex items-center justify-center">
                    <TbAppsFilled className="text-green-500 w-3 h-3" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium ">{item.name}</span>
                    <span className="text-xs text-neutral-500">
                      Used {item.used} {item.used > 1 ? "times" : "time"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium ">{item.duration}</span>
                  <span className="text-xs text-green-500 whitespace-nowrap">
                    Active: {item.activeDuration}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl  bg-dynamic space-y-4">
            <p className="font-semibold">Top Websites</p>
            {[
              {
                id: 1,
                title: "New Tab - Google Chrome",
                url: "https://mock-url.com/New-Tab---Google-Chrome",
                duration: "0:00:03",
                visits: 1,
              },
              {
                id: 2,
                title:
                  "Employee Monitoring Tools - Files - Nextcloud - Google Chrome",
                url: "https://mock-url.com/Employee-Monitoring-Tools",
                duration: "0:00:02",
                visits: 1,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start -b pb-3 gap-x-3 last:-none">
                <div className="flex items-start gap-3 w-full overflow-hidden ">
                  <div className="p-2 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaGlobe className="text-blue-500 w-4 h-4" />
                  </div>
                  <div className="flex flex-col w-full overflow-hidden">
                    <span className="text-sm font-medium  truncate">
                      {item.title}
                    </span>
                    <span className="text-xs text-neutral-500 truncate">
                      {item.url}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="text-sm font-medium ">{item.duration}</span>
                  <span className="text-xs text-blue-500">
                    {item.visits} visits
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutCustom>
  );
}
