import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & label {
    font-size: 1rem;
    font-weight: 500;
  }

  & span {
    font-size: 1rem;
    font-weight: 400;
  }
`;

const DataItem = ({ label, data }) => {
  return (
    <StyledDataItem>
      <label>{label}</label>
      <span>{data}</span>
    </StyledDataItem>
  );
};

export default DataItem;
