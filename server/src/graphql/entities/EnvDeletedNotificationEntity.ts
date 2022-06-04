import { Field, ID, ObjectType } from "type-graphql"

@ObjectType()
class EnvDeletedNotificationEntity
{
  @Field(() => ID)
  id: string;

  @Field()
  deletedBy: string;

  @Field()
  message: boolean;

  @Field()
  success: string;
}

export default EnvDeletedNotificationEntity;
