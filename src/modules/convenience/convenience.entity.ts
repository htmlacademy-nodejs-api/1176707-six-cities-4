import { defaultClasses } from '@typegoose/typegoose';
import typegoose, {getModelForClass} from '@typegoose/typegoose';
import { Conveniences } from '../../types/rent-conveniences.js';


const {prop, modelOptions} = typegoose;

export interface ConveniencesEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'convenience'
  }
})
export class ConveniencesEntity extends defaultClasses.TimeStamps implements Conveniences {
  @prop({required: true, trim: true})
  public convenience!: string;
}

export const ConveniencesModel = getModelForClass(ConveniencesEntity);

