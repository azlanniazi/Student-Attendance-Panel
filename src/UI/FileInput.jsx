import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 0.75rem;
    margin-right: 0.75rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-green-1);
    background-color: var(--color-green-6);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-green-7);
    }
  }
`;

export default FileInput;
