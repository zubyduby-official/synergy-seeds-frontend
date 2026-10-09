import { useState } from 'react';
import type { Product } from '@/types';
import { HeroSection } from '@/components/home/HeroSection';
import { CropCategorySection } from '@/components/home/CropCategorySection';
import { FeaturedProductsSection, AboutPreviewSection } from '@/components/home/FeaturedProductsSection';
import { WhySynergySection, DealerCTASection } from '@/components/home/WhySynergySection';
import { CatalogueDownloadSection } from '@/components/home/CatalogueDownloadSection';
import { ContactSection } from '@/components/home/ContactSection';
import { ProductEnquiryModal } from '@/components/ProductEnquiryModal';

export function HomePage() {
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);

  return (
    <>
      <HeroSection />
      <CropCategorySection />
      <FeaturedProductsSection onEnquire={setEnquiryProduct} />
      <WhySynergySection />
      <AboutPreviewSection />
      <DealerCTASection />
      <CatalogueDownloadSection />
      <ContactSection />
      <ProductEnquiryModal
        product={enquiryProduct}
        isOpen={!!enquiryProduct}
        onClose={() => setEnquiryProduct(null)}
      />
    </>
  );
}
