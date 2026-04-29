"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import Watch1Image from "@/assets/images/watch-1.png";
import Watch2Image from "@/assets/images/watch-2.png";
import Watch3Image from "@/assets/images/watch-3.png";
import Watch4Image from "@/assets/images/watch-4.png";

const cards = [
  { title: "New Arrivals", color: "bg-chart-1", image: Watch2Image },
  { title: "Men's Collection", color: "bg-chart-2", image: Watch1Image },
  { title: "Women's Collection", color: "bg-chart-3", image: Watch3Image },
  { title: "Best Sellers", color: "bg-chart-4", image: Watch4Image },
];

export default function CollectionCardsSection() {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`
    group relative min-h-105 overflow-hidden
    rounded-2xl ${card.color}
    transition-[border-radius]
    duration-500
    ease-out
    hover:rounded-[10rem]
  `}
        >
          <Image
            src={card.image}
            width={300}
            height={300}
            alt=""
            className="absolute bottom-10 left-1/2  w-auto -translate-x-1/2 object-contain min-w-80"
          />
          <div className="absolute inset-x-0 top-1/2 flex flex-col justify-center items-center">
            <button className="rounded-full border border-white/70 px-5 py-2 text-sm text-white font-bold w-fit group-hover:translate-y-28 group-hover:border-transparent transition duration-300">
              {card.title}
            </button>
            <Button
              variant={"ghost"}
              className="text-white border border-border opacity-0 group-hover:opacity-100 group-hover:translate-y-28"
            >
              GET NOW
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
}
