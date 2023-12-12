import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 10rem 0.7fr 1fr;
  gap: 1.5rem;
  align-items: center;

  padding: 0.75rem 0;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Error = styled.span`
  color: var(--color-danger);
`;

function FormRow({ label, error, children, id }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
