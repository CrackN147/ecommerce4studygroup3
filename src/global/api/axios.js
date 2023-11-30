import axios from "axios";
import { apiURL } from "global/config";
export const _getRequest = async (url, params = {}) => {
  const response = await axios.get(apiURL + url, params);
  return response.data;
}