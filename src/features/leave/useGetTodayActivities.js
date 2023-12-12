import useGetLeaves from "./useGetLeaves";

function useGetTodayActivities() {
  const [leaves, fetchingLeaves] = useGetLeaves(null, null, true);

  return [leaves, fetchingLeaves];
}

export default useGetTodayActivities;
