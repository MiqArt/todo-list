import api from "./api";

const deleteAllTodosRequest = async (arrayOfIds) => {
  const requestArr = arrayOfIds.map(id => api.delete(`/${id}`));
  const { data } = await api.all(requestArr);


  // const { data } = await api.delete(`/:${arrayOfIds}`);
  // NOTE: I dont get id in response, that's why I don't use the response(id) to remove element in redux state

  return data;
};

export default deleteAllTodosRequest;
