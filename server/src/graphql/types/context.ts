// import { User } from "./user";

// export interface Context {
//   user?: User;
// }
import { Request, Response } from "express";
import { User } from "../schema/user.schema";

interface Context {
  req: Request & {
    session: {
      user?: any;
    }
  };
  res: Response & {
    session: {
      user?: any;
    }
  };
  user: User | null;
}

export default Context;