import { Hero } from "../components/Hero";
import { ProductCarousel } from "../components/ProductCarousel";
import { CategoriesSection } from "../components/CategoriesSection";
import { FaqSection } from "../components/FaqSection";
import { productSections } from "../typos/products";

export default function Home() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <CategoriesSection />
      <Hero />
      <div id="productos" className="space-y-6">
        <ProductCarousel sections={productSections} />
      </div>
      <FaqSection />
    </div>
  );
}
