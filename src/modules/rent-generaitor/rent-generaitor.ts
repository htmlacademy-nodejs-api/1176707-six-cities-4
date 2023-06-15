import dayjs from 'dayjs';
import { getRandomItems, getRandomItem, generateRandomValue } from '../../core/helpers/random.js';
import { MockData } from '../../types/mock-data.type.js';
import { OfferGeneratorInterface } from './rent-generaitor.interface.js';

const MIN_PRICE = 500;
const MAX_PRICE = 20000;
const ROOM_IMAGES = 6;

const MIN_RATE = 0;
const MAX_RATE = 5;
const MIN_CONVENIENCES = 1;
const MAX_CONVENIENCES = 7;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUEST = 1;
const MAX_GUEST = 10;
const MIN_COMMENT = 0;
const MAX_COMMENT = 1000;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.citys);
    const mainImage = getRandomItem<string>(this.mockData.mainImages);
    const images = getRandomItems<string>(this.mockData.images, ROOM_IMAGES);
    const premium = Boolean(generateRandomValue(0, 1));
    const favorite = Boolean(generateRandomValue(0, 1));
    const rate = generateRandomValue(MIN_RATE, MAX_RATE);
    const type = getRandomItem<string>(this.mockData.types);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guest = generateRandomValue(MIN_GUEST, MAX_GUEST);
    const conveniences = getRandomItems(this.mockData.conveniences, generateRandomValue(MIN_CONVENIENCES, MAX_CONVENIENCES));
    const commentCount = generateRandomValue(MIN_COMMENT, MAX_COMMENT);
    const cords = getRandomItem<string>(this.mockData.cords);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const author = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);


    const [firstname, lastname] = author.split(' ');
    const [latitude, longitude] = cords.split(' ');


    return [
      title, description, postDate,
      city, mainImage, images, premium,
      favorite, rate, type, rooms, guest,
      price, conveniences, commentCount, latitude, longitude,
      email, firstname, lastname, avatar,
    ].join('\t');
  }
}
