export interface User {
  email: string;
  avatar?: string;
  provider?: string;
  providerId?: string;
  roles?: string[];
  createdAt?: string;
}

export interface AuthInfo {
  message: string;
  success: boolean;
}

export interface UserConnected {
  isAuth: boolean;
  isInit: boolean;
  email?: User["email"];
  fullName?: string;
  avatar?: User["avatar"];
  authInfo?: AuthInfo;
  role?: User["roles"];
}
