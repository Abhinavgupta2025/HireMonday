const getApiBaseUrl = () => {
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:3000";
  }
  return import.meta.env.VITE_API_URL || "https://hiremonday.onrender.com";
};

export const API_BASE_URL = getApiBaseUrl();
export const USER_API_END_POINT = `${API_BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${API_BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_BASE_URL}/api/v1/company`;
export const NOTIFICATION_API_END_POINT = `${API_BASE_URL}/api/v1/notifications`;
