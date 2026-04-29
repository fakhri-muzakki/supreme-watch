import { Button } from "@/components/ui/button";
import Image from "next/image";
import FeaturedSlider from "@/features/home/components/FeaturedSlider";
import PromoGridSection from "@/features/home/components/PromoGridSection";
import ProductSlider from "@/features/home/components/ProductSlider";
import SeasonalBannerSection from "@/features/home/components/SeasonalBannerSection";
import Footer from "@/features/home/components/Footer";
import Navbar from "@/features/home/components/Navbar";
import CollectionCardsSection from "@/features/home/components/CollectionCardsSection";

export default function SupremeWatchHomePage() {
  return (
    <main className="min-h-screen bg-background p-3 md:p-4">
      <div className="mx-auto max-w-7xl space-y-4 pt-20">
        <Navbar />

        <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-5">
            <div className="relative bg-[url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center p-6 lg:col-span-2 min-h-105">
              <div className="max-w-xs rounded-3xl bg-white/95 p-4 shadow">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800&auto=format&fit=crop"
                  }
                  width={271}
                  height={256}
                  alt=""
                  className="h-64 w-full rounded-2xl object-cover"
                />
                <h2 className="mt-4 text-3xl font-semibold">Midnight Steel</h2>
                <p className="mt-8 text-sm text-muted-foreground">
                  Swiss Inspired Precision
                </p>
              </div>
            </div>

            <div className="relative flex min-h-105 items-end bg-[url('https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1400&auto=format&fit=crop')] bg-cover bg-center p-8 lg:col-span-3">
              <div className="w-full text-white">
                <h1 className="mb-6 text-3xl font-semibold md:text-5xl">
                  The New Supreme Collection
                </h1>
                <div className="flex flex-wrap gap-3">
                  <Button className="rounded-full bg-white px-6 text-black hover:bg-white/90">
                    Shop Men
                  </Button>
                  <Button className="rounded-full bg-white px-6 text-black hover:bg-white/90">
                    Shop Women
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CollectionCardsSection />

        <FeaturedSlider />
        <PromoGridSection />
        <ProductSlider />
        <SeasonalBannerSection />
        <Footer />
      </div>
    </main>
  );
}
