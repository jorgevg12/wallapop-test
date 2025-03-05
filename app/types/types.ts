export interface Item {
  title: string;
  description: string;
  price: string;
  image: string;
}

export interface Data {
  items: Item[];
}

export interface ResponseData {
  items: Item[];
  pagesAvailable: number;
}

export interface MessageScreen {
  message?: string;
  img: string;
}
