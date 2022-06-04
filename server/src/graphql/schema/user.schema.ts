import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class User
{
  @Field(() => ID)
  _id: string;

  @Field(() => String, {nullable: false})
  @prop({required: true, unique: true})
  email: string;

  @Field(() => String)
  createdAt: string;

}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });


// @ObjectType()
// export class UserActivities
// {
//   @Field(() => Int, { nullable: false })
//   @prop({required: true})
//   value: number;

//   @Field(() => Boolean, {nullable: false})
//   @prop({required: true})
//   takeEnv: boolean;

//   @Field(() => User, {nullable: false})
//   @prop({required: true, unique: true})
//   user: User

//   @Field(() => String)
//   createdAt: string;
// }

@InputType()
export class CreateUserInput
{
  @Field(() => String, {nullable: false})
  @prop({required: true})
  email: string;
}

