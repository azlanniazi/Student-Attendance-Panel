import Filter from "../../UI/Filter";
import TimeFilter from "../../UI/TimeFilter";

function DashboardFilter({ options }) {
  return (
    <>
      <TimeFilter />
      <Filter filterKey="last" options={options} />
    </>
  );
}
export default DashboardFilter;
