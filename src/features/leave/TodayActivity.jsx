import styled from "styled-components";

import Heading from "../../UI/Heading";
import Row from "../../UI/Row";

import Spinner from "../../UI/Spinner";
import TodayItem from "./TodayItem";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-1);
  border-radius: var(--border-radius-md);

  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  grid-column: 1 / span 2;
  padding-top: 1.5rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

function TodayActivity({ leaves, isLoading }) {
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
        <Button variation="primary" size="small">
          <Link type="primary" to={"/leave"}>
            See all
          </Link>
        </Button>
      </Row>

      {!isLoading ? (
        leaves?.length > 0 ? (
          <TodayList>
            {leaves.map((activity) => (
              <TodayItem activity={activity} key={activity._id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
