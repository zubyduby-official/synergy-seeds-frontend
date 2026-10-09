import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EmptyState } from '@/components/States';
import { ProductImage } from '@/components/ProductImage';
import { PriceDisplay } from '@/components/PriceDisplay';
import { useCart } from '@/context/CartContext';
import { categoryName } from '@/data/categories';
import { buildWhatsAppGeneralLink } from '@/services/api';

export function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-8 lg:py-12">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Cart' }]} />
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            message="Browse our hybrid seed varieties and add products to your cart."
            action={
              <Link to="/products" className="btn-primary">
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  const hasUnpricedItems = items.some((item) => item.price === null);

  return (
    <div className="py-8 lg:py-12">
      <div className="container-page">
        <Breadcrumbs items={[{ label: 'Cart' }]} />

        <h1 className="font-display text-fluid-2xl font-bold text-forest-800 mb-6">
          Shopping Cart
        </h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Items */}
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.packSizeLabel}`}
                className="card flex gap-4 p-4"
              >
                <Link
                  to={`/products/${item.slug}`}
                  className="shrink-0"
                >
                  <ProductImage
                    imageRef={item.imageRef}
                    alt={item.name}
                    category={item.category}
                    size="thumb"
                    className="rounded-lg"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/products/${item.slug}`}
                        className="font-display text-base font-bold text-forest-800 hover:text-forest-500 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted mt-0.5">
                        {categoryName(item.category)} • {item.packSizeLabel}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.packSizeLabel)}
                      className="text-muted hover:text-red-500 transition-colors p-1"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-3">
                    <div className="inline-flex items-center rounded-lg border border-forest-200 bg-white">
                      <button
                        onClick={() => updateQuantity(item.productId, item.packSizeLabel, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-l-lg text-charcoal transition-colors hover:bg-botanical"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="flex h-8 min-w-9 items-center justify-center border-x border-forest-200 text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.packSizeLabel, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-r-lg text-charcoal transition-colors hover:bg-botanical"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      {item.price !== null ? (
                        <>
                          <p className="font-display font-bold text-forest-800">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </p>
                          <p className="text-xs text-muted">₹{item.price.toLocaleString('en-IN')} × {item.quantity}</p>
                        </>
                      ) : (
                        <PriceDisplay price={null} purchasable={false} size="sm" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-600 transition-colors hover:text-forest-700 pt-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Items</span>
                  <span className="font-medium text-charcoal">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Total quantity</span>
                  <span className="font-medium text-charcoal">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-forest-100 pt-2 mt-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-display font-bold text-forest-800 text-lg">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Delivery</span>
                  <span className="text-muted text-xs">To be confirmed at checkout</span>
                </div>
              </div>

              {hasUnpricedItems && (
                <div className="mt-4 rounded-lg bg-accent-50 px-3 py-2.5 text-xs text-accent-700">
                  Some items have unconfirmed pricing. You can still proceed — our team
                  will confirm the final amount before payment.
                </div>
              )}

              <Link to="/checkout" className="btn-primary w-full mt-5">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={buildWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full mt-2"
              >
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
