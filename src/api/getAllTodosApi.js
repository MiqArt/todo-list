import api from "./api";

const getAllTodosRequest = async () => {
  const { data } = await api.get();
  
  return data;
};

export default getAllTodosRequest;
