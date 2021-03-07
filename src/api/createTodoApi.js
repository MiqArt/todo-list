import api from "./api";

const createTodoRequest = async (todo) => {
  const { data } = await api.post('/', todo);
  
  return data;
};

export default createTodoRequest;
