import styled from "styled-components";
import Input from "./Input";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TimeContainer = styled.form`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  label {
    font-size: 1rem;
  }
`;

const TimeInput = styled(Input).attrs({ type: "date" })``;

function TimeFilter() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const onToChange = (e) => {
    setTo(e.target.value);
  };

  const onFromChange = (e) => {
    setFrom(e.target.value);
  };

  useEffect(() => {
    if ((from !== null) & (to !== null)) {
      searchParams.set("from", from);
      searchParams.set("to", to);
      setSearchParams(searchParams);
    }
  }, [from, to, setSearchParams, searchParams]);
  return (
    <TimeContainer>
      <label>To :</label>
      <TimeInput id="to" onChange={onToChange} />
      <label>From :</label>
      <TimeInput id="from" onChange={onFromChange} />
    </TimeContainer>
  );
}

export default TimeFilter;
