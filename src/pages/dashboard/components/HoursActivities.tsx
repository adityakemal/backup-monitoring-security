import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import theme from "../../../lib/colors";
import colors from "../../../lib/colors";

const data = [
  { time: "00:00", activity: 5 },
  { time: "01:00", activity: 3 },
  { time: "02:00", activity: 8 },
  { time: "03:00", activity: 6 },
  { time: "04:00", activity: 4 },
  { time: "05:00", activity: 7 },
  { time: "06:00", activity: 9 },
  { time: "07:00", activity: 5 },
  { time: "08:00", activity: 8 },
  { time: "09:00", activity: 6 },
  { time: "10:00", activity: 7 },
  { time: "11:00", activity: 5 },
  { time: "12:00", activity: 9 },
  { time: "13:00", activity: 6 },
  { time: "14:00", activity: 4 },
  { time: "15:00", activity: 8 },
  { time: "16:00", activity: 7 },
  { time: "17:00", activity: 6 },
  { time: "18:00", activity: 5 },
  { time: "19:00", activity: 8 },
  { time: "20:00", activity: 7 },
  { time: "21:00", activity: 6 },
  { time: "22:00", activity: 9 },
  { time: "23:00", activity: 5 },
];
export default function HoursActivities() {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <LineChart
        data={data}
        margin={{ top: 0, right: 10, left: -35, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          angle={-45}
          textAnchor="end"
          interval={1}
          height={60}
          tick={{ fontSize: 12, fill: "#9ca3af" }}
        />
        <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="activity"
          stroke={colors.primary.main}
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
