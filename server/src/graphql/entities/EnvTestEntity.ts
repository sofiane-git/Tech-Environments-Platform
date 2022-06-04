import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql"

@ObjectType()
class EnvTestEntity
{
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({required: true})
  name: string;

  @Field(() => Boolean)
  @prop({required: true, default: false})
  isFree: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => String)
  updatedBy: string;
}

export default EnvTestEntity;
