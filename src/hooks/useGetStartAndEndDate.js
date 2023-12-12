import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getISODate } from "../utils/helpers";

function useGetStartAndEndDate(filteredKey, today) {
  let startDate;
  let endDate;
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  if (today) {
    startDate = new Date();
    endDate = new Date();
  } else if (from && to) {
    startDate = new Date(from);
    endDate = new Date(to);
  } else {
    const last = searchParams.get("last") || 30;

    startDate = new Date();
    endDate = new Date(subDays(startDate, +last));
  }
  const dateQuery = `${filteredKey}[lte]=${getISODate(startDate, {
    end: true,
  })}&${filteredKey}[gt]=${getISODate(endDate)}`;
  return [startDate, endDate, dateQuery];
}

export default useGetStartAndEndDate;
