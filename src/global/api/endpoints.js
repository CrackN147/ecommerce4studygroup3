import {
  _getRequest,
  _postRequest,
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