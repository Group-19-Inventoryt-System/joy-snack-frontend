import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../data/catalog';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
          <p className="mb-8 text-gray-600">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/products"
            className="inline-block rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Shopping Cart ({itemCount} items)</h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-2/3">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="mb-6 flex gap-4 border-b border-gray-200 pb-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>

                <div className="flex-grow">
                  <div className="mb-2 flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size)} className="text-red-500 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="rounded border border-gray-300 p-1 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="rounded border border-gray-300 p-1 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-orange-500">{formatCurrency(item.price)}</p>
                      <p className="text-sm text-gray-500">Total: {formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="mt-4 text-sm text-red-500 hover:text-red-600">
              Clear Cart
            </button>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-24 rounded-xl bg-gray-50 p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-800">Order Summary</h2>

              <div className="mb-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-semibold">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="mt-3 border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold text-orange-500">{formatCurrency(cartTotal)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </Link>

              <p className="mt-4 text-center text-xs text-gray-500">Free delivery on all orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
