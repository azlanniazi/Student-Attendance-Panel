const LEAVE_API_URL = "http://127.0.0.1:3000/api/v1/leaves";

export const approveLeaveApi = async (token, id) => {
  try {
    const response = await fetch(`${LEAVE_API_URL}/${id}/approve`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.status !== "success") throw new Error(data.message);

    return data.data.leave;
  } catch (error) {
    throw error.message;
  }
};

export const rejectLeaveApi = async (token, id) => {
  try {
    console.log(id);
    const response = await fetch(`${LEAVE_API_URL}/${id}/reject`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);

    return data.data.leave;
  } catch (error) {
    throw error.message;
  }
};

export const getAllLeavesApi = async ({ token, queryStr, studentRef }) => {
  try {
    const url = studentRef
      ? `http://127.0.0.1:3000/api/v1/students/${studentRef}/leaves/${
          queryStr ? `?${queryStr}` : ""
        }`
      : `http://127.0.0.1:3000/api/v1/leaves${queryStr ? `?${queryStr}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

export const createLeaveApi = async (token, leaveData) => {
  try {
    const response = await fetch(LEAVE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(leaveData),
    });
    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);
    return data.data.leave;
  } catch (error) {
    throw error.message;
  }
};

export const deleteLeaveApi = async (token, id) => {
  try {
    const response = await fetch(`${LEAVE_API_URL}/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 204) throw new Error(response.statusText);
    return { status: "success" };
  } catch (error) {
    throw error.message;
  }
};
