import { string } from "yup";

export interface User
{
  _id: string;
  email: string;
  avatar: string;
  provider: string;
  providerId: string;
  roles: string[];
  createdAt: string;
}