// FIX #3 — Export apiClient as a named export so callers can use
//           `import { apiClient } from './src/services/api'`.
//           Previously only a default export existed on axios.config.ts.
import apiClient from './axios.config';

export { apiClient };

export const apiService = {
  get: (url: string, params?: any) => apiClient.get(url, { params }),
  post: (url: string, data: any) => apiClient.post(url, data),
  put: (url: string, data: any) => apiClient.put(url, data),
  delete: (url: string) => apiClient.delete(url),
};

export { courseApi } from './courseApi';
export { userApi } from './userApi';
export { fetchWithSWR, invalidateCache, clearCache } from './cache';

export default apiService;
