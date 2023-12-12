import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import FullPage from "../UI/FullPage";
import Button from "../UI/Button";

function NotAuthorized() {
  const navigate = useNavigate();
  return (
    <FullPage>
      <Card>
        You are Not Authorized to access this page{" "}
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </Card>
    </FullPage>
  );
}

export default NotAuthorized;
