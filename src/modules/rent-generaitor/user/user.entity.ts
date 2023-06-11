import { UserType } from '../../../types/rent-user.type';
import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { createSHA256 } from '../../../core/helpers/index.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}


@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements UserType {
    @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, default: '' })
    public firstname: string;

    @prop({ required: true, default: '' })
  public lastname: string;

  @prop({ required: false, default: '' })
    public avatar: string;


  @prop({required: true, default: ''})
  private password?: string;

  constructor(userData: UserType) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.firstname = userData.firstname;
    this.lastname = userData.lastname;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
