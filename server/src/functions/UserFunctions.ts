import { sign } from "jsonwebtoken";
import { pick } from "lodash";
import { SECRET } from "../config";

export const issueToken = async (user: any) => {
  const token = sign(user, SECRET, { expiresIn: 60 * 60 * 24 });
  return `Bearer ${token}`;
};

export const serializeUser = (user: any) =>
  pick(user, [
    "id",
    "email",
    "firstName",
    "lastName",
    "createdAt",
    "updatedAt",
    "password",
  ]);
