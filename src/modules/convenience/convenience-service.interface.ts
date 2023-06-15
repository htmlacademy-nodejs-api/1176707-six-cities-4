import {DocumentType} from '@typegoose/typegoose';
import CreateConveniencesDto from '../rent-generaitor/user/dto/create-convenience.dto.js';
import {ConveniencesEntity} from './convenience.entity.js';

export interface ConvenienceServiceInterface {
  create(dto: CreateConveniencesDto): Promise<DocumentType<ConveniencesEntity>>;
  findByConveniencesId(convenienceId: string): Promise<DocumentType<ConveniencesEntity> | null>;
  findByConveniencesName(convenienceName: string): Promise<DocumentType<ConveniencesEntity> | null>;
  findByConveniencesNameOrCreate(convenienceName: string, dto: CreateConveniencesDto): Promise<DocumentType<ConveniencesEntity>>;
}
