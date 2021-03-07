import api from "./api";

const patchTodoRequest = async ({ _id, title, description, color }) => {
  const todoBody = { title, description, color };
  const { data } = await api.patch(`/${_id}`, todoBody);
  
  return data;
};

export default patchTodoRequest;
