import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 1.2rem 2rem;

      background-color: var(--color-gray-0);
      box-shadow: var(--shadow-md);
      border-radius: var(--border-radius-lg);

      overflow: hidden;
      font-size: 0.875rem;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 50rem;
    `}

  ${(props) =>
    props.type === "modal-vertical" &&
    css`
      width: 25rem;
    `}
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
