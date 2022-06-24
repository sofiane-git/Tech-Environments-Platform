import { AuthChecker } from "type-graphql";
import Context from "../types/context";

const authChecker: AuthChecker<Context> = ({ context }, roles) =>
{
// console.log('context | ', context.req.session.user);  
//   console.log('roles | ', roles);
  // console.log('context: {user} | ', user);
  // return !!context.user;
  // if (roles.length === 0) {
  //   // if `@Authorized()`, check only if user exists
  //   return user !== undefined;
  // }
  // // there are some roles defined now

  // if (!user) {
  //   // and if no user, restrict access
  //   return false;
  // }
  // if (user.roles.some(role => roles.includes(role))) {
  //   // grant access if the roles overlap
  //   return true;
  // }

  // no roles matched, restrict access
  return false;
};

export default authChecker;

// export const authChecker: AuthChecker = (

//   { context }: any,
//   roles: any,
// ): any => {
//   console.log('user | ', context.user);
//   console.log('roles | ', roles);

// };
