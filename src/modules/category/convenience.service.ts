import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { ConvenienceServiceInterface } from './convenience-service.interface.js';
import { ConveniencesEntity } from './convenience.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import CreateConvenienceDto from '../rent-generaitor/user/dto/create-convenience.dto.js';

@injectable()
export default class ConvenienceService implements ConvenienceServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConveniencesModel) private readonly сonvenienceModel: ModelType<ConveniencesEntity>
  ) {}

  public async create(dto: CreateConvenienceDto): Promise<DocumentType<ConveniencesEntity>> {
    const result = await this.сonvenienceModel.create(dto);
    this.logger.info(`New сonvenience created: ${dto.convenience}`);
    return result;
  }

  public async findByConveniencesId(сonvenienceId: string): Promise<DocumentType<ConveniencesEntity> | null> {
    return this.сonvenienceModel.findById(сonvenienceId).exec();
  }

  public async findByConveniencesName(сonvenienceName: string): Promise<DocumentType<ConveniencesEntity> | null> {
    return this.сonvenienceModel.findOne({сonvenience: сonvenienceName}).exec();
  }

  public async findByConveniencesNameOrCreate(сonvenienceName: string, dto: CreateConvenienceDto): Promise<DocumentType<ConveniencesEntity>> {
    const existedСonvenience = await this.findByConveniencesName(сonvenienceName);

    if (existedСonvenience) {
      return existedСonvenience;
    }

    return this.create(dto);
  }
}

