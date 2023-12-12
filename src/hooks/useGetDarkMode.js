import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDarkMode, setDarkMode } from "../store/uiSlice";

function useGetDarkMode() {
  const [gettingDarkMode, setGettingDarkMode] = useState(true);
  const dispatch = useDispatch();
  const darkMode = useSelector(getDarkMode);

  useEffect(() => {
    const storedDarkMode =
      JSON.parse(localStorage.getItem("darkMode")) || false;
    dispatch(setDarkMode({ darkMode: storedDarkMode }));
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
    setGettingDarkMode(false);
  }, [darkMode]);

  return gettingDarkMode;
}

export default useGetDarkMode;
