import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const instance = axios.create({
  // baseURL: "http://localhost:4444",
  baseUrl: process.env.REACT_APP_API_URL
});

export default instance;
