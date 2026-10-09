import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { CartItemData, Product, PackSize } from '@/types';

interface CartState {
  items: CartItemData[];
}

type CartAction =
  | { type: 'ADD'; item: CartItemData }
  | { type: 'REMOVE'; productId: string; packSizeLabel: string }
  | { type: 'UPDATE_QTY'; productId: string; packSizeLabel: string; quantity: number }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.productId === action.item.productId && i.packSizeLabel === action.item.packSizeLabel
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.item.productId && i.packSizeLabel === action.item.packSizeLabel
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case 'REMOVE':
      return {
        items: state.items.filter(
          (i) => !(i.productId === action.productId && i.packSizeLabel === action.packSizeLabel)
        ),
      };
    case 'UPDATE_QTY':
      return {
        items: state.items
          .map((i) =>
            i.productId === action.productId && i.packSizeLabel === action.packSizeLabel
              ? { ...i, quantity: Math.max(1, action.quantity) }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItemData[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, packSize: PackSize, quantity: number) => void;
  removeFromCart: (productId: string, packSizeLabel: string) => void;
  updateQuantity: (productId: string, packSizeLabel: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'synergy-cart';

function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartState;
  } catch {
    // ignore
  }
  return { items: [] };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  const saveAndDispatch = useCallback((action: CartAction) => {
    dispatch(action);
  }, []);

  // Persist to localStorage after each render
  const items = state.items;
  const json = JSON.stringify({ items });
  try {
    localStorage.setItem(STORAGE_KEY, json);
  } catch {
    // ignore
  }

  const addToCart = useCallback(
    (product: Product, packSize: PackSize, quantity: number) => {
      const item: CartItemData = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        packSizeLabel: packSize.label,
        quantity,
        price: product.price,
        imageRef: product.imageRef,
      };
      saveAndDispatch({ type: 'ADD', item });
    },
    [saveAndDispatch]
  );

  const removeFromCart = useCallback(
    (productId: string, packSizeLabel: string) => {
      saveAndDispatch({ type: 'REMOVE', productId, packSizeLabel });
    },
    [saveAndDispatch]
  );

  const updateQuantity = useCallback(
    (productId: string, packSizeLabel: string, quantity: number) => {
      saveAndDispatch({ type: 'UPDATE_QTY', productId, packSizeLabel, quantity });
    },
    [saveAndDispatch]
  );

  const clearCart = useCallback(() => {
    saveAndDispatch({ type: 'CLEAR' });
  }, [saveAndDispatch]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, itemCount, subtotal, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

