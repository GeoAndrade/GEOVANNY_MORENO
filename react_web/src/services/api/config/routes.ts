// routes.ts

export const BASE_URL: string = "https://localhost:7194/";

export const BASE_API: string = "/api";
//*Controllers
export const SECURITY_BASE_URL = `${BASE_API}/Security`;
export const USER_TASK_BASE_URL = `${BASE_API}/UserTask`;
//*Endpoints
export const SECURITY_ENDPOINTS = {
  LOGIN: `${SECURITY_BASE_URL}/Login`,
  REGISTER: `${SECURITY_BASE_URL}/Register`,
  CHANGE_PASSWORD: `${SECURITY_BASE_URL}/ChangePassword`,
  RENEW_TOKEN: `${SECURITY_BASE_URL}/RenewToken`,
  VALIDATE_TOKEN: `${SECURITY_BASE_URL}/ValidateToken`,
};
export const USER_TASK_ENDPOINTS = {};
