import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { CordsType } from '../../types/rent-cords.type.js';
import { UserEntity } from '../rent-generaitor/user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop()
  public city!: string;

  @prop()
  public mainImage!: string;

  @prop({
    type: () => String,
  })
  public images!: string[];


  @prop()
  public premium!: boolean;

  @prop()
  public favorite!: boolean;

  @prop()
  public rate!: number;

  @prop()
  public type!: string;

  @prop()
  public roomsNumber!: number;

  @prop()
  public guestNumber!: number;

  @prop()
  public price!: number;

  @prop({
    type: () => String,
  })
  public conveniences!: string[];

  @prop({default: 0})
  public commentCount!: number;

  @prop({
    type: () => String,
  })
  public cords!: CordsType;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);

