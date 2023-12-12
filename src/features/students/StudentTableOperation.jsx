import Filter from "../../Ui/Filter";
import SortBy from "../../UI/SortBy";
import TableOperations from "../../UI/TableOperations";

function StudentTableOperation() {
  return (
    <TableOperations>
      <Filter
        defaultValue={""}
        filterKey={"grade"}
        options={[
          { value: "F", label: "Filter By Grade F" },
          { value: "C", label: "Filter By Grade C" },
          { value: "B", label: "Filter By Grade B" },
          { value: "A", label: "Filter By Grade A" },
          { value: "", label: "Get All Students" },
        ]}
      ></Filter>
      <SortBy
        options={[
          { value: "userName", label: "Sort by Name(Ascending)" },
          { value: "-userName", label: "Sort by Name(Descnding)" },
        ]}
      ></SortBy>
    </TableOperations>
  );
}

export default StudentTableOperation;
