import { useQueryClient } from "@tanstack/react-query";
import CardTitle from "../../UI/CardTitle";
import Table from "../../UI/Table";
import { getAllStudentsApi } from "../../services/usersApi";
import StudentRow from "./StudentRow";
import StudentTableOperation from "./StudentTableOperation";
import Pagination from "../../UI/Pagination";
import { PAGE_SIZE } from "../../utils/constants";
import Spinner from "../../UI/Spinner";
import useGetStudents from "./useGetStudents";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";
import AsyncError from "../../UI/AsyncError";

function StudentsTable() {
  const token = useSelector(getToken);
  const queryClient = useQueryClient();
  const { data, fetchingUsers, queryStr, sortBy, filteredField, page, error } =
    useGetStudents();

  if (fetchingUsers) return <Spinner></Spinner>;
  if (error) return <AsyncError message={"Failed to fetch students."} />;
  const { students, totalCount } = data;
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);
  const prefetchQuery = (page) => {
    const prefetchQueryStr = `${queryStr}&page=${page}&limit=${PAGE_SIZE}`;
    queryClient.prefetchQuery({
      queryKey: ["users", filteredField, sortBy, page],
      queryFn: () => getAllStudentsApi(token, prefetchQueryStr),
    });
  };

  if (page < pageCount) {
    prefetchQuery(page + 1);
  }
  if (page > 1) {
    prefetchQuery(page - 1);
  }

  return (
    <Table columns="1.5fr 1fr 1fr 1fr 1fr 1fr">
      <Table.TableTitle>
        <CardTitle>Students</CardTitle>
        <StudentTableOperation />
      </Table.TableTitle>
      <Table.Header>
        <div>Name</div>
        <div>Present</div>
        <div>Absent</div>
        <div>Leave</div>
        <div>Grade</div>
      </Table.Header>
      <Table.Body
        data={students}
        render={(student) => <StudentRow student={student} key={student._id} />}
      />
      <Table.Footer>
        <Pagination count={totalCount} />
      </Table.Footer>
    </Table>
  );
}

export default StudentsTable;
