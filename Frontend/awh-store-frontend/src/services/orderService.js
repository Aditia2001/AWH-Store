import axiosInstance from "../api/axiosInstance";

export const checkout = async (payload) => {
  const response = await axiosInstance.post("/checkout", payload);
  return response.data;
};

export const getOrderHistory = async () => {
  const response = await axiosInstance.get("/orders");
  return response.data;
};

export const getOrderDetail = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};
