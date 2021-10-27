import Axios from 'axios';

const accessToken: any = localStorage.getItem('accessToken');
const API_HOST = process.env.REACT_APP_API_URL;

export default Axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + accessToken?.accessToken,
  },
  timeout: 100000,
});
