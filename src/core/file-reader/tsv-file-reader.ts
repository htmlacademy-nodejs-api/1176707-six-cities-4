import { readFileSync } from 'node:fs';
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
      .map(([title, description, postDate, city, mainImage, images, premium, favorite, rate, type, roomsNumber, guestNumber, price, conveniences, author, commentCount, cords]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city,
        mainImage,
        images: images.split(';')
          .map((image: string) => ({image})),
        premium,
        favorite,
        rate: Number.parseInt(rate, 5),
        type,
        roomsNumber: Number.parseInt(roomsNumber, 8),
        guestNumber,
        price: Number.parseInt(price, 10),
        conveniences: conveniences.split(';')
          .map((convenience: string) => ({convenience})),
        author,
        commentCount: Number.parseInt(commentCount, 10),
        cords: cords.split(';')
          .map((cord: string) => ({cord})),
      }));
  }
}
