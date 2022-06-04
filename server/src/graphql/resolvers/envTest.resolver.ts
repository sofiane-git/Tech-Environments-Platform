
import { Arg, Mutation, Query, Resolver } from "type-graphql";
// import { EnvTestEntity } from "../../graphql/entities";
import { CreateEnvInput, EnvTest, EnvTestModel, UpdateEnvDisponibilityInput, UpdateEnvNameInput } from "../schema/envTest.schema";
import { UserModel } from "../schema/user.schema";
// import EnvInputEntity from "../entities/inputs";


@Resolver(() => EnvTest)
class EnvTestResolver
{
  @Query(() => [EnvTest])
  async getAllEnv() {
    const allEnvTest = await EnvTestModel.find();
    return allEnvTest;
  }

  @Mutation(() => EnvTest)
  async createNewEnv(
    @Arg('input') input: CreateEnvInput,
  )
  {
    const emailInUserList = await UserModel.findOne({ email: input["email"] })
    
    if (emailInUserList) {
      const result = await EnvTestModel.create({ ...input, createdBy: emailInUserList });
      return result;
    }
    return;
  }

  @Mutation(() => EnvTest)
  async updateEnvDisponibilityById(
    @Arg('id') _id: string,
    @Arg('input') input: UpdateEnvDisponibilityInput,
  )
  { 
    const emailInUserList = await UserModel.findOne({ email: input["email"] })
    
    if (emailInUserList) {
      const editedEnv = await EnvTestModel.findByIdAndUpdate(
        _id,
        { ...input, updatedBy: emailInUserList },
        { new: true }
      );
      return editedEnv;
    }
    return;

  }

  @Mutation(() => EnvTest)
  async updateEnvNameById(
    @Arg('id') _id: string,
    @Arg('input') input: UpdateEnvNameInput,
  )
  { 
    const emailInUserList = await UserModel.findOne({ email: input["email"] })
    console.log('emailInUserList | ', emailInUserList);
    
    if (emailInUserList) {
      const editedEnv = await EnvTestModel.findByIdAndUpdate(
        _id,
        { ...input, updatedBy: emailInUserList },
        { new: true }
      );
      return editedEnv;
    }
    return;

  }

  @Mutation(() => Boolean)
  async deleteEnvById(@Arg('id') _id: string)
  {
    // if (deletedBy === '') {
    //   return null
    // }
    // const deletedEnv = await EnvTestModel.findByIdAndDelete(_id);
    await EnvTestModel.findByIdAndDelete(_id);
    // return {
    //   id: deletedEnv?.id,
    //   deletedBy: deletedBy,
    //   message: `L'environnement - ${deletedEnv?.name.toString()} -  est supprimé`,
    //   success: true,
    // };
    return true
  }
}

export default EnvTestResolver;

