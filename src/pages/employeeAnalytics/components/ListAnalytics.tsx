import React from "react";
import { useGetEmpoyeeAnalyticDailyInsight } from "../employeeAnalytics.store";
import { Table } from "antd";
import { AnalyticsEmployeeDailyInsight } from "../../../types/analytics.type";
import { limits } from "chroma-js";

export default function ListAnalytics() {
  const { data, isLoading } = useGetEmpoyeeAnalyticDailyInsight({
    limit: 1,
    offset: 0,
  });

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {data?.results?.map((item: AnalyticsEmployeeDailyInsight) => (
        <div
          key={item.id}
          className=" border border-gray-200 p-4 rounded-xl grid grid-cols-2 gap-4"
        >
          <p>{item.employee?.full_name}</p>
          <p>{item.date}</p>
          <p>{item.risk_score}</p>
          <p>{item.productivity_score}</p>
          <p>{item.summary}</p>
          <p>{item.behavioral_patterns}</p>
          <p>{item.violations}</p>
        </div>
      ))}
    </div>
  );
}
