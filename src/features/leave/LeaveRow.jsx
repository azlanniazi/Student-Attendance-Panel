import ActionRow from "../../UI/ActionRow";
import Button from "../../UI/Button";
import ConfirmAction from "../../UI/ConfirmAction";
import Modal from "../../UI/Modal";
import Table from "../../UI/Table";
import Student from "../../UI/Student";
import DateDiv from "../../UI/DateDiv";
import SpinnerMini from "../../UI/SpinnerMini";
import styled from "styled-components";
import { formatDate } from "../../utils/helpers";
import useRejectLeave from "./useRejectLeave";
import useApproveLeave from "./useApproveLeave";
import useDeleteLeave from "./useDeleteLeave";
import Tag from "../../UI/Tag";

const Reason = styled.p`
  color: var(--color-gray-5);
  font-size: 0.75rem;
`;

function LeaveRow({ leave }) {
  const [rejectLeave, isRejecting] = useRejectLeave();
  const [approveLeave, isApproving] = useApproveLeave();
  const [deleteLeave, isDeleting] = useDeleteLeave();
  return (
    <Table.Row>
      {isApproving || isRejecting || isDeleting ? (
        <SpinnerMini />
      ) : (
        <>
          <Student>{leave.studentRef.userName}</Student>
          <Tag
            type={
              leave.status === "rejected"
                ? "danger"
                : leave.status === "pending"
                ? "gray"
                : "secondary"
            }
          >
            {leave.status}
          </Tag>
          <DateDiv date={leave.date} />
          <Reason>{leave.reason}</Reason>
          <ActionRow type="flex-start">
            <Modal>
              {leave.status === "pending" ? (
                <>
                  <Modal.Open opens={"confirm-approve"}>
                    <Button size="small" variation="primary">
                      Approve
                    </Button>
                  </Modal.Open>
                  <Modal.Open opens={"confirm-reject"}>
                    <Button size="small" variation="danger">
                      Reject
                    </Button>
                  </Modal.Open>
                  <Modal.Window opens={"confirm-approve"}>
                    <ConfirmAction
                      action={"Approve"}
                      onConfirm={() => approveLeave(leave._id)}
                      message={`Are you sure to approve leave for ${
                        leave.studentRef.userName
                      } on ${formatDate(leave.date)}? `}
                      resourceName={"leave"}
                    />
                  </Modal.Window>
                  <Modal.Window opens={"confirm-reject"}>
                    <ConfirmAction
                      action={"Reject"}
                      onConfirm={() => rejectLeave(leave._id)}
                      message={`Are you sure to approve leave for ${
                        leave.studentRef.userName
                      } on ${formatDate(leave.date)}? `}
                      resourceName={"leave"}
                    />
                  </Modal.Window>
                </>
              ) : (
                <>
                  <Modal.Open opens={"confirm-delete-leave"}>
                    <Button size="small" variation="danger">
                      Delete
                    </Button>
                  </Modal.Open>
                  <Modal.Window opens={"confirm-delete-leave"}>
                    <ConfirmAction
                      action={"Delete"}
                      onConfirm={() => deleteLeave(leave._id)}
                      message={`Are you sure to delete leave for ${
                        leave.studentRef.userName
                      } on ${formatDate(leave.date)}? `}
                      resourceName={"leave"}
                    />
                  </Modal.Window>
                </>
              )}
            </Modal>
          </ActionRow>
        </>
      )}
    </Table.Row>
  );
}

export default LeaveRow;
