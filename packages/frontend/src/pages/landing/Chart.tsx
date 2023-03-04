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

import theme from "tailwind-theme";

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
  aspectRatio: 21 / 9,
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
    point: {
      radius: 0,
    },
  },
  devicePixelRatio: 2,
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- i can't figure out how to get typescript working properly with importing the tailwind config skull emoji
        color: theme.colors["light-neutral"][400],
      },
      ticks: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        color: theme.colors["light-neutral"][1000],
        // callback: (val, i) => (i % 5 === 0 ? val : ""),
        // major: {
        //   enabled: true
        // },
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

const labels = Array.from({ length: 30 }, (_, i) => `${i + 1}/3`);

const data: ComponentProps<typeof Line>["data"] = {
  labels,
  datasets: [
    {
      data: labels.map(() => Math.floor(Math.random() * 100)),
      borderColor: "#a78bfa",
      borderWidth: 2,
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
