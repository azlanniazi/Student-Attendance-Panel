import { useEffect, useState } from "react";

function useGetTodayString(date) {
  const [todayString, setTodayString] = useState();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  useEffect(() => {
    setTodayString(`${day}-${month}-${year}`);
  }, [day, month, year]);
  return todayString;
}

export default useGetTodayString;
