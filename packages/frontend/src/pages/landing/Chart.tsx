import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import type { ScriptableContext } from "chart.js";
import type { ComponentProps } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const options: ComponentProps<typeof Line>["options"] = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    filler: {
      propagate: false,
    },
  },
  elements: {
    line: {
      cubicInterpolationMode: "monotone",
    },
  },
  devicePixelRatio: 2,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
};

const labels = ["1/3", "15/3", "30/3"];

const data: ComponentProps<typeof Line>["data"] = {
  labels,
  datasets: [
    {
      data: labels.map(() => Math.floor(Math.random() * 100)),
      borderColor: "#a78bfa",
      fill: true,
      backgroundColor: (context: ScriptableContext<"line">) => {
        const { ctx } = context.chart;
        const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);

        gradient.addColorStop(0, "#dcd1fd");
        gradient.addColorStop(1, "#dcd1fd00");

        return gradient;
      },
    },
  ],
};

const Chart = () => <Line options={options} data={data} />;

export default Chart;
