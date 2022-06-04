import { Field, InputType } from "type-graphql";

@InputType()
class StatusInputEntity
{
  @Field()
  value: boolean;

  @Field({nullable: true})
  updateValueDay: string;

  @Field({nullable: true})
  updateValueHour: string;

}

export default StatusInputEntity;
