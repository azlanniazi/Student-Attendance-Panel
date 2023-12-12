import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import Heading from "../../UI/Heading";
import usegetGradesCount from "./usegetGradesCount";
import { useSelector } from "react-redux";
import { getDarkMode } from "../../store/uiSlice";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-1);
  border-radius: var(--border-radius-md);
  grid-column: 3/-1;
  padding: 1.5rem 2rem;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const dataLight = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#a855f7",
];

const dataDark = [
  "#b91c1c",
  "#c2410c",
  "#a16207",
  "#4d7c0f",
  "#15803d",
  "#0f766e",
  "#1d4ed8",
  "#7e22ce",
];
const prepareData = (name, dataObject, startData) => {
  const data = [];
  Object.entries(dataObject).forEach(([key, value], index) => {
    data.push({ [name]: key, value, color: startData[index] });
  });
  return data;
};

function PieChartComponent({ name, data }) {
  const darkMode = useSelector(getDarkMode);
  const dataObject = usegetGradesCount(data);
  const dataColor = darkMode ? dataDark : dataLight;
  const preparedData = prepareData(name, dataObject, dataColor);
  return (
    <ChartBox>
      <Heading as="h2">{`${name} Chart`}</Heading>
      <ResponsiveContainer width={"100%"} height={240}>
        <PieChart>
          <Tooltip />
          <Pie
            innerRadius={80}
            outerRadius={110}
            data={preparedData}
            paddingAngle={3}
            cx={"45%"}
            cy={"50%"}
            dataKey={"value"}
            nameKey={name}
          >
            {preparedData.map((entry) => (
              <Cell
                key={entry[name]}
                stroke={entry.color}
                fill={entry.color}
              ></Cell>
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default PieChartComponent;
