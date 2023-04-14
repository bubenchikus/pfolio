import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444", // чтобы при запросе на axios не дописывать путь
});

// пишем middleware, который при каждом
// запросе будет проверять, авторизован ли пользователь,
// то есть имеется ли у него токен.

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = window.localStorage.getItem("token");
//   return config;
// });

export default instance;
