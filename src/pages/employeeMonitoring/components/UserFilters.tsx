import React, { useState } from "react";
import HeaderFilterCustom from "../../shared/components/HeaderFilterCustom";
import dayjs from "dayjs";

export default function UserFilters() {
  const [dateRangeValue, setDateRangeValue] = useState([dayjs(), dayjs()]);

  const handleDateRange = (val: any) => {
    console.log("====================================");
    console.log(val);
    setDateRangeValue(val);
    console.log("====================================");
  };
  return (
    <div className="flex basis-6 w-full gap-4 justify-end ">
      <div className="basis-2/6">
        <p className="text-xs mb-1">Date Range</p>
        <HeaderFilterCustom
          dateRangeValue={dateRangeValue}
          handleDateRange={handleDateRange}
        />
      </div>
    </div>
  );
}
