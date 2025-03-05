import Image from "next/image";

interface FavoriteProps {
  isFavorite: boolean;
  handleFavoriteClick: () => void;
}

export default function Favorite({ isFavorite, handleFavoriteClick }: FavoriteProps) {
  return(
    <button
      className={`flex items-center justify-center rounded-full w-9 h-9 justify-self-end cursor-pointer select-none ${isFavorite ? 'bg-gray-50' : 'bg-gray-200'}`}
      onClick={handleFavoriteClick}
    >
      <Image
        src={isFavorite ? "/icons/heart-filled.svg" : "/icons/heart-outline.svg"}
        width={20}
        height={20}
        alt="heart"
        className="select-none"
      />
    </button>
  )
}