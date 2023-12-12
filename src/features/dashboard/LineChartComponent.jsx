import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";
import { getDarkMode } from "../../store/uiSlice";
import { eachDayOfInterval, format, parseISO, isSameDay } from "date-fns";
import CardTitle from "../../UI/CardTitle";
import Row from "../../UI/Row";
import DashboardFilter from "./DashboardFilter";

const StyledLineChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-gray-3);
  }
`;

function LineChartComponent({ data, from, to }) {
  const darkMode = useSelector(getDarkMode);

  const allDates = eachDayOfInterval({
    start: +to - 1,
    end: from,
  });

  const countPercentage = (date, status, data) => {
    const totalCount = data.filter((el) => {
      return isSameDay(date, parseISO(el.date)) && el.status === status;
    }).length;
    const totalRecords = data.filter((el) =>
      isSameDay(date, parseISO(el.date))
    ).length;
    const percentage =
      totalRecords === 0 ? 0 : (totalCount / totalRecords) * 100;

    return Math.round(percentage);
  };
  const formattedData = allDates.map((date) => {
    const parsedDate = parseISO(date.toISOString());

    const presentPercentage = countPercentage(parsedDate, "present", data);

    const absentPercentage = countPercentage(parsedDate, "absent", data);

    const leavePercentage = countPercentage(parsedDate, "leave", data);
    return {
      label: format(date, "MMM dd"),
      present: presentPercentage,
      absent: absentPercentage,
      leave: leavePercentage,
    };
  });
  const colors = darkMode
    ? {
        leave: { stroke: "#4f46e5", fill: "#4f46e5" },
        present: { stroke: "#22c55e", fill: "#22c55e" },
        absent: { stroke: "#E63158", fill: "#E63158" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        leave: { stroke: "#4f46e5", fill: "#c7d2fe" },
        present: { stroke: "#16a34a", fill: "#dcfce7" },
        absent: { stroke: "#A80024", fill: "#f0839b" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledLineChart>
      <Row>
        <CardTitle as={"h3"}>Line Chart</CardTitle>
        <DashboardFilter
          options={[
            { value: "30", label: "This Month" },
            { value: "90", label: "Last 3 months" },
            { value: "365", label: "This Year" },
          ]}
        />
      </Row>
      <ResponsiveContainer height={300} width={"100%"}>
        <AreaChart data={formattedData}>
          <XAxis
            dataKey={"label"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit={"%"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid></CartesianGrid>
          <Tooltip
            contentStyle={{ backgroundColor: colors.background }}
          ></Tooltip>
          <Area
            dataKey={"present"}
            type={"monotone"}
            stroke={colors.present.stroke}
            fill={colors.present.fill}
            strokeWidth={2}
            name="Present"
            unit={"%"}
          ></Area>
          <Area
            dataKey={"leave"}
            type={"monotone"}
            stroke={colors.leave.stroke}
            fill={colors.leave.fill}
            strokeWidth={2}
            name={"Leave"}
            unit={"%"}
          />
          <Area
            dataKey={"absent"}
            type={"monotone"}
            stroke={colors.absent.stroke}
            fill={colors.absent.fill}
            strokeWidth={2}
            name={"Absent"}
            unit={"%"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledLineChart>
  );
}

export default LineChartComponent;
