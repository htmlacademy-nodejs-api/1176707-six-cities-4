import { Conveniences } from './rent-conveniences.js';
import { CordsType } from './rent-cords.type.js';
import { Images } from './rent-images.type.js';
import { UserType } from './rent-user.type.js';

export type Rent = {
    title: string;
    description: string;
    postDate: Date;
    city: string;
    mainImage: string;
    images: Images[];
    premium: boolean;
    favorite: boolean;
    rate: number;
    type: string;
    roomsNumber: number;
    guestNumber: number;
    price: number;
    conveniences: Conveniences[];
    commentCount: string;
    cords: CordsType;
    user: UserType;
}
