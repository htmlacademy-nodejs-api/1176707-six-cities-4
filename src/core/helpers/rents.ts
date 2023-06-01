import { Rent } from '../../types/rent.type';


export function createOffer(offerData: string): Rent {
  const [
    title,
    description,
    postDate,
    city,
    mainImage,
    images,
    premium,
    favorite,
    rate,
    type,
    roomsNumber,
    guestNumber,
    price,
    conveniences,
    commentCount,
    latitude,
    longitude,
    email,
    firstname,
    lastname,
    avatar
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    email,
    firstname,
    lastname,
    avatar
  };

  return {
    title,
    description,
    postDate: new Date(postDate),
    city,
    mainImage,
    images: images.split(';'),
    premium: premium.toLowerCase() === 'true',
    favorite: favorite.toLowerCase() === 'true',
    rate: Number.parseInt(rate, 10),
    type,
    roomsNumber: Number.parseInt(roomsNumber, 10),
    guestNumber: Number.parseInt(guestNumber, 10),
    price: Number.parseInt(price, 10),
    conveniences: conveniences.split(';'),
    commentCount,
    cords: {latitude, longitude},
    user,
  } as Rent;
}

