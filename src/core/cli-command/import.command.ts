import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { createOffer, getErrorMessage, getMongoURI } from '../helpers/index.js';
import { ConvenienceServiceInterface } from '../../modules/convenience/convenience-service.interface.js';
import { OfferServiceInterface } from '../../modules/offer/offer-service.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import ConsoleLoggerService from '../logger/console.service.js';
import OfferService from '../../modules/offer/offer.service.js';
import MongoClientService from '../database-client/mongo-client.service.js';
import { OfferModel } from '../../modules/offer/offer.entity.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import { UserModel } from '../../modules/user/user.entity.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import UserService from '../../modules/user/user.service.js';
import { Rent } from '../../types/rent.type.js';
import { ConveniencesModel } from '../../modules/convenience/convenience.entity.js';
import ConvenienceService from '../../modules/convenience/convenience.service.js';

const DEFAULT_DB_PORT = '27017';
const DEFAULT_USER_PASSWORD = 'test';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private convenienceService!: ConvenienceServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.convenienceService = new ConvenienceService(this.logger, ConveniencesModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveOffer(offer: Rent) {
    const conveniences = [];
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    for (const {convenience} of offer.conveniences) {
      const existConveniences = await this.convenienceService.findByConveniencesNameOrCreate(convenience, {convenience});
      conveniences.push(existConveniences.id);
    }

    await this.offerService.create({
      ...offer,
      conveniences,
      user: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
