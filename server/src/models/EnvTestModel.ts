import { getModelForClass, prop } from "@typegoose/typegoose";

class EnvTestClass
{
  @prop({required: true, uppercase: true, unique: true})
  public name!: string;

  @prop({ default: true })
  public isFree?: boolean;

  @prop({ lowercase: true, required: true })
  public updatedBy!: string;
}

const EnvTestModel = getModelForClass(EnvTestClass);

export default EnvTestModel;

