import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateEnvInput, EnvTest, EnvTestModel, UpdateEnvDisponibilityInput, UpdateEnvNameInput } from "../schema/envTest.schema";
import { SuccessInfo } from "../schema/succesInfo.schema";
import { UserModel } from "../schema/user.schema";
// import { sendBusyMessage, sendFreeMessage } from "../../webhooks/slack";
// import Context from "../types/context";
// import { User } from "../types/user";
import { slackBodyBusy, slackBodyFree, webhookUrl } from "../../webhooks/slack";

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
    if (userFindByEmail) {
      await EnvTestModel.create({ ...input, createdBy: userFindByEmail });
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
      // console.log(editedEnv);
      
      // ENVOI MESSAGE SUR SLACK
      if (editedEnv?.isFree) {
        try {
            await webhookUrl.send(slackBodyFree(editedEnv?.name, editedEnv?.updatedBy?.email, 'https://example.com', editedEnv?.avatar))
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          

          // await webhookUrl.send({
          //   text: `Environnement occupé => *${ editedEnv?.updatedBy?.email }* utilise *${ editedEnv?.name }*`,
        
          // });
          await webhookUrl.send(slackBodyBusy(editedEnv?.name, editedEnv?.updatedBy?.email, 'https://example.com', editedEnv?.avatar));

        } catch (error) {
          console.log(error);
         }

      }
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

