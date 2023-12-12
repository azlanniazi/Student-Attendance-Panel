import Filter from "../../UI/Filter";
import TimeFilter from "../../UI/TimeFilter";
import TableOperations from "../../UI/TableOperations";

function LeaveTableOperation() {
  return (
    <TableOperations>
      <TimeFilter />
      <Filter
        defaultValue={"pending"}
        filterKey={"status"}
        options={[
          { value: "all", label: "All Leaves" },
          { value: "pending", label: "Pending Leaves" },
        ]}
      ></Filter>
    </TableOperations>
  );
}

export default LeaveTableOperation;
