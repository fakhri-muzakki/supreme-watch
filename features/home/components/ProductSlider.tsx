"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  {
    id: 5,
    title: "Rose Gold",
    desc: "Refined rose gold elegance.",
    price: "$389",
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=900",
  },
  {
    id: 6,
    title: "Carbon Black",
    desc: "Ultralight carbon fiber case.",
    price: "$419",
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=900",
  },
  {
    id: 7,
    title: "Classic White",
    desc: "Minimalist white dial design.",
    price: "$259",
    image:
      "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=900",
  },
  {
    id: 8,
    title: "Bronze Vintage",
    desc: "Heritage-inspired bronze finish.",
    price: "$339",
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=900",
  },
];

export default function ProductSlider() {
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
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />

                {/* Info */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-bold">{item.price}</span>
                    <Button size="sm" className="rounded-full px-4 text-xs">
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
