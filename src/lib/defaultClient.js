import axios from 'axios';

const defaultClient = axios.create({
  baseURL: 'http://morethanchat.tk:8080/',
  timeout: 3000
});

export default defaultClient;