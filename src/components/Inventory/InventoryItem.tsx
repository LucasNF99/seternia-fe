import Image from "next/image";
type IInventoryItemProps = {
  itemImage: string;
  alt: string;
}
export default function InventoryItem({
  itemImage,
  alt
}: IInventoryItemProps) {

  return (
    <div className="flex items-center gap-1 flex-col">
      <div className="border rounded-sm p-1 w-40 h-40 max-h-40 border-orange-400">
        <Image src={itemImage} alt={alt} width={160} height={160} />
      </div>
      <p className="text-ellipsis text-center max-w-28 whitespace-nowrap overflow-hidden">{alt}</p>
    </div>
  );
}
