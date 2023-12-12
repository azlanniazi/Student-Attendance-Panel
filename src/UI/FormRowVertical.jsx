import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.3rem;

  padding: 0.75rem 0;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Error = styled.span`
  color: var(--color-danger);
`;

function FormRowVertical({ label, error, children, id }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
