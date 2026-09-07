import axios from "axios";
import { tokenStore } from "./tokenStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Holds the currently running refresh request.
// All concurrent 401 requests share this promise.
let refreshPromise = null;

api.interceptors.request.use(
  (config) => {
    const token = tokenStore.getToken();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If request config is unavailable, just reject.
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Only handle 401 responses.
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Never try to refresh the refresh endpoint itself.
    if (originalRequest.url === "/users/refresh") {
      tokenStore.clearToken();
      return Promise.reject(error);
    }

    // Prevent the same request from being retried repeatedly.
    if (originalRequest._retry) {
      tokenStore.clearToken();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      /*
       * If another request is already refreshing the token,
       * wait for that same refresh request.
       *
       * Otherwise, create a new refresh request.
       */
      if (!refreshPromise) {
        refreshPromise = api
          .post(
            "/users/refresh",
            {},
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            const newAccessToken = response.data?.accessToken;

            if (!newAccessToken) {
              throw new Error(
                "No access token returned from refresh"
              );
            }

            tokenStore.setToken(newAccessToken);

            return newAccessToken;
          })
          .finally(() => {
            // Allow a future refresh after this one completes.
            refreshPromise = null;
          });
      }

      // Wait for the existing/new refresh request.
      const newAccessToken = await refreshPromise;

      // Attach the new token to the failed request.
      originalRequest.headers =
        originalRequest.headers || {};

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      // Retry the original request.
      return api(originalRequest);
    } catch (refreshError) {
      tokenStore.clearToken();

      return Promise.reject(refreshError);
    }
  }
);

export default api;

