"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PromoGridSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* LEFT BIG CARD */}
        <div className="group relative min-h-175 overflow-hidden rounded-[2rem]">
          <Image
            src="https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1400&auto=format&fit=crop"
            alt="Supreme Watch Campaign"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] opacity-80">
              New Campaign
            </p>

            <h2 className="max-w-xl font-serif text-5xl leading-tight md:text-6xl">
              Bold By Time
            </h2>

            <p className="mt-4 max-w-md text-sm md:text-base text-white/90">
              Discover refined precision crafted for modern presence.
            </p>

            <Link href={"/products"}>
              <Button className="mt-8 rounded-full px-8">Shop Now</Button>
            </Link>
          </div>
        </div>

        {/* RIGHT GRID */}
        <div className="grid gap-4 grid-rows-2">
          {/* TOP WIDE */}
          <div className="group relative min-h-85 overflow-hidden rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop"
              alt="Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-center font-serif text-4xl text-white md:text-5xl">
                Supreme Watch × Legacy
              </h3>
            </div>
          </div>

          {/* BOTTOM 2 GRID */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* PRODUCT CARD */}
            <div className="group relative min-h-85 overflow-hidden rounded-[2rem] bg-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop"
                alt="Watch Product"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-5 right-5">
                <Button
                  size="icon"
                  className="rounded-full bg-white text-black hover:bg-white/90"
                >
                  +
                </Button>
              </div>
            </div>

            {/* COLOR CARD */}
            <div className="flex min-h-85 items-center justify-center rounded-[2rem] bg-zinc-700 p-8">
              <div className="w-full max-w-55 rounded-xl bg-white p-4 shadow-xl">
                <div className="h-40 rounded-md bg-slate-700" />

                <div className="mt-4 space-y-2">
                  <h4 className="text-xl font-semibold">Midnight Blue</h4>

                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Supreme Watch Edition
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
