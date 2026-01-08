import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar as BarChart } from "react-chartjs-2";

// Register Chart.js components ONCE
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Chart({ labels = [], values = [] }) {
  return (
    <BarChart
      data={{
        labels,
        datasets: [
          {
            label: "Responses",
            data: values,
            backgroundColor: "#2563eb",
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
}
