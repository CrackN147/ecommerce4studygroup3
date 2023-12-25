import {
  _getRequest,
  _postRequest,
  _putRequest
} from "global/api/axios";

export const getAllProducts = async (query) => {
  return await _getRequest(`products${query ? `?${query}` : ""}`);
}

export const getProductById = async (id) => {
  return await _getRequest(`products/${id}`);
}

export const getProductsByCategory = async (categoryName) => {
  return await _getRequest(`products/category/${categoryName}`);
}

export const getAllCategories = async () => {
  return await _getRequest("products/categories");
}

export const userLogin = async (params) => {
  return await _postRequest("auth/login", params);
}

export const getUserInfo = async () => {
  return await _getRequest("users/1", );
}

export const updateUserInfo = async (data) => {
  return await _putRequest("users/1", data);
}

export const getUserCart = async () => {
  return await _getRequest("carts/user/1");
}

export const updateCart = async (cartID, data) => {
  return await _putRequest(`carts/${cartID}`, data);
}