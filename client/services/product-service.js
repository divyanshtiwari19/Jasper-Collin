import axios from "axios";

export const createProduct = (payload) => {
  return axios.post("/api/products", payload);
};

export const getProducts = (payload) => {
  return axios.get("/api/products", payload);
};

export const updateProduct = (id, payload) => {
  return axios.put(`/api/products/${id}`, payload);
};

export const deleteProduct = (id) => {
  return axios.delete("/api/products/" + id);
};
