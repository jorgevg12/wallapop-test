import Image from "next/image";
import { Item } from "../types/types";
import PriceTag from "./price-tag";

interface CardItemProps {
  item: Item
}

export default function CardItem({ item }: CardItemProps) {
  return (
    <div className="flex flex-col-reverse  md:flex-row gap-3 bg-[#252525] items-center md:items-start space-x-2 p-4 rounded-lg w-full md:h-44 mb-4">
      <div className="relative h-36 md:h-full min-w-36">
        <Image
          src={`/img/${item.image}`}
          fill={true}
          alt={item.title}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-xl">{item.title}</h3>
          <PriceTag price={item.price} />
        </div>
        <p className="text-sm">{item.description}</p>
      </div>
    </div>
  )
}