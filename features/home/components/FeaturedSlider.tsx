"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    title: "Midnight Steel",
    desc: "Bold stainless chronograph.",
    price: "$299",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=900",
  },
  {
    id: 2,
    title: "Royal Black",
    desc: "Luxury matte black edition.",
    price: "$349",
    image:
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=900",
  },
  {
    id: 3,
    title: "Silver Elite",
    desc: "Elegant timeless silver tone.",
    price: "$279",
    image:
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=900",
  },
  {
    id: 4,
    title: "Ocean Blue",
    desc: "Modern marine inspired watch.",
    price: "$319",
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=900",
  },
];

export default function FeaturedSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi]);

  const activeProduct = products[selected];

  return (
    <section className="py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Featured Collection
        </p>
        <h2 className="mt-2 text-4xl font-semibold">Crafted For Presence</h2>
      </div>

      {/* Slider — hanya image, tanpa card wrapper */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((item, index) => {
            const active = index === selected;

            return (
              <div
                key={item.id}
                className="min-w-0 shrink-0 basis-full sm:basis-1/2 md:basis-1/3 px-3"
              >
                <div
                  className={`transition-all duration-500 ${
                    active ? "scale-100 opacity-100" : "scale-90 opacity-40"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-72 w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info aktif — terpisah di bawah slider */}
      <div className="mt-10 text-center transition-all duration-300">
        <h3 className="text-4xl  font-serif">{activeProduct.title}</h3>
        <p className="mt-2 text-muted-foreground">
          {activeProduct.desc} - {activeProduct.price}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          {/* <span className="text-xl font-bold"></span> */}
          <Button
            className="rounded-full px-6 border border-foreground/40 "
            variant={"outline"}
          >
            GET NOW
          </Button>
        </div>
      </div>
    </section>
  );
}
