export interface Item {
  title: string;
  description: string;
  price: string;
  email: string;
  image: string;
}

export interface Data {
  items: Item[];
}

export interface ResponseData{
  items: Item[];
  pagesAvailable: number;
}