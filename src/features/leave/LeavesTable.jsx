import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CardTitle from "../../UI/CardTitle";
import Table from "../../UI/Table";
import LeaveRow from "./LeaveRow";
import { getAllLeavesApi } from "../../services/apiLeave";
import Spinner from "../../UI/Spinner";
import { PAGE_SIZE } from "../../utils/constants";
import { useSelector } from "react-redux";
import { getToken } from "../../store/authSlice";
import LeaveTableOperation from "./LeaveTableOperation";
import Pagination from "../../UI/Pagination";
import AsyncError from "../../UI/AsyncError";
import useGetLeaves from "./useGetLeaves";
// import useGetLeaves from "./useGetLeaves";

function LeaveTable() {
  // getting token from redux store
  const token = useSelector(getToken);

  // getting query client
  const queryClient = useQueryClient();
  // fetching search params
  const [searchParams] = useSearchParams();

  // seting search params for leaves status to pending and set default page to 1
  const filteredField = searchParams.get("status") || "pending";
  const page = searchParams.get("page") || 1;

  // creating query string base  on status
  const queryStr = `${
    filteredField === "pending" ? `status=${filteredField}&` : ""
  }`;

  // modifying query string for pages
  const currentQueryStr = `${queryStr}page=${page}&limit=${PAGE_SIZE}&sort=studentRef`;
  // fetching leaves using useGetLeaves hook
  const { leavesData, fetchingLeaves, error, startDateString, endDateString } =
    useGetLeaves(false, currentQueryStr, filteredField, page);
  // rendering spinner while fetching leaves
  console.log;
  if (fetchingLeaves) return <Spinner />;
  // handling async fetching error
  if (error) return <AsyncError message={error.message}></AsyncError>;

  // destructing data recieved from api
  const { leaves, totalCount } = leavesData;

  // calculating pages
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  // defining function to prefetch data
  const prefetchQuery = (page) => {
    const prefetchQueryStr = `${queryStr}page=${page}&limit=${PAGE_SIZE}&sort=studentRef`;
    queryClient.prefetchQuery({
      queryFn: () => getAllLeavesApi({ token, queryStr: prefetchQueryStr }),
      queryKey: ["leaves", filteredField, page, startDateString, endDateString],
    });
  };

  // prefetching
  if (page < pageCount) prefetchQuery(page + 1);

  if (page > 1) prefetchQuery(page - 1);

  // renders
  return (
    <Table columns={"1fr .5fr 1fr 3fr 1fr"}>
      <Table.TableTitle>
        <CardTitle as={"h2"}>Leaves</CardTitle>
        <LeaveTableOperation />
      </Table.TableTitle>
      <Table.Header>
        <div>Student</div>
        <div>Status</div>
        <div>Date</div>
        <div>Reason</div>
      </Table.Header>
      <Table.Body
        data={leaves}
        render={(leave) => <LeaveRow leave={leave} key={leave._id} />}
      ></Table.Body>
      <Table.Footer>
        <Pagination count={totalCount}></Pagination>
      </Table.Footer>
    </Table>
  );
}

export default LeaveTable;
