import axios from "axios";
import { apiURL } from "global/config";
import { getData } from "global/storage";

const checkHeaders = () => {
  const checkUser = () => {
    const user = getData('User');
    if (user && user.token && user.date > new Date().getTime()) {
      return `Bearer ${user.token}`;
    }
    return null;
  }

  return axios.defaults.headers.common['Authorization'] = checkUser();
}
export const _getRequest = async (url, params = {}) => {
  checkHeaders();
  const response = await axios.get(apiURL + url, params);
  return response.data;
}

export const _postRequest = async (url, params = {}) => {
  checkHeaders();
  const response = await axios.post(apiURL + url, params);
  return response.data;
}

export const _putRequest = async (url, params = {}) => {
  checkHeaders();
  const response = await axios.put(apiURL + url, params);
  return response.data;
}