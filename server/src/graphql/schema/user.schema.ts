import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User
{
  @Field(() => ID)
  _id: string;

  @IsEmail()
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


