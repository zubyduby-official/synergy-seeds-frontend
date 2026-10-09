import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  MessageCircle,
  Phone,
  Lock,
  Info,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductImage } from '@/components/ProductImage';
import { PriceDisplay } from '@/components/PriceDisplay';
import { PackSizeSelector } from '@/components/PackSizeSelector';
import { QuantitySelector } from '@/components/QuantitySelector';
import { ProductCard } from '@/components/ProductCard';
import { ProductEnquiryModal } from '@/components/ProductEnquiryModal';
import {
  getProductBySlug,
  getRelatedProducts,
  getAllPackSizes,
} from '@/data/products';
import { categoryName } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import { buildWhatsAppEnquiryLink } from '@/services/api';
import type { Product } from '@/types';

interface ProductDetailPageProps {
  onEnquire: (product: Product) => void;
  enquiryProduct: Product | null;
  isEnquiryOpen: boolean;
  onEnquiryClose: () => void;
  onAddToCartToast: (productName: string) => void;
}

export function ProductDetailPage({
  onEnquire,
  enquiryProduct,
  isEnquiryOpen,
  onEnquiryClose,
  onAddToCartToast,
}: ProductDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addToCart } = useCart();

  const packSizes = product ? getAllPackSizes(product) : [];
  const [selectedPack, setSelectedPack] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const related = getRelatedProducts(product);
  const activePack = packSizes.find((p) => p.label === selectedPack) ?? packSizes[0];

  const handleAddToCart = () => {
    if (!product.purchasable || !activePack) {
      onEnquire(product);
      return;
    }
    addToCart(product, activePack, quantity);
    onAddToCartToast(product.name);
  };

  const specs = [
    { label: 'Plant Habit & Vigour', value: product.specifications.plantHabit },
    { label: 'Fruit Characteristics', value: product.specifications.fruitCharacteristics },
    { label: 'Fruit Colour / Appearance', value: product.specifications.fruitColour },
    { label: 'Pungency / Taste', value: product.specifications.pungency },
    { label: 'Maturity (First Picking)', value: product.specifications.maturityDays },
    { label: 'Key Features / Tolerance', value: product.specifications.keyFeatures },
  ];

  return (
    <div className="py-8 lg:py-12">
      <div className="container-page">
        <Breadcrumbs
          items={[
            { label: 'Products', path: '/products' },
            { label: categoryName(product.category), path: `/products?category=${product.category}` },
            { label: product.name },
          ]}
        />

        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-forest-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        {/* Product main */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card overflow-hidden">
              <ProductImage
                imageRef={product.imageRef}
                alt={product.imageAlt}
                category={product.category}
                size="detail"
              />
            </div>
            {!product.purchasable && (
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Pricing for this variety is pending confirmation. Please use the
                  enquiry options below to get in touch with our team.
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="badge bg-forest-50 text-forest-700 mb-3">
              {categoryName(product.category)}
            </span>
            <h1 className="font-display text-fluid-2xl font-extrabold text-forest-800 leading-tight">
              {product.name}
            </h1>
            <p className="mt-3 text-muted leading-relaxed">{product.description}</p>

            <div className="mt-5">
              <PriceDisplay price={product.price} purchasable={product.purchasable} size="lg" />
            </div>

            {/* Pack size + quantity */}
            {packSizes.length > 0 && (
              <div className="mt-6 space-y-4 border-t border-forest-100 pt-6">
                <PackSizeSelector
                  sizes={packSizes}
                  selected={activePack?.label ?? ''}
                  onSelect={setSelectedPack}
                  disabled={!product.purchasable}
                />

                <div className="flex items-center gap-4">
                  <span className="label-field mb-0">Quantity</span>
                  <QuantitySelector
                    quantity={quantity}
                    onChange={setQuantity}
                    disabled={!product.purchasable}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              {product.purchasable ? (
                <button onClick={handleAddToCart} className="btn-primary flex-1">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
              ) : (
                <button onClick={() => onEnquire(product)} className="btn-primary flex-1">
                  <MessageCircle className="h-5 w-5" />
                  Enquire About Price
                </button>
              )}

              <button
                onClick={() => onEnquire(product)}
                className="btn-outline flex-1"
              >
                <MessageCircle className="h-5 w-5" />
                Enquire Now
              </button>

              <a
                href={buildWhatsAppEnquiryLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label={`Enquire about ${product.name} on WhatsApp`}
              >
                <Phone className="h-5 w-5" />
                WhatsApp
              </a>
            </div>

            {!product.purchasable && (
              <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                <Lock className="h-3.5 w-3.5" />
                Online purchasing will be available once pricing is confirmed.
              </div>
            )}

            {/* Specifications */}
            <div className="mt-8 border-t border-forest-100 pt-6">
              <h2 className="font-display text-lg font-bold text-forest-800 mb-4">
                Technical Specifications
              </h2>
              <div className="overflow-hidden rounded-xl border border-forest-100">
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map((spec, index) => (
                      <tr
                        key={spec.label}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-botanical/40'}
                      >
                        <th
                          scope="row"
                          className="w-2/5 px-4 py-3 text-left font-medium text-forest-700 align-top"
                        >
                          {spec.label}
                        </th>
                        <td className="px-4 py-3 text-charcoal leading-relaxed">
                          {spec.value || (
                            <span className="text-muted italic">To be confirmed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pack info */}
            <div className="mt-6 rounded-lg bg-botanical p-4">
              <h3 className="font-display text-sm font-bold text-forest-700 mb-2">
                Available Pack Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {packSizes.map((pack) => (
                  <span
                    key={pack.label}
                    className="badge bg-white text-forest-700 border border-forest-100"
                  >
                    {pack.label}
                    {pack.provisional && (
                      <span className="text-accent-600 ml-1">• provisional</span>
                    )}
                  </span>
                ))}
              </div>
              {packSizes.some((p) => p.provisional) && (
                <p className="mt-2 text-xs text-muted">
                  Pack sizes are provisional and subject to final confirmation by the company.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-fluid-xl font-bold text-forest-800 mb-6">
              Related {categoryName(product.category)} Varieties
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((rel) => (
                <ProductCard key={rel.id} product={rel} onEnquire={onEnquire} />
              ))}
            </div>
          </section>
        )}

        <ProductEnquiryModal
          product={enquiryProduct}
          isOpen={isEnquiryOpen}
          onClose={onEnquiryClose}
        />
      </div>
    </div>
  );
}
