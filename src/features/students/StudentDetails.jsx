import {
  HiOutlineMinusCircle,
  HiOutlineCheckCircle,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

import AsyncError from "../../UI/AsyncError";
import ActionRow from "../../UI/ActionRow";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import CardTitle from "../../UI/CardTitle";
import { MdOutlineGrade } from "react-icons/md";
import Heading from "../../UI/Heading";
import ProfilePhoto from "../../UI/ProfilePhote";
import Row from "../../UI/Row";
import Modal from "../../UI/Modal";
import LeaveForm from "../leave/LeaveForm";
import { useSelector } from "react-redux";
import { getUser } from "../../store/authSlice";
import useGetStudentDetails from "./useGetStudentDetails";
import Spinner from "../../UI/Spinner";
import Stat from "../dashboard/Stat";
import { getGradeTagColor } from "../../utils/helpers";
import MarkPresent from "../dashboard/MarkPresent";
import { useParams } from "react-router-dom";

function StudentDetails() {
  let studentRef;
  const user = useSelector(getUser);
  const params = useParams();
  if (params?.studentRef) {
    studentRef = params.studentRef;
  } else {
    studentRef = user?.studentRef?._id || user.studentRef;
  }
  const { studentDetails, fetchingStudentDetails, studentDetailsError } =
    useGetStudentDetails(studentRef);
  if (fetchingStudentDetails) return <Spinner />;
  console.log(studentDetails);
  return (
    <Card type="gray">
      <Row type="horizontal">
        <CardTitle as="h2">Student Details</CardTitle>
        {user.role === "student" && (
          <ActionRow>
            <Modal>
              <Modal.Open opens={"request-leave"}>
                <Button size="small" variation="secondary">
                  Request Leave
                </Button>
              </Modal.Open>
              <Modal.Window opens={"request-leave"}>
                <LeaveForm></LeaveForm>
              </Modal.Window>
            </Modal>
            <MarkPresent />
          </ActionRow>
        )}
      </Row>
      {studentDetailsError ? (
        <AsyncError message="Failed to fetch student details." />
      ) : (
        <Row type="horizontalStart">
          <ProfilePhoto src={user.photo}></ProfilePhoto>
          <Row type="vertical">
            <Heading as="h3">{user.userName}</Heading>
            <Row type="horizontal">
              <Stat
                title={"Present %"}
                icon={<HiOutlineCheckCircle />}
                value={Math.ceil(studentDetails.presentPercentage)}
                color={"green"}
              ></Stat>
              <Stat
                title={"Absent %"}
                icon={<HiOutlineMinusCircle />}
                value={Math.ceil(studentDetails.absentPercentage)}
                color={"danger"}
              ></Stat>
              <Stat
                title={"Leave %"}
                icon={<HiOutlineClipboardCheck />}
                value={Math.ceil(studentDetails.leavePercentage)}
                color={"blue"}
              ></Stat>
              <Stat
                color={getGradeTagColor(studentDetails.grade)}
                title={"Grade"}
                value={studentDetails.grade}
                icon={<MdOutlineGrade />}
              ></Stat>
            </Row>
          </Row>
        </Row>
      )}
    </Card>
  );
}

export default StudentDetails;
