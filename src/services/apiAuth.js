const AUTH_API_URL = "http://127.0.0.1:3000/api/v1/users";

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);
    return data.data;
  } catch (error) {
    throw error.message;
  }
};

export const signup = async ({
  email,
  password,
  passwordConfirm,
  userName,
}) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, userName, passwordConfirm }),
    });
    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);
    return data.data;
  } catch (error) {
    throw error.message;
  }
};

export const updateMeApi = async (updatedUser, token) => {
  try {
    console.log(updatedUser);
    const formData = new FormData();
    if (updatedUser.photo) formData.append("photo", updatedUser.photo);
    if (updatedUser.userName) formData.append("userName", updatedUser.userName);

    const response = await fetch(`${AUTH_API_URL}/updateme`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    });
    const data = await response.json();
    if (data.status !== "success") throw new Error(data.message);
    return data.data.user;
  } catch (error) {
    throw error.message;
  }
};

export const updatePasswordApi = async (updatedPassword, token) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/updatePassword`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updatedPassword),
    });
    const data = await response.json();
    console.log(data.status);
    if (data.status !== "success") throw new Error(data.message);
    return data.data.user;
  } catch (error) {
    throw error.message;
  }
};

export const deleteUserApi = async (userId) => {
  try {
    const response = await fetch(`${AUTH_API_URL}/${userId}`, {
      method: "DELETE",
    });
    const data = response.json();
    if (data.status !== "success") throw new Error(data.message);
    return data;
  } catch (error) {
    throw error.message;
  }
};
