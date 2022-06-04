import { verify } from "jsonwebtoken";
import { SECRET } from "../config";
import { User } from "../models";

const AuthMiddleware = async (req, res, next): any => {
  const authHeaders = req.get("Authorization");
  if (!authHeaders) {
    req.isAuth = false;
    return next();
  }
  //   Extract that token using
  const token = authHeaders.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  //   Decode that token using verify
  let decodedToken;
  try {
    decodedToken = verify(token, SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  // Find the user from the db
  const authUser = await User.findById(decodedToken.id);
  console.log(authUser);
  if (!authUser) {
    req.isAuth = false;
    return next();
  }

  //   Set the req user to the fetch user
  req.user = authUser;
  req.isAuth = true;
  return next();
};

export default AuthMiddleware;
