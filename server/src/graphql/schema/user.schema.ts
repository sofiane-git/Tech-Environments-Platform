import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User
{
  @Field(() => ID)
  _id: string;

  @Field(() => String, {nullable: false})
  @prop({required: true, unique: true})
  email: string;

  @Field(() => String, { nullable: true })
  @prop({required: false})
  avatar: string;

  @Field(() => String, { nullable: false })
  @prop({required: true})
  provider: string;

  @Field(() => String, { nullable: false })
  @prop({required: true})
  providerId: string;

  @Field(() => [String], { nullable: false })
  @prop({required: true})
  roles: string[];

  @Field(() => String)
  createdAt: string;

}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });


@ObjectType()
  export class SuccessInfo
{

  @Field(() => String, {nullable: false})
  @prop({required: true})
  message: string;

  @Field(() => Boolean, {nullable: false})
  @prop({required: true})
  success: boolean;

  }
// @InputType()
// export class CreateUserInput
// {
//   @Field(() => String, {nullable: false})
//   @prop({required: true})
//   email: string;

//   @Field(() => [String], {nullable: false})
//   @prop({required: true, default: "ADMIN"})
//   roles: string[];

// }


