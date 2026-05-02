"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string;
}

// const products = [
//   {
//     id: 1,
//     name: "Midnight Steel",
//     description: "Bold stainless chronograph.",
//     price: "$299",
//     image_url:
//       "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=900",
//   },
//   {
//     id: 2,
//     name: "Royal Black",
//     description: "Luxury matte black edition.",
//     price: "$349",
//     image_url:
//       "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=900",
//   },
//   {
//     id: 3,
//     name: "Silver Elite",
//     description: "Elegant timeless silver tone.",
//     price: "$279",
//     image_url:
//       "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=900",
//   },
//   {
//     id: 4,
//     name: "Ocean Blue",
//     description: "Modern marine inspired watch.",
//     price: "$319",
//     image_url:
//       "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=900",
//   },
// ];

export default function FeaturedSlider({ products }: { products: Product[] }) {
  // const [products, setProducts] = useState<Product[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selected, setSelected] = useState(0);

  // useEffect(() => {
  //   const getData = async (): Promise<void> => {
  //     const supabase = createClient();
  //     const { data } = await supabase
  //       .from("products_with_sales")
  //       .select("*")
  //       .limit(4)
  //       .order("total_sold", { ascending: false });

  //     setProducts(data ?? []);
  //   };

  //   getData();
  // }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi]);

  const activeProduct = products.length ? products[selected] : null;

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
          {products.slice(0, 4).map((item, index) => {
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
                  <Image
                    width={403}
                    height={288}
                    src={item.image_url}
                    alt={item.name}
                    className="h-72 w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info aktif — terpisah di bawah slider */}
      {activeProduct && (
        <div className="mt-10 text-center transition-all duration-300">
          <h3 className="text-4xl  font-serif">{activeProduct.name}</h3>
          <p className="mt-2 text-muted-foreground">
            {activeProduct.description} - Rp. {activeProduct.price}
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Button
              className="rounded-full px-6 border border-foreground/40 "
              variant={"outline"}
            >
              GET NOW
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
