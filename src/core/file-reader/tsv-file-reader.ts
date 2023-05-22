import { readFileSync } from 'node:fs';
import { FavoriteType } from '../../types/rent-favotire.type.js';
import { PremiumType } from '../../types/rent-premium.type.js';
import { Rent } from '../../types/rent.type.js';
import { FileReaderInterface } from './file-reader.interface.js';


export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Rent[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, city, mainImage, images, premium, favorite, rate, type, roomsNumber, guestNumber, price, conveniences, commentCount, latitude, longitude, email, name, password, avatar]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city,
        mainImage,
        images: images.split(';')
          .map((image) => ({image})),
        premium: PremiumType[premium as 'true' | 'false'],
        favorite: FavoriteType[favorite as 'true' | 'false'],
        rate: Number.parseInt(rate, 10),
        type,
        roomsNumber: Number.parseInt(roomsNumber, 10),
        guestNumber: Number.parseInt(guestNumber, 10),
        price: Number.parseInt(price, 10),
        conveniences: conveniences.split(';')
          .map((convenience) => ({convenience})),
        commentCount,
        cords: {latitude, longitude},
        user: {email, name, password, avatar},
      }));
  }
}


