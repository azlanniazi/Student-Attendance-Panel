import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { setLogout } from "../../store/authSlice";
import ButtonIcon from "../../UI/ButtonIcon";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("userData");
    navigate("/signin");
  };

  return (
    <ButtonIcon onClick={handleLogout}>
      <HiOutlineLogout />
    </ButtonIcon>
  );
}

export default Logout;
