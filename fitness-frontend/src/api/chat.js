// import axiosInstance from './axiosInstance';

// // Get all products
// export const getProducts = async () => {
//   try {
//     const response = await axiosInstance.get('/products');
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.error || 'Failed to fetch products';
//   }
// };

// // Get a single product by ID
// export const getProduct = async (id) => {
//   try {
//     const response = await axiosInstance.get(`/products/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.error || 'Failed to fetch product';
//   }
// };
// export const sendMessage = async (message) => {
//   const res = await axiosInstance.post("/chat", { message });
//   return res.data;
// };
import axios from "./axiosInstance";

export const sendMessage = async (message) => {
  const res = await axios.post("/chat", { message });
  return res.data;
};

