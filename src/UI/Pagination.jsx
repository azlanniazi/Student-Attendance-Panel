import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";
import { useEffect } from "react";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1rem;
  margin-left: 0.5rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-primary)" : "var(--color-gray-1)"};
  color: ${(props) => (props.active ? " var(--color-gray-5)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.25rem;
  }

  &:has(span:first-child) {
    padding-right: 0.25rem;
  }

  & svg {
    height: 1rem;
    width: 1rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-primary);
    color: var(--color-gray-5);
  }
`;

function Pagination({ count, maxSize }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const pageSize = maxSize || PAGE_SIZE;
  const pageCount = Math.ceil(count / pageSize);
  useEffect(() => {
    if (currentPage > pageCount) {
      searchParams.delete("page");
      setSearchParams(searchParams);
    }
  }, [pageCount, currentPage, searchParams, setSearchParams]);
  const prevFunction = () => {
    const prev = currentPage === 1 ? 1 : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };

  const nextFunction = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  };
  if (pageCount === 1 || count === 0) return null;
  return (
    <StyledPagination>
      <P>
        Showing{" "}
        <span>{currentPage === 1 ? 1 : (currentPage - 1) * pageSize + 1}</span>{" "}
        to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * pageSize}
        </span>{" "}
        of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={prevFunction} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextFunction}
          disabled={currentPage === pageCount}
        >
          <HiChevronRight />
          <span>Next</span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
