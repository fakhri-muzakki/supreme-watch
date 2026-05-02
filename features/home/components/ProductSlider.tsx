"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/features/cart/store/useCart";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function ProductSlider({ products }: { products: Product[] }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-16">
      {/* Header + Navigation Buttons */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Our Collection
          </p>
          <h2 className="mt-1 text-3xl font-semibold">All Timepieces</h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Slider */}
      {/* overflow-hidden di sini sengaja tidak dipakai agar item ke-4 terlihat setengah */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((item) => (
            <div
              key={item.id}
              className="min-w-0 shrink-0 basis-[85%] sm:basis-[45%] md:basis-[35%] lg:basis-[27%] pr-4"
            >
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                {/* Image */}

                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={293}
                  height={224}
                  className="h-56 w-full object-cover"
                />

                {/* Info */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-base">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-bold">RP. {item.price}</span>
                    <Button
                      size="sm"
                      className="rounded-full px-4 text-xs"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
