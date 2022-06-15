import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsEmail } from "class-validator";
// import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID, InputType, ObjectType } from "type-graphql"
import { User } from "./user.schema";




@ObjectType()
export class EnvTest
{
  @Field(() => ID)
  _id: string;

  @Field(() => String, {nullable: false})
  @prop({required: true, uppercase: true, unique: true})
  name: string;

  @Field(() => String, {nullable: false})
  @prop({required: true})
  avatar: string;

  @Field(() => Boolean, {nullable: false})
  @prop({required: true})
  isFree: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => User, { nullable: true })
  @prop({required: false})
  updatedBy?: User;

  @Field(() => User, { nullable: false })
  @prop({required: true})
  createdBy: User;

}

  
export const EnvTestModel = getModelForClass(EnvTest, { schemaOptions: { timestamps: true } });

@InputType()
// export class CreateEnvInput implements Partial<User>
export class CreateEnvInput

{
  @Field(() => String)
  @prop({required: true, unique: true})
  name: string;

  @Field(() => String, {nullable: false})
  @prop({required: true})
  avatar: string;

  @Field(() => Boolean, {nullable: true})
  isFree?: boolean = true;

  @IsEmail()
  @Field(() => String, {nullable: false})
  @prop({required: true, trim: true})
  email: User['email'];

}

@InputType()
export class UpdateEnvDisponibilityInput implements Partial<User>
{
  @Field(() => Boolean, {nullable: false})
  @prop({required: true})
  isFree: boolean;

  @Field(() => String, {nullable: false})
  @prop({required: true})
  email: string;
}
@InputType()
export class UpdateEnvNameInput implements Partial<User>
{
  @Field(() => String, {nullable: false})
  @prop({required: true})
  name: string;

  @Field(() => String, {nullable: false})
  @prop({required: true})
  email: string;
}

UpdateEnvNameInput

// @InputType()
// export class DeletedAuthorInput
// {
//   @Field(() => String)
//   name: string;

// }

// @ObjectType()
// export class DeletedResponse
// {
//   @Field(() => ID)
//   id: string;

//   @Field(() => String, {nullable: false})
//   @prop({required: true})
//   deletedBy: EnvTest["name"];

//   @Field(() => String, {nullable: false})
//   @prop({required: true})
//   message: any;

//   @Field(() => Boolean, {nullable: false})
//   @prop({required: true})
//   success: boolean;

// }

