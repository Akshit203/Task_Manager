import { API_URL } from "../utils/apiConfig";

const parseJSONResponse = async (response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

export const CreateTask = async (taskObj) => {
  const url = `${API_URL}/tasks`;
  console.log("url ", url);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  };
  try {
    const result = await fetch(url, options);
    const data = await parseJSONResponse(result);
    return data;
  } catch (err) {
    return err;
  }
};

export const GetAllTasks = async () => {
  const url = `${API_URL}/tasks`;
  console.log("url ", url);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await parseJSONResponse(result);
    return data;
  } catch (err) {
    return err;
  }
};

export const DeleteTaskById = async (id) => {
  const url = `${API_URL}/tasks/${id}`;
  console.log("url ", url);
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await parseJSONResponse(result);
    return data;
  } catch (err) {
    return err;
  }
};

export const UpdateTaskById = async (id, reqBody) => {
  const url = `${API_URL}/tasks/${id}`;
  console.log("url ", url);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };
  try {
    const result = await fetch(url, options);
    const data = await parseJSONResponse(result);
    return data;
  } catch (err) {
    return err;
  }
};

export default {
  CreateTask,
  GetAllTasks,
  DeleteTaskById,
  UpdateTaskById,
};
