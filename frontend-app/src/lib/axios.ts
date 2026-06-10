import axios from "axios";

const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Pola arsitektur: interceptor global menjaga concern error handling
    // tetap terpusat sehingga komponen UI tidak mengulang boilerplate yang sama.
    if (error.response?.status >= 500) {
      console.error("Generic server error intercepted", error.response.data);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
