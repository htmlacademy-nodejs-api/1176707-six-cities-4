import { Conveniences } from './rent-conveniences.js';
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
    rate: string;
    type: string;
    roomsNumber: string;
    guestNumber: string;
    price: number;
    conveniences: Conveniences[];
    author: string;
    commentCount: string;
    cords: string;
}
