import { Field, InputType } from "type-graphql";

@InputType()
class EnvInputEntity
{
  @Field()
  name: string;

  @Field({nullable: true})
  isFree: boolean;

  @Field()
  updatedBy: string;

}

export default EnvInputEntity;
