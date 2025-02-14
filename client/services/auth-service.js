"use client"
import axios from "axios";

export const signup = async (payload) => {
  return axios.post("/api/register", payload);
};

export const login = async (payload) => {
  return axios.post("/api/login", payload);
};

export const logout = async () => {
  return axios.post("/api/logout");
};