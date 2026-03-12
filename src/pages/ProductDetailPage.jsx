import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Import all product images
import chipsImg from '../assets/images/products/chips.png';
import juiceImg from '../assets/images/products/juice.png';
import pieImg from '../assets/images/products/pie.png';
import samosaImg from '../assets/images/products/samosa.png';
import springRollCategoryImg from '../assets/images/products/spring_roll_category.jpg';
import sausageCategoryImg from '../assets/images/products/sausageroll.jpg';
import soboloJuice from '../assets/images/products/sobolo_juice.png';
import pineappleJuice from '../assets/images/products/pineable_juice.jpg';
import gingerJuice from '../assets/images/products/ginger_juice.jpg';
import gingermelonJuice from '../assets/images/products/gingermelon_juice.jpg';
import sweetgreenJuice from '../assets/images/products/sweetgreen_juice.jpg';

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Get addToCart function from cart context
  const { addToCart } = useCart();

  // All products data (same as in ProductsPage)
  const allProducts = [
    // Juices
    { 
      id: 1, 
      name: 'Sobolo Juice', 
      category: 'juice', 
      image: soboloJuice,
      description: 'Refreshing and naturally sweet hibiscus drink, perfect for any occasion.',
      sizes: [
        { size: '250ml', price: 'GH₵ 4' },
        { size: '1.5L', price: 'GH₵ 35' },
        { size: '5L', price: 'GH₵ 80' }
      ]
    },
    { 
      id: 2, 
      name: 'Pineapple Juice', 
      category: 'juice', 
      image: pineappleJuice,
      description: 'Freshly pressed pineapple juice, rich in vitamins and deliciously sweet.',
      sizes: [
        { size: '250ml', price: 'GH₵ 4' },
        { size: '1.5L', price: 'GH₵ 35' },
        { size: '5L', price: 'GH₵ 95' }
      ]
    },
    { 
      id: 3, 
      name: 'Ginger Pine Juice', 
      category: 'juice', 
      image: gingerJuice,
      description: 'A zesty blend of ginger and pineapple for a refreshing kick.',
      sizes: [
        { size: '250ml', price: 'GH₵ 6' },
        { size: '1.5L', price: 'GH₵ 55' },
        { size: '5L', price: 'GH₵ 105' }
      ]
    },
    { 
      id: 4, 
      name: 'Ginger Melon Juice', 
      category: 'juice', 
      image: gingermelonJuice,
      description: 'Unique combination of ginger and melon for a refreshing taste.',
      sizes: [
        { size: '250ml', price: 'GH₵ 8' },
        { size: '1.5L', price: 'GH₵ 60' },
        { size: '5L', price: 'GH₵ 125' }
      ]
    },
    { 
      id: 5, 
      name: 'Sweet Green Juice', 
      category: 'juice', 
      image: sweetgreenJuice,
      description: 'A healthy blend of green vegetables and fruits, naturally sweet.',
      sizes: [
        { size: '250ml', price: 'GH₵ 8' },
        { size: '1.5L', price: 'GH₵ 60' },
        { size: '5L', price: 'GH₵ 125' }
      ]
    },
    // Chips
    { 
      id: 101, 
      name: 'Chips', 
      category: 'chips', 
      image: chipsImg,
      description: 'Crispy and delicious chips, perfect for snacking.',
      sizes: [
        { size: 'Mini pack', price: 'GH₵ 20' },
        { size: 'Super pack', price: 'GH₵ 50' },
        { size: 'Family pack', price: 'GH₵ 100' },
        { size: 'Party time', price: 'GH₵ 150' }
      ]
    },
    // Meat Pie
    { 
      id: 201, 
      name: 'Meat Pie', 
      category: 'pie', 
      image: pieImg,
      description: 'Savory meat pies with perfectly seasoned filling in a flaky crust.',
      sizes: [
        { size: '10 pieces', price: 'GH₵ 50' },
        { size: '15 pieces', price: 'GH₵ 80' },
        { size: '40 pieces', price: 'GH₵ 190' }
      ]
    },
    // Samosa
    { 
      id: 301, 
      name: 'Fresh Pack Samosa', 
      category: 'samosa', 
      image: samosaImg,
      description: 'Delicious freshly made samosas with savory filling.',
      sizes: [
        { size: '5 pieces', price: 'GH₵ 20' },
        { size: '10 pieces', price: 'GH₵ 35' },
        { size: '40 pieces', price: 'GH₵ 135' }
      ]
    },
    // Spring Roll
    { 
      id: 401, 
      name: 'Fresh Pack Spring Roll', 
      category: 'springroll', 
      image: springRollCategoryImg,
      description: 'Crispy and delicious spring rolls with vegetable filling.',
      sizes: [
        { size: '6 pieces', price: 'GH₵ 18' },
        { size: '12 pieces', price: 'GH₵ 31' },
        { size: '40 pieces', price: 'GH₵ 100' }
      ]
    },
    // Sausage Roll
    { 
      id: 501, 
      name: 'Sausage Roll', 
      category: 'sausage', 
      image: sausageCategoryImg,
      description: 'Savory sausage rolls perfect for any occasion.',
      sizes: [
        { size: '10 pieces', price: 'GH₵ 50' },
        { size: '15 pieces', price: 'GH₵ 80' },
        { size: '40 pieces', price: 'GH₵ 190' }
      ]
    }
  ];

  // Find the product based on ID from URL
  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]); // Select first size by default
    }
    setLoading(false);
  }, [id]);

  // Handle quantity changes
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Handle add to cart - UPDATED with cart context
  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, selectedSize, quantity);
      alert(`Added to cart: ${quantity} x ${product.name} (${selectedSize.size})`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/products" className="text-orange-500 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link 
          to="/products" 
          className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-6 transition"
        >
          <ChevronLeft size={20} />
          <span className="ml-1">Back to Products</span>
        </Link>

        {/* Product Detail */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2 p-8 bg-gray-50">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 p-8">
              <div className="mb-6">
                <span className="text-sm text-orange-500 font-semibold uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Size</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {product.sizes.map((sizeOption, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`p-3 border-2 rounded-lg text-center transition ${
                        selectedSize?.size === sizeOption.size
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-800">{sizeOption.size}</div>
                      <div className="text-orange-500 font-bold">{sizeOption.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Price and Add to Cart - UPDATED with handleAddToCart */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg text-gray-600">Total Price:</span>
                  <span className="text-3xl font-bold text-orange-500">
                    {selectedSize ? 
                      `GH₵ ${parseInt(selectedSize.price.replace('GH₵ ', '')) * quantity}` 
                      : 'GH₵ 0'}
                  </span>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  Free delivery on orders above GH₵ 100
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section - Only for Juice Products */}
        {product.category === 'juice' && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allProducts
                .filter(p => p.category === 'juice' && p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                  >
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-110 transition duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">{relatedProduct.name}</h3>
                      <p className="text-orange-500 font-bold text-sm">{relatedProduct.sizes[0].price}</p>
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