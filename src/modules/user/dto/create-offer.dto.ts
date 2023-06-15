import { Conveniences } from '../../../../types/rent-conveniences.js';
import { CordsType } from '../../../../types/rent-cords.type.js';
import { UserType } from '../../../../types/rent-user.type.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: string;
  public mainImage!: string;
  public images!: string[];
  public premium!: boolean;
  public favorite!: boolean;
  public rate!: number;
  public type!: string;
  public roomsNumber!: number;
  public guestNumber!: number;
  public price!: number;
  public conveniences!: Conveniences[];
  public commentCount!: string;
  public cords!: CordsType;
  public user!: UserType;
}

