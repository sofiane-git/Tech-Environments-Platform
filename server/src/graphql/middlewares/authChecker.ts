import { AuthChecker } from "type-graphql";
// import { Context } from "../interfaces/context";

// export const authChecker: AuthChecker<Context> = (
export const authChecker: AuthChecker = (

  { context }: any,
  roles: any,
): any => {
  console.log('user | ', context.req);
  console.log('roles | ', roles);

};

// export const authChecker: AuthChecker<Context> = (
//   { context: { user } },
//   roles,
// ) => {
//   // here we can read the user from context
//   // and check his permission in the db against the `roles` argument
//   // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
//   console.log('user | ', user);
//   console.log('roles | ', roles);
//   return true; // or false if access is denied
// };