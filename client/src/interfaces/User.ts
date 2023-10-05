export interface User {
    token?: string;
    _id: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    imageUrl?: string;
    imageAlt?: string;
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNumber?: string;
    zip?: string;
    isBiz?: boolean;
    isAdmin?: boolean;
    cards: string[];
    favorites: string[];
}
