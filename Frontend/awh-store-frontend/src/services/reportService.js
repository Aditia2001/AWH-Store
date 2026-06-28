import axiosInstance from "../api/axiosInstance";

export const getSalesReport = async () => {
  const response = await axiosInstance.get("/reports/sales");
  return response.data;
};
