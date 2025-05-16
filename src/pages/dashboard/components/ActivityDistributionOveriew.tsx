import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import colors from "../../../lib/colors";
import { useStorageStore } from "../../shared/storage.store";
import { ActivityDistribution } from "../../../types/dashboard.type";

interface ActivityDistributionProps {
  data: ActivityDistribution[];
}

export default function ActivityDistributionOveriew({
  data,
}: ActivityDistributionProps) {
  const { mode } = useStorageStore();

  return (
    <div className="p-5 rounded-xl bg-dynamic space-y-4 max-h-[50vh] relative">
      <p className="font-semibold">24-Hour Activity Distribution</p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, left: 100, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="hour"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: mode === "dark" ? "#18181b" : "#fff",
              border: "1px solid #444",
              color: mode === "dark" ? "#fff" : "#222",
            }}
            itemStyle={{
              color: mode === "dark" ? "#fff" : "#222",
            }}
            labelStyle={{
              color: mode === "dark" ? "#fff" : "#222",
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke={
              mode === "dark" ? colors.primary.main : colors.primary.contrast
            }
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
