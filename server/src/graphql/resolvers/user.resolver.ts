import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../schema/user.schema";
import {SuccessInfo} from "../schema/succesInfo.schema"
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID } from "../../config";

const client = new OAuth2Client(GOOGLE_CLIENT_ID)

@Resolver(() => User)
export default class UserResolver
{
  @Query(() => [User])
  async getAllUsers()
  {
    return await UserModel.find();
  }


  @Mutation(() => SuccessInfo)
  async googleAuth(@Arg('tokenId') tokenId: string)
  {
    const clientId = GOOGLE_CLIENT_ID;
    const verifyToken = await client.verifyIdToken({ idToken: tokenId, audience: clientId })
    const payload = verifyToken.getPayload();

    if (payload?.email_verified) {
      // VERIF SI USER EXISTE DANS DB
      const user = await UserModel.findOne({
        email: payload?.email
      })
      if (!user) {
        // SI N'EXISTE PAS, CREATION DANS LA DB
        await UserModel.create({
          email: payload?.email,
          avatar: payload?.picture,
          provider: payload?.iss,
          providerId: payload?.sub,
          roles: ["USER"]
        })        
        return {
          message: 'Utilisateur enregistré',
          success: true
        }
      } else {
        return {
          message: 'Utilisateur déjà enregistré',
          success: true
        }
      }
    } else {
      return {
        message: 'Utilisateur non enregistré',
        success: false
      }

    }
  }

  @Mutation(() => SuccessInfo)
  async deleteUserById(@Arg('id') _id: string)
  {
    const userDeleted = await UserModel.findByIdAndDelete(_id);

    if (!userDeleted) {
      return {
        message: 'Utilisateur non supprimé',
        success: false
      }
    }
    return {
      message: 'Utilisateur supprimé',
      success: true
    }
  }
}



