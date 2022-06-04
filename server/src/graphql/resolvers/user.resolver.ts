import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput, User, UserModel } from "../schema/user.schema";


@Resolver(() => User)
export default class UserResolver
{
  @Query(() => [User])
  async getAllUsers()
  {
    return await UserModel.find();
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput)
  {
    const result = await UserModel.create(input);
    return result;
  }
}