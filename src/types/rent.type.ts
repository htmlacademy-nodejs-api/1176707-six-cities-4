import { Images } from './rent-images.type';

export type Rent = {
    title: string;
    description: string;
    postDate: Date;
    city: string;
    mainImage: string;
    images: Images[];
    premium: string;
    favorite: string;
    rate: number;
    type: string;
    roomsNumber: number;
    guestNumber: number;
    price: number;
    conveniences: string;
    author: string;
    commentCount: number;
    cords: number;
}
