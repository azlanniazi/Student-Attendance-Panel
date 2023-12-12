import { createContext, useContext } from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const StyledBody = styled.section`
  margin: 0.25rem 0;
`;

const TableTitle = styled.div`
  background-color: var(--color-gray-3);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Footer = styled.footer`
  background-color: var(--color-gray-3);
  display: flex;
  justify-content: center;
  padding: 0.75rem;
`;

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
`;
const CommonRow = styled.div.attrs((props) => ({
  $columns: props.columns,
}))`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 1.5rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  background-color: var(--color-gray-2);
  border-bottom: 1px solid var(--color-gray);
  letter-spacing: 0.25px;
  text-transform: uppercase;
  font-weight: 600;
  padding: 1rem 1.5rem;
`;

const TableRow = styled(CommonRow)`
  padding: 0.75rem 1.5rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-2);
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

const Table = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
};

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return <StyledHeader columns={columns}>{children}</StyledHeader>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return <TableRow columns={columns}>{children}</TableRow>;
}

function Body({ data, render }) {
  if (data.length === 0) {
    return <Empty>No data to Show at the moment</Empty>;
  }
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
Table.TableTitle = TableTitle;

Table.propTypes = {
  columns: propTypes.string,
  children: propTypes.node,
};

Header.propTypes = {
  children: propTypes.node,
};

export default Table;
