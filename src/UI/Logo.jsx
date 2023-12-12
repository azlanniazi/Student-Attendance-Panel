import { useSelector } from "react-redux";
import styled from "styled-components";
import { getDarkMode } from "../store/uiSlice";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 7rem;
  border-radius: 50%;
  width: auto;
`;

function Logo() {
  const darkMode = useSelector(getDarkMode);
  const src = darkMode ? "/logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
