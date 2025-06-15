import axios ,{AxiosInstance} from "axios";
import Cookies from 'js-cookie'

console.log('yeta index',process.env || '') 
const url =  process.env.NEXT_PUBLIC_API || ''
const getToken = ()=>{
    const token =  Cookies.get('access_token')
    console.log(token)
    return token;
}

const apiInstance: AxiosInstance =  axios.create({
    baseURL:url
})

apiInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance