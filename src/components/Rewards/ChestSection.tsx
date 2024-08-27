'use client';
import ChestCard from "./ChestCard";


export default function ChestSection() {
  const chests = [
    {
      title: 'Wooden Chest',
      image: '',
      blur: false,
      transaction: () => console.log('hello world!')
    },
    {
      title: 'Silver Chest',
      image: '',
      blur: true,
      transaction: () => console.log('hello world!')
    },
    {
      title: 'Gold Chest',
      image: '',
      blur: true,
      transaction: () => console.log('hello world!')
    },
  ]
  return (
    <section className="container mx-auto w-full grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10 gap-10">
      {chests.map((item) => (
        <ChestCard bluer={item.blur} key={item.title} image={item.image} title={item.title} transaction={item.transaction} />
      ))}
    </section>
  );
}
