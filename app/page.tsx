import CategoryGrid from "@/components/categories/category-grid";
import ProductHomeGrid from "@/components/product/product-home-grid";
import { Social } from "@/components/sections/social";

export default function Home() {
  return (
    <div className="flex py-0 flex-col">
      <div className="fixed z-50 right-2 bottom-2">
        <Social />
      </div>

      <div>
        {/* <Hero /> */}
        {/* <CategoriesHomeList/> */}
        <CategoryGrid />
        {/* <ProductHomeList/> */}
        <ProductHomeGrid />
        {/* <Connect /> */}
        {/* <Faq /> */}
        {/* <FeaturesSection />
          <Faq />
          <Connect /> */}
      </div>
    </div>
  );
}
