import dayjs from 'dayjs';
import { FIRST_WEEK_DAY, LAST_WEEK_DAY, FALSE, TRUE, MIN_RATE, MAX_RATE, MIN_ROOMS, MAX_ROOMS, MIN_GUEST, MAX_GUEST, MIN_CONVENIENCES, MAX_CONVENIENCES, MIN_PRICE, MAX_PRICE } from '../../core/helpers/const.js';
import { getRandomItems, getRandomItem, generateRandomValue } from '../../core/helpers/random.js';
import { MockData } from '../../types/mock-data.type.js';
import { OfferGeneratorInterface } from './rent-generaitor.interface.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.citys);
    const mainImage = getRandomItem<string>(this.mockData.mainImages);
    const images = getRandomItems<string>(this.mockData.images, 6);
    const premium = Boolean(generateRandomValue(FALSE, TRUE));
    const favorite = Boolean(generateRandomValue(FALSE, TRUE));
    const rate = generateRandomValue(MIN_RATE, MAX_RATE);
    const type = getRandomItem<string>(this.mockData.types);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guest = generateRandomValue(MIN_GUEST, MAX_GUEST);
    const conveniences = getRandomItems<string>(this.mockData.mainImages, generateRandomValue(MIN_CONVENIENCES, MAX_CONVENIENCES));
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const author = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);


    const [firstname, lastname] = author.split(' ');


    return [
      title, description, postDate,
      city, mainImage, images, premium,
      favorite, rate, type, rooms, guest, conveniences,
      price, firstname, lastname, email, avatar
    ].join('\t');
  }
}
