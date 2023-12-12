const Student_API_URL = "http://127.0.0.1:3000/api/v1/students";

export const getAllStudentsApi = async ({ token, queryStr }) => {
  try {
    const response = await fetch(
      `${Student_API_URL}${queryStr ? `?${queryStr}` : ""}`
    );
    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);
    return { students: data.data.students, totalCount: data.data.totalCount };
  } catch (error) {
    throw error.message;
  }
};

export const updateStudentApi = async ({ token, id, updatedStudent }) => {
  try {
    const response = await fetch(`${Student_API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    });

    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);

    return data.data.user;
  } catch (error) {
    throw error.message;
  }
};

export const deleteStudentApi = async (token, studentId) => {
  try {
    const response = await fetch(`${Student_API_URL}/${studentId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);

    return { status: "success" };
  } catch (error) {
    throw error.message;
  }
};

export const getStudentApi = async ({ token, id }) => {
  try {
    const response = await fetch(`${Student_API_URL}/${id}`, {
      method: "GET",
      header: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.status !== "success") throw new Error(data.message);

    return data.data.student;
  } catch (error) {
    throw error.message;
  }
};
