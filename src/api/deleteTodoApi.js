import api from "./api";

const deleteTodoRequest = async (id) => {
  const { data } = await api.delete(`/${id}`);
  // NOTE: I dont get id in response, that's why I don't use the response(id) to remove element in redux state

  return data;
};

export default deleteTodoRequest;
