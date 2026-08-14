import { getAllProducts } from "@/lib/api/product";
import { getMarketplaceStats } from "@/lib/api/stats";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
// import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PopularCategories from "@/components/home/PopularCategories";
import MarketplaceStats from "@/components/home/MarketplaceStats";
import SuccessStories from "@/components/home/SuccessStories";
import HeroBanner from "@/components/home/HeroBanner";

export default async function Home() {
  const [featuredRes, stats] = await Promise.all([
    getAllProducts({ sort: "", limit: 6 }),
    getMarketplaceStats(),
  ]);

  return (
    <div>
      {/* <HeroSection stats={stats} /> */}
      <HeroBanner></HeroBanner>
      <FeaturedProducts products={featuredRes?.products || []} />
      <PopularCategories categories={PRODUCT_CATEGORIES} />
      <MarketplaceStats stats={stats} />
      <SuccessStories />
    </div>
  );
}