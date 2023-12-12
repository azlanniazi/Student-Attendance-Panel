import styled from "styled-components";
import Button from "./Button";
import CardTitle from "./CardTitle";

const StyledConfirmAction = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & p {
    color: var(--color-gray-5);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }
`;

function ConfirmAction({
  resourceName,
  onConfirm,
  disabled,
  onClose,
  action,
  message,
}) {
  const handleOnConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <StyledConfirmAction>
      <CardTitle as="h3">
        {action} {resourceName}
      </CardTitle>
      <p>{message}</p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variation="primary"
          disabled={disabled}
          onClick={handleOnConfirm}
        >
          {action}
        </Button>
      </div>
    </StyledConfirmAction>
  );
}

export default ConfirmAction;
