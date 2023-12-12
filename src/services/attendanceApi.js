const ATTENDANCE_API_URL = "http://127.0.0.1:3000/api/v1/attendances";

export const getStudentAttendance = async ({ token, studentRef, queryStr }) => {
  try {
    const response = await fetch(
      studentRef
        ? `http://127.0.0.1:3000/api/v1/students/${studentRef}/attendances${
            queryStr ? `?${queryStr}` : ""
          } `
        : `http://127.0.0.1:3000/api/v1/attendances${
            queryStr ? `?${queryStr}` : ""
          }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw error.message;
  }
};

export const getAttendanceRecordsApi = async ({
  token,
  queryStr,
  studentRef,
}) => {
  try {
    const response = await fetch(
      studentRef
        ? `http://127.0.0.1:3000/api/v1/students/${studentRef}/attendances/${
            queryStr ? `?${queryStr}` : ""
          }`
        : `http://127.0.0.1:3000/api/v1/attendances${
            queryStr ? `?${queryStr}` : ""
          }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);
    return data.data;
  } catch (error) {
    throw error.message;
  }
};

export const markPresentApi = async (token) => {
  try {
    const response = await fetch(ATTENDANCE_API_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.status) throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw error.message;
  }
};
