import CardTitle from "../UI/CardTitle";
import Row from "../UI/Row";
import DashBoardLayout from "../features/dashboard/DashBoardLayout";

function AdminDashboard() {
  return (
    <>
      <Row type="horizontal">
        <CardTitle as={"h2"}>Dashboard</CardTitle>
      </Row>

      <DashBoardLayout />
    </>
  );
}

export default AdminDashboard;
