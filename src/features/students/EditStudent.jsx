import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import EditStudentForm from "./EditStudentForm";
import { HiPencil } from "react-icons/hi";

function EditStudent({ student }) {
  return (
    <Modal>
      <Modal.Open opens="edit-student">
        <Button size="small">
          <HiPencil></HiPencil>
        </Button>
      </Modal.Open>
      <Modal.Window opens="edit-student">
        <EditStudentForm student={student}></EditStudentForm>
      </Modal.Window>
    </Modal>
  );
}

export default EditStudent;
