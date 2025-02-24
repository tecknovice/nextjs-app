import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";

export type Response<T> = {
  data?: T;
  status: number;
  error?: string;
};

// Accessing the environment variable for base URL
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("Request Interceptor", config);
    return config;
  },
  (error: AxiosError) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor (Keeps AxiosResponse Type)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Response Interceptor", response);
    return response
  }, // Return the raw Axios response
  (error: AxiosError) => {
    console.error("Response Error:", error);
    return Promise.reject(error)
  } // Reject errors as-is
);

// Generic function to handle API responses
const handleResponse = <T>(response: AxiosResponse<T>): Response<T> => {
  return { data: response.data, status: response.status };
};

// Generic function to handle errors
const handleError = <T>(error: unknown): Response<T> => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status || 500,
      error: error.response?.data?.error || error.message || "An error occurred",
    };
  }
  return { status: 500, error: "Unknown error occurred" };
};

// **Custom Wrapper Functions (Without Overriding Axios Methods)**
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<Response<T>> => {
  try {
    const response = await apiClient.get<T>(url, config);
    return handleResponse(response);
  } catch (error) {
    return handleError<T>(error);
  }
};

export const post = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<Response<TResponse>> => {
  try {
    const response = await apiClient.post<TResponse>(url, data, config);
    return handleResponse(response);
  } catch (error) {
    return handleError<TResponse>(error);
  }
};

export const put = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<Response<TResponse>> => {
  try {
    const response = await apiClient.put<TResponse>(url, data, config);
    return handleResponse(response);
  } catch (error) {
    return handleError<TResponse>(error);
  }
};

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<Response<T>> => {
  try {
    const response = await apiClient.delete<T>(url, config);
    return handleResponse(response);
  } catch (error) {
    return handleError<T>(error);
  }
};

// Export API Client (Unmodified)
export { apiClient };
