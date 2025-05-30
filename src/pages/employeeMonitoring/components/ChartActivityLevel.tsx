import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useStorageStore } from "../../shared/storage.store";
import { BsCheck } from "react-icons/bs";

const initialData = [
  { name: "Critical", value: 2 },
  { name: "High", value: 2 },
  { name: "Moderate", value: 18 },
  { name: "Low", value: 65 },
];

const getThemeColors: any = (mode: string) => ({
  Low: mode === "dark" ? "#60a5fa" : "#3b82f6", // blue-400/500
  Moderate: mode === "dark" ? "#fde68a" : "#fbbf24", // amber-300/400
  High: mode === "dark" ? "#fdba74" : "#f97316", // orange-400/500
  Critical: mode === "dark" ? "#ef4444" : "#dc2626", // red-500/600
});

export default function ChartActivityLevel() {
  const { mode } = useStorageStore();
  const themeColors = getThemeColors(mode);

  const [visible, setVisible] = useState<Record<string, boolean>>({
    Low: true,
    Moderate: true,
    High: true,
    Critical: true,
  });

  const allSelected = initialData.every((d) => visible[d.name]);
  const filteredData = initialData.filter((d) => visible[d.name]);
  const allValue = initialData.reduce((sum, d) => sum + d.value, 0);

  const handleLegendClick = (name: string) => {
    if (name === "All") {
      if (!allSelected) {
        setVisible(Object.fromEntries(initialData.map((d) => [d.name, true])));
      }
      return;
    }
    const selectedCount = Object.values(visible).filter(Boolean).length;
    if (selectedCount === 1 && visible[name]) return;
    setVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Helper to get background with opacity
  const getBg = (color: string, isSelected: boolean) =>
    isSelected ? `${color}22` : undefined; // 13% opacity in hex

  return (
    <div className="flex items-center justify-center w-full h-full">
      <ResponsiveContainer width={300} height={300}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            stroke="#fff">
            {filteredData.map((entry) => (
              <Cell
                style={{ outline: "none" }}
                key={`cell-${entry.name}`}
                fill={themeColors[entry.name]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="ml-4 flex flex-col gap-3 text-base">
        {/* "All" button */}
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1 rounded font-medium focus:outline-none transition cursor-pointer"
          style={{
            background: allSelected ? "#22c55e22" : undefined, // green-500 with opacity
            opacity: allSelected ? 1 : 0.8,
          }}
          onClick={() => handleLegendClick("All")}>
          {/* Checkbox */}
          <span className="flex items-center justify-center w-6 h-6 rounded border-2 border-gray-400 bg-white dark:bg-neutral-900 transition">
            {allSelected && <BsCheck className="text-green-600 text-2xl" />}
          </span>
          <span>All</span>
          <span className="font-bold">{allValue}</span>
        </button>
        {/* Individual buttons */}
        {initialData.map((entry) => {
          const isSelected = visible[entry.name];
          return (
            <button
              key={entry.name}
              type="button"
              className="flex items-center gap-2 px-2 py-2 rounded font-medium focus:outline-none transition cursor-pointer"
              style={{
                background: getBg(themeColors[entry.name], isSelected),
                opacity: isSelected ? 1 : 0.6,
              }}
              onClick={() => handleLegendClick(entry.name)}>
              {/* Checkbox */}
              <span className="flex items-center justify-center w-6 h-6 rounded border-2 border-gray-400 bg-white dark:bg-neutral-900 transition">
                {isSelected && <BsCheck className="text-green-600 text-2xl" />}
              </span>
              {/* Color dot */}
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: themeColors[entry.name] }}
              />
              <span>{entry.name}</span>
              <span className="font-bold">{entry.value}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
