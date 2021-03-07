import api from "./api";

const deleteAllTodosRequest = async (arrayOfIds) => {
  const requestArr = arrayOfIds.map(id => api.delete(`/${id}`));
  const { data } = await Promise.all(requestArr);
  
  return data;
};

export default deleteAllTodosRequest;
