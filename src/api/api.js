import axios from 'axios';

export default axios.create({
  baseURL: 'https://todo.eachbase.com/api/ArtakMikayelyan/todos',
  responseType: 'json'
});