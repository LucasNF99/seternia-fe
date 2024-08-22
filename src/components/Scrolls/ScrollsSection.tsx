import MintScroll from "./MintScroll";

export default function ScrollsSection() {

  return (
    <section className="container mx-auto w-full flex-col items-start my-10 lg:px-10">
      <h1 className="text-4xl mb-6 underline text-center decoration-secondary">Here you can see yours scrolls</h1>
      <MintScroll />
    </section>
  );
}
