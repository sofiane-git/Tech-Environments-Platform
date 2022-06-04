import { getModelForClass, prop } from "@typegoose/typegoose"

class UserClass
{
  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

}

const UserModel = getModelForClass(UserClass) 

export default UserModel;
