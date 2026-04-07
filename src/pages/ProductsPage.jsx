import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { categories, formatCurrency } from '../data/catalog';

const ProductsPage = () => {
  const { hydratedProducts } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const filteredProducts = hydratedProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getProductsByCategory = (categoryId) =>
    filteredProducts.filter((product) => product.category === categoryId);

  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      <div className="w-full bg-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 lg:text-5xl">
            Our <span className="text-orange-500">Products</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore our wide range of delicious snacks and refreshing drinks.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-orange-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          <div className="flex w-full items-center space-x-2 md:w-auto">
            <Filter size={20} className="text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {searchTerm && (
          <p className="mt-2 text-sm text-gray-500">
            Found {filteredProducts.length} products matching "{searchTerm}"
          </p>
        )}
      </div>

      <div className="sticky top-20 z-40 overflow-x-auto bg-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex min-w-max space-x-2">
            {categories.map((category) => {
              const hasProducts = getProductsByCategory(category.id).length > 0;
              if (!hasProducts && searchTerm) {
                return null;
              }

              return (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`rounded-lg px-6 py-3 font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'scale-105 bg-orange-500 text-white shadow-lg'
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

      <div className="container mx-auto px-4 py-8">
        {categories.map((category) => {
          const categoryProducts = getProductsByCategory(category.id);

          if (categoryProducts.length === 0) {
            return null;
          }

          return (
            <div
              key={category.id}
              id={`category-${category.id}`}
              className="mb-16 scroll-mt-32 rounded-xl p-6 transition-all duration-500"
            >
              <h2 className="mb-6 border-b-2 border-orange-500 pb-2 text-2xl font-bold text-gray-800">
                {category.name} ({categoryProducts.length})
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl"
                  >
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-3 text-xl font-bold text-gray-800">{product.name}</h3>
                      <div className="mb-4 space-y-2">
                        {product.sizes.map((sizeOption) => (
                          <div
                            key={`${product.id}-${sizeOption.size}`}
                            className="flex items-center justify-between border-b border-gray-100 pb-1 text-sm"
                          >
                            <span className="text-gray-600">{sizeOption.size}</span>
                            <span className="font-semibold text-orange-500">
                              {formatCurrency(sizeOption.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Link
                        to={`/product/${product.id}`}
                        className="block w-full rounded-lg bg-black py-2 text-center text-white transition hover:bg-gray-800"
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

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-500">No products found matching "{searchTerm}"</p>
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
