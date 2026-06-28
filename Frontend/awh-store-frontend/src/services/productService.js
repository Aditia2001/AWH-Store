import axiosInstance from "../api/axiosInstance";

export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get("/products", { params });
  return response.data;
};

export const getProductDetail = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (payload) => {
  const response = await axiosInstance.post("/products", payload);
  return response.data;
};

export const updateProduct = async (id, payload) => {
  const response = await axiosInstance.put(`/products/${id}`, payload);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};
