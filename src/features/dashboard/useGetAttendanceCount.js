function useGetAttendanceCount(records) {
  const presentCount = records.filter(
    (record) => record.status === "present"
  ).length;
  const absentCount = records.filter(
    (record) => record.status === "absent"
  ).length;
  const leaveCount = records.filter(
    (record) => record.status === "leave"
  ).length;

  return { presentCount, absentCount, leaveCount };
}

export default useGetAttendanceCount;
