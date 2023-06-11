import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { ConvenienceServiceInterface } from './convenience-service.interface.js';
import { ConveniencesEntity, ConveniencesModel } from './convenience.entity.js';
import ConvenienceService from './convenience.service.js';

export function createConveniencesContainer() {
  const convenienceContainer = new Container();

  convenienceContainer.bind<ConvenienceServiceInterface>(AppComponent.ConvenienceServiceInterface).to(ConvenienceService);
  convenienceContainer.bind<types.ModelType<ConveniencesEntity>>(AppComponent.ConveniencesModel).toConstantValue(ConveniencesModel);

  return convenienceContainer;
}
