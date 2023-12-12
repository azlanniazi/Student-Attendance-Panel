import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid
    ${(props) =>
      props.type === "white" ? "var(--color-gray-1)" : "var(--color-gray-4)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-gray-1);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
