import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";
import useGetDarkMode from "../hooks/useGetDarkMode";
import FullPage from "./FullPage";
import NotAuthorized from "../pages/NotAuthorized";

function ProtectedRoutes({ children, allowedRoles }) {
  const [user, isChecking] = useAuth();
  const isGettingDarkMode = useGetDarkMode();

  if (isChecking || isGettingDarkMode)
    return (
      <FullPage>
        <Spinner></Spinner>;
      </FullPage>
    );

  if (!user && !isChecking) return <Navigate to={"/signin"}></Navigate>;
  if (user && !allowedRoles.includes(user.role)) return <NotAuthorized />;
  return children;
}

export default ProtectedRoutes;
