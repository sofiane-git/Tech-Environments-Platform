import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateEnvInput, EnvTest, EnvTestModel, UpdateEnvDisponibilityInput, UpdateEnvNameInput } from "../schema/envTest.schema";
import { SuccessInfo } from "../schema/succesInfo.schema";
import { UserModel } from "../schema/user.schema";
// import Context from "../types/context";
// import { User } from "../types/user";

@Resolver(() => EnvTest)
class EnvTestResolver
{
  
  @Query(() => [EnvTest])
  async getAllEnv() {
    const allEnvTest = await EnvTestModel.find();
    return allEnvTest;
  }

  @Mutation(() => SuccessInfo)
  async createNewEnv(
    @Arg('input') input: CreateEnvInput,
  )
  {
    const userFindByEmail = await UserModel.findOne({ email: input["email"] })
    console.log('userFindByEmail | ', userFindByEmail);
    if (userFindByEmail) {
      const result = await EnvTestModel.create({ ...input, createdBy: userFindByEmail });
      console.log('result | ', result);
      return {
        message: 'Environnement enregistré',
        success: true

      };
    }
    return {
      message: 'Problème d\'ajout d\'environnement',
      success: false

    };
  }

  @Mutation(() => EnvTest)
  async updateEnvDisponibilityById(
    @Arg('id') _id: string,
    @Arg('input') input: UpdateEnvDisponibilityInput,
  )
  { 
    const userFindByEmail = await UserModel.findOne({ email: input["email"] })
    
    if (userFindByEmail) {
      const editedEnv = await EnvTestModel.findByIdAndUpdate(
        _id,
        { ...input, updatedBy: userFindByEmail },
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
    const userFindByEmail = await UserModel.findOne({ email: input["email"] })
    console.log('userFindByEmail | ', userFindByEmail);
    
    if (userFindByEmail) {
      const editedEnv = await EnvTestModel.findByIdAndUpdate(
        _id,
        { ...input, updatedBy: userFindByEmail },
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

