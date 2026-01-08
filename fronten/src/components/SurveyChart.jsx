import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SurveyChart({ title, labels, values }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h4>{title}</h4>
      <Bar
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
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>
  );
}
