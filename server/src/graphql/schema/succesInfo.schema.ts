import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";


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