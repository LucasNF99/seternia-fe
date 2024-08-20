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
      <div className=" border-2 rounded-sm border-amber-500">
        <div className="border-b  rounded-sm w-40 h-40 max-h-40 border-orange-400">
          <Image className="rounded-sm" src={itemImage} alt={alt} width={160} height={160} />
        </div>
        <ul className="text-left p-1 text-xs flex flex-col gap-0.5">
          <li>
            <p className="text-ellipsis text-left max-w-28 whitespace-nowrap overflow-hidden"><strong>Item:</strong> {alt}</p>
          </li>
          <li>
            <p className="text-ellipsis text-left max-w-28 whitespace-nowrap overflow-hidden"><strong>Type:</strong> Armor</p>
          </li>
          <li>
            <p className="text-ellipsis text-left max-w-28 whitespace-nowrap overflow-hidden"><strong>Amount:</strong> 2</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
