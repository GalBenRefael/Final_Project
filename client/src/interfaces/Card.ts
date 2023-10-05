export interface CardProps {
  _id: string;
  bizTitle: string;
  bizCategory: string;
  bizSubTitle: string;
  bizDescription: string;
  bizPhone: string;
  bizEmail: string;
  bizWeb: string;
  bizImage: string;
  bizImageAlt: string;
  bizState: string;
  bizCountry: string;
  bizCity: string;
  bizStreet: string;
  bizZip: string;
  bizHouseNo: string;
  bizNumber?: string;
  user_id?: string;
}

export interface CardWithLikes extends CardProps {
  likes: number;
}
