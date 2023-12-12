import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import { getDarkMode, setDarkMode } from "../store/uiSlice";

function DarkModeToggle() {
  const darkMode = useSelector(getDarkMode);
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    dispatch(setDarkMode({ darkMode: !darkMode }));
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
