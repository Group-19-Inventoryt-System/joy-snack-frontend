import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Filter } from 'lucide-react';

// Import category images
import chipsImg from '../assets/images/products/chips.png';
import juiceImg from '../assets/images/products/juice.png';
import pieImg from '../assets/images/products/pie.png';
import samosaImg from '../assets/images/products/samosa.png';
import springRollCategoryImg from '../assets/images/products/spring_roll_category.jpg';
import sausageCategoryImg from '../assets/images/products/sausageroll.jpg';

// Import specific juice images
import soboloJuice from '../assets/images/products/sobolo_juice.png';
import pineappleJuice from '../assets/images/products/pineable_juice.jpg';
import gingerJuice from '../assets/images/products/ginger_juice.jpg';
import gingermelonJuice from '../assets/images/products/gingermelon_juice.jpg';
import sweetgreenJuice from '../assets/images/products/sweetgreen_juice.jpg';

const ProductsPage = () => {
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeCategory, setActiveCategory] = useState('chips');

  // Main categories
  const categories = [
    { id: 'chips', name: 'Chips', image: chipsImg },
    { id: 'juice', name: 'Juice', image: juiceImg },
    { id: 'pie', name: 'Meat Pie', image: pieImg },
    { id: 'samosa', name: 'Samosa', image: samosaImg },
    { id: 'springroll', name: 'Spring Roll', image: springRollCategoryImg },
    { id: 'sausage', name: 'Sausage Roll', image: sausageCategoryImg }
  ];

  // All products data
  const allProducts = [
    // Juices
    { 
      id: 1, 
      name: 'Sobolo Juice', 
      category: 'juice', 
      image: soboloJuice,
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
      sizes: [
        { size: '10 pieces', price: 'GH₵ 50' },
        { size: '15 pieces', price: 'GH₵ 80' },
        { size: '40 pieces', price: 'GH₵ 190' }
      ]
    }
  ];

  // Filter products based on search and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group filtered products by category
  const getProductsByCategory = (categoryId) => {
    return filteredProducts.filter(p => p.category === categoryId);
  };

  // Function to scroll to category section
  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="w-full bg-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-orange-500">Products</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our wide range of delicious snacks and refreshing drinks
          </p>
        </div>
      </div>

      {/* Search and Filter Bar - NOW WORKING */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Filter size={20} className="text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search results info */}
        {searchTerm && (
          <p className="text-sm text-gray-500 mt-2">
            Found {filteredProducts.length} products matching "{searchTerm}"
          </p>
        )}
      </div>

      {/* Horizontal Category Navigation */}
      <div className="sticky top-20 z-40 bg-white shadow-md py-4 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => {
              // Only show categories that have products after filtering
              const hasProducts = getProductsByCategory(category.id).length > 0;
              if (!hasProducts && searchTerm) return null;
              
              return (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-orange-500 text-white shadow-lg scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products by Category Sections */}
      <div className="container mx-auto px-4 py-8">
        {categories.map((category) => {
          const categoryProducts = getProductsByCategory(category.id);
          
          // Don't show category if no products match the filter
          if (categoryProducts.length === 0) return null;

          return (
            <div 
              key={category.id} 
              id={`category-${category.id}`} 
              className="mb-16 scroll-mt-32 p-6 rounded-xl transition-all duration-500"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-500 pb-2">
                {category.name} ({categoryProducts.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                  >
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{product.name}</h3>
                      <div className="space-y-2 mb-4">
                        {product.sizes.map((sizeOption, index) => (
                          <div key={index} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1">
                            <span className="text-gray-600">{sizeOption.size}</span>
                            <span className="font-semibold text-orange-500">{sizeOption.price}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        to={`/product/${product.id}`}
                        className="block w-full text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                      >
                        View Options
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Show message if no products match search */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching "{searchTerm}"</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-orange-500 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;