import axios from "axios";

const URL = `http://localhost:8000/api/v1`;

const api = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Nešto je pošlo po zlu. Pokušajte malo kasnije.";

    if (error.response) {
      message = error.response.data.message;
    } else {
      message =
        "Onemogućena komunikacija sa serverom. Proverite internet konekciju!";
    }
    return Promise.reject(message);
  }
);

export default api;