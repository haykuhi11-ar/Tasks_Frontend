export interface Product {
    id: number;
    title: string;
    author: string;
    price: number;
    photo: string;
    rating: number;
    reviews: number;
    comments: Comment[];
}

export interface Comment {
    id: number;
    username: string;
    comment: string;
    rating: number;
}