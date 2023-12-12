import ActionRow from "../../UI/ActionRow";
import Modal from "../../UI/Modal";
import Student from "../../UI/Student";
import Table from "../../UI/Table";
import Tag from "../../UI/Tag";
import { HiPencil, HiTrash } from "react-icons/hi";
import EditStudentForm from "./EditStudentForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudentApi } from "../../services/usersApi";
import { toast } from "react-hot-toast";
import Menus from "../../UI/Menus";
import ConfirmAction from "../../UI/ConfirmAction";
import styled from "styled-components";
import TableText from "../../UI/TableText";
import { getGradeTagColor } from "../../utils/helpers";


const TagDiv = styled.div`
  padding-left
  : 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-green-4);
`;
function StudentRow({ student }) {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: deleteStudentApi,
    onSuccess() {
      queryClient.invalidateQueries(["users"]);
      toast.success("User has been successfully deleted");
    },
    onError() {
      toast.error("Failed to delete the user");
    },
  });
  return (
    <Table.Row>
      <Student>{student.userName}</Student>
      <TableText type="primary">
        {Math.round(student.presentPercentage)} %
      </TableText>
      <TableText type="danger">
        {Math.round(student.absentPercentage)} %
      </TableText>
      <TableText type="secondary">
        {Math.round(student.leavePercentage)} %
      </TableText>
      <TagDiv>
        <Tag type={getGradeTagColor(student.grade)}>{student.grade}</Tag>
      </TagDiv>
      <ActionRow>
        <Menus>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={student._id}></Menus.Toggle>
              <Menus.List id={student._id}>
                <Modal.Open opens={"delete-student"}>
                  <Menus.Button>
                    <HiTrash></HiTrash>
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens="edit-student">
                  <Menus.Button size="small">
                    <HiPencil></HiPencil>
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window opens={"delete-student"}>
                <ConfirmAction
                  action={"Delete"}
                  message={`Are you sure you want to delete this ${student.userName} permanently? This
                  action cannot be undone.`}
                  resourceName={student.userName}
                  onConfirm={() => deleteUser(student._id)}
                  disabled={isDeleting}
                ></ConfirmAction>
              </Modal.Window>
              <Modal.Window opens="edit-student">
                <EditStudentForm student={student}></EditStudentForm>
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </Menus>
      </ActionRow>
    </Table.Row>
  );
}

export default StudentRow;
