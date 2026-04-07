import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../data/catalog';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { hydratedProducts } = useAppData();
  const { addToCart } = useCart();
  const product = useMemo(
    () => hydratedProducts.find((item) => item.id === Number.parseInt(id, 10)) ?? null,
    [hydratedProducts, id]
  );
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedSize(product?.sizes[0] ?? null);
  }, [product]);

  const increaseQuantity = () => setQuantity((currentQuantity) => currentQuantity + 1);
  const decreaseQuantity = () => setQuantity((currentQuantity) => (currentQuantity > 1 ? currentQuantity - 1 : 1));

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, selectedSize, quantity);
      alert(`Added to cart: ${quantity} x ${product.name} (${selectedSize.size})`);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Product Not Found</h2>
          <Link to="/products" className="text-orange-500 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <Link to="/products" className="mb-6 inline-flex items-center text-gray-600 transition hover:text-orange-500">
          <ChevronLeft size={20} />
          <span className="ml-1">Back to Products</span>
        </Link>

        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="flex flex-col lg:flex-row">
            <div className="bg-gray-50 p-8 lg:w-1/2">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
              </div>
            </div>

            <div className="p-8 lg:w-1/2">
              <div className="mb-6">
                <span className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                  {product.category}
                </span>
                <h1 className="mt-2 mb-4 text-3xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-lg leading-relaxed text-gray-600">{product.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Select Size</h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {product.sizes.map((sizeOption) => (
                    <button
                      key={`${product.id}-${sizeOption.size}`}
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`rounded-lg border-2 p-3 text-center transition ${
                        selectedSize?.size === sizeOption.size
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-800">{sizeOption.size}</div>
                      <div className="font-bold text-orange-500">{formatCurrency(sizeOption.price)}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={decreaseQuantity}
                    className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center text-2xl font-bold">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg text-gray-600">Total Price:</span>
                  <span className="text-3xl font-bold text-orange-500">
                    {selectedSize ? formatCurrency(selectedSize.price * quantity) : formatCurrency(0)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-black py-4 font-semibold text-white transition hover:bg-gray-800"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>

                <p className="mt-4 text-center text-sm text-gray-500">
                  Free delivery on orders above {formatCurrency(100)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {product.category === 'juice' && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">You Might Also Like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {hydratedProducts
                .filter((item) => item.category === 'juice' && item.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl"
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="mb-1 text-sm font-semibold text-gray-800">{relatedProduct.name}</h3>
                      <p className="text-sm font-bold text-orange-500">
                        {formatCurrency(relatedProduct.sizes[0].price)}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
