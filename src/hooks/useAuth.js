import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/authSlice";
import { useQueryClient } from "@tanstack/react-query";

function useAuth() {
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));

    if (user && token) {
      queryClient.setQueryData(["user"], user);
      dispatch(setLogin({ user, token }));

      setUser(user);
    }
    setIsChecking(false);
  }, [dispatch, queryClient]);

  return [user, isChecking];
}

export default useAuth;
