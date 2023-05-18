import { Conveniences } from './rent-conveniences.js';
import { Cords } from './rent-cords.js';
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
    guestNumber: string;
    price: number;
    conveniences: Conveniences[];
    author: string;
    commentCount: number;
    cords: Cords[];
}
