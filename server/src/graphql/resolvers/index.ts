import EnvTestResolver from "./envTest.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [EnvTestResolver, UserResolver] as const;