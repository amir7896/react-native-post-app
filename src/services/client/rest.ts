import axios, {AxiosInstance} from 'axios';

const Ip: string = '192.168.45.180';
const Port: string = '4000';

export const Api: AxiosInstance = axios.create({
  baseURL: `http://${Ip}:${Port}/api/`,
  // baseURL: `${deployUrl}api/`,
  headers: {'Content-type': 'application/json'},
});
