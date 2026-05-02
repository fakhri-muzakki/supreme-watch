"use client";

import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const cards = [
  {
    title: "Rolex Editorial",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Luxury Watch Wrist",
    image:
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Fresh Colors For Spring",
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function SeasonalBannerSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((item) => (
          <div
            key={item.title}
            className="group relative min-h-180 overflow-hidden rounded-[2rem]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute inset-0 flex flex-col justify-between p-8">
              {/* TITLE */}
              <div className="flex flex-1 items-center justify-center">
                <h2 className="max-w-sm text-center font-serif text-5xl leading-tight text-white md:text-6xl">
                  {item.title}
                </h2>
              </div>

              {/* BUTTONS */}
              <div className="grid grid-cols-2 gap-3">
                {/* <Button
                  variant="outline"
                  className="rounded-full border-white bg-white/10 text-white backdrop-blur hover:bg-white hover:text-black"
                >
                  Shop Men
                </Button> */}
                <Link
                  href={"/products?category=mens-watches"}
                  // variant="outline"
                  className={buttonVariants({
                    variant: "outline",
                    className:
                      "rounded-full border-white bg-white/10 text-white backdrop-blur hover:bg-white hover:text-black",
                  })}
                  style={{
                    borderRadius: "20px",
                  }}
                >
                  Shop Men
                </Link>

                <Link
                  href={"/products?category=womens-watches"}
                  // variant="outline"
                  className={buttonVariants({
                    variant: "outline",
                    className:
                      "rounded-full border-white bg-white/10 text-white backdrop-blur hover:bg-white hover:text-black",
                  })}
                  style={{
                    borderRadius: "20px",
                  }}
                >
                  Shop Women
                </Link>

                {/* <Link
                  variant="outline"
                  className="rounded-full border-white bg-white/10 text-white backdrop-blur hover:bg-white hover:text-black"
                >
                  Shop Women
                </Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
