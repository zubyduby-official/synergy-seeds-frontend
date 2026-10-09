import { Link } from 'react-router-dom';
import { Eye, MessageCircle, ShoppingCart, Lock } from 'lucide-react';
import type { Product } from '@/types';
import { ProductImage } from '@/components/ProductImage';
import { PriceDisplay } from '@/components/PriceDisplay';
import { categoryName } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import { getAllPackSizes } from '@/data/products';
import { buildWhatsAppEnquiryLink } from '@/services/api';

interface ProductCardProps {
  product: Product;
  onEnquire: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onEnquire, onAddToCart }: ProductCardProps) {
  const { addToCart } = useCart();
  const packSizes = getAllPackSizes(product);
  const firstPack = packSizes[0];

  return (
    <article className="card group flex flex-col overflow-hidden transition-all duration-200 hover:shadow-card hover:-translate-y-0.5">
      <Link to={`/products/${product.slug}`} className="block relative overflow-hidden">
        <ProductImage
          imageRef={product.imageRef}
          alt={product.imageAlt}
          category={product.category}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 badge bg-white/90 text-forest-700 backdrop-blur-sm">
          {categoryName(product.category)}
        </span>
        {!product.purchasable && (
          <span className="absolute right-3 top-3 badge bg-accent-50/90 text-accent-700 backdrop-blur-sm">
            Enquiry only
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-bold text-forest-800 leading-snug">
          <Link to={`/products/${product.slug}`} className="transition-colors hover:text-forest-500">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted leading-relaxed">
          {product.description}
        </p>

        <div className="mt-3">
          <PriceDisplay price={product.price} purchasable={product.purchasable} size="sm" />
        </div>

        {packSizes.length > 0 && (
          <p className="mt-2 text-xs text-muted">
            Packs: {packSizes.map((p) => p.label).join(', ')}
            {packSizes.some((p) => p.provisional) && (
              <span className="text-accent-600"> (provisional)</span>
            )}
          </p>
        )}

        <div className="mt-4 flex flex-1 items-end gap-2">
          <Link
            to={`/products/${product.slug}`}
            className="btn-outline flex-1 text-sm"
          >
            <Eye className="h-4 w-4" />
            Details
          </Link>

          <button
            onClick={() => onEnquire(product)}
            className="btn-ghost flex-1 text-sm"
            aria-label={`Enquire about ${product.name}`}
          >
            <MessageCircle className="h-4 w-4" />
            Enquire
          </button>

          {product.purchasable && firstPack ? (
            <button
              onClick={() =>
                onAddToCart
                  ? onAddToCart(product)
                  : addToCart(product, firstPack, 1)
              }
              className="btn-primary text-sm"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => onEnquire(product)}
              className="btn-ghost text-sm opacity-60"
              aria-label={`Purchasing unavailable for ${product.name}`}
              title="Price not yet confirmed — enquire instead"
            >
              <Lock className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
