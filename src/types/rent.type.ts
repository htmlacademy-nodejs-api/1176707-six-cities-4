import { Images } from './rent-images.type.js'

export type Rent = {
    name: string;
    description: string;
    postDate: Date;
    city: string;
    mainImage: string;
    images: Images;
    premium: boolean;
    favorite: boolean;
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