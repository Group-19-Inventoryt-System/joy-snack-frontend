import React, { useMemo, useState } from 'react';
import { 
  Pencil, 
  Plus, 
  Trash2, 
  Search, 
  Filter, 
  Image as ImageIcon, 
  Tag, 
  Star,
  MoreVertical,
  Package,
  Layers,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  X
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { categories, formatCurrency, productImageOptions } from '../../data/catalog';
import { SectionCard, DashboardCard } from './AdminCommon';
import Modal from '../common/Modal';
import Button from '../common/Button';
import AlertDialog from '../common/AlertDialog';

const emptyProductForm = {
  name: '',
  category: categories[0].id,
  imageKey: productImageOptions[0].key,
  description: '',
  featured: false,
  sizes: [
    { size: '', price: '' },
  ],
};

const normalizeProductForm = (product) => ({
  name: product.name ?? '',
  category: product.category ?? categories[0].id,
  imageKey: product.imageKey ?? productImageOptions[0].key,
  description: product.description ?? '',
  featured: Boolean(product.featured),
  sizes:
    product.sizes?.length > 0
      ? product.sizes.map((size) => ({ size: size.size, price: String(size.price) }))
      : [{ size: '', price: '' }],
});

const AdminProductsView = () => {
  const { 
    hydratedProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    isCreatingProduct,
    isUpdatingProduct,
    isDeletingProduct,
    productsLoading 
  } = useAppData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // New AlertDialog States
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning',
    onConfirm: () => {},
  });

  const showAlert = (title, message, type = 'warning', onConfirm = null) => {
    setAlertConfig({
      isOpen: true,
      title,
      message,
      type,
      onConfirm: onConfirm ? () => { onConfirm(); closeAlert(); } : closeAlert,
    });
  };

  const closeAlert = () => setAlertConfig(curr => ({ ...curr, isOpen: false }));

  const filteredProducts = useMemo(() => {
    if (productsLoading) return [];
    const query = productSearch.toLowerCase();
    return hydratedProducts.filter(
      (product) => {
        const matchesSearch = product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
        const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter.toLowerCase();
        return matchesSearch && matchesCategory;
      }
    );
  }, [hydratedProducts, productSearch, categoryFilter, productsLoading]);

  const stats = [
    { label: 'Total Products', value: hydratedProducts.length, icon: Package, tone: 'bg-orange-500', detail: 'Across all categories' },
    { label: 'Featured Items', value: hydratedProducts.filter(p => p.featured).length, icon: Star, tone: 'bg-amber-500', detail: 'Visible on homepage' },
    { label: 'Categories', value: categories.length, icon: Layers, tone: 'bg-emerald-500', detail: 'Store structure' },
  ];

  const handleProductInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProductForm((currentForm) => ({ ...currentForm, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSizeChange = (index, field, value) => {
    setProductForm((currentForm) => ({
      ...currentForm,
      sizes: currentForm.sizes.map((size, sizeIndex) =>
        sizeIndex === index ? { ...size, [field]: value } : size
      ),
    }));
  };

  const addSizeField = () => {
    setProductForm((currentForm) => ({
      ...currentForm,
      sizes: [...currentForm.sizes, { size: '', price: '' }],
    }));
  };

  const removeSizeField = (index) => {
    setProductForm((currentForm) => ({
      ...currentForm,
      sizes: currentForm.sizes.filter((_, sizeIndex) => sizeIndex !== index),
    }));
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProductForm(emptyProductForm);
    setIsModalOpen(false);
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    const cleanedSizes = productForm.sizes
      .filter((size) => size.size.trim() && size.price !== '')
      .map((size) => ({ size: size.size.trim(), price: Number(size.price) }));

    if (cleanedSizes.length === 0) {
      showAlert('Invalid Pricing', 'Please add at least one valid size and price for this product.', 'warning');
      return;
    }

    const payload = {
      name: productForm.name.trim(),
      category: productForm.category,
      imageKey: productForm.imageKey,
      description: productForm.description.trim(),
      featured: productForm.featured,
      sizes: cleanedSizes,
    };

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, payload);
      } else {
        await addProduct(payload);
      }
      resetProductForm();
    } catch (error) {
      console.error('Error saving product:', error);
      showAlert('Save Failed', 'We encountered an error while saving your product. Please check your data and try again.', 'danger');
    }
  };

  const startEditingProduct = (product) => {
    setEditingProductId(product.id);
    setProductForm(normalizeProductForm(product));
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    showAlert(
      'Confirm Deletion', 
      'Are you sure you want to remove this product from your catalog? This action is permanent.', 
      'danger',
      async () => {
        try {
          await deleteProduct(productId);
        } catch (error) {
          console.error('Error deleting product:', error);
          showAlert('Delete Failed', 'We could not delete the product at this time.', 'danger');
        }
      }
    );
  };

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-700">
      {/* Header section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-orange-700 font-sulphur">Product Catalog</h1>
          <p className="text-slate-500 text-sm mt-1 font-bold">Manage your snack inventory and storefront display.</p>
        </div>
        <Button
          onClick={() => {
            setEditingProductId(null);
            setProductForm(emptyProductForm);
            setIsModalOpen(true);
          }}
          iconLeft={Plus}
          size="lg"
          variant="secondary"
        >
          Add New Product
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <DashboardCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main Content Area */}
      <SectionCard 
        title="Product Library" 
        subtitle={`${filteredProducts.length} items listed`}
        actions={
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Find a product..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all outline-none font-bold"
              />
            </div>
            <div className="flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-100 overflow-x-auto max-w-full">
              {['All', ...categories.map(c => c.name)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-1.5 text-xs font-black rounded-xl transition-all whitespace-nowrap ${
                    categoryFilter === cat 
                      ? 'bg-white text-orange-700 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 px-2">
          {productsLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-[32px] bg-slate-50 h-80 animate-pulse border border-slate-100" />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-white border border-slate-100 rounded-[32px] p-3 transition-all hover:border-orange-200 hover:shadow-[0_20px_50px_rgba(217,119,6,0.08)] cursor-default overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 flex gap-1">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900 shadow-sm">
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="p-1 gap-1 px-2 bg-amber-400 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-sm flex items-center">
                        <Star size={10} fill="currentColor" />
                        Featured
                      </span>
                    )}
                  </div>
                  
                  {/* Hover Actions Overlay */}
                  <div className="absolute inset-0 bg-orange-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button 
                      onClick={() => startEditingProduct(product)}
                      className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-slate-900 hover:bg-orange-500 hover:text-white transition-all shadow-xl active:scale-95"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      disabled={isDeletingProduct}
                      className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="mt-4 px-2 pb-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-black text-slate-800 line-clamp-1 text-sm">{product.name}</h3>
                    <span className="text-orange-600 font-black text-xs">
                      {product.sizes.length > 0 ? formatCurrency(Math.min(...product.sizes.map(s => s.price))) : 'N/A'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 min-h-[2.5rem]">
                    {product.description || 'No description provided for this item.'}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-3">
                    <span className="flex items-center gap-1">
                      <Layers size={12} />
                      {product.sizes.length} Options
                    </span>
                    <button 
                      onClick={() => startEditingProduct(product)}
                      className="flex items-center gap-1 text-orange-600 hover:text-orange-700 font-black"
                    >
                      Manage
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="flex flex-col items-center justify-center text-slate-300">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Search size={40} className="opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-slate-400">No products found</h3>
                <p className="text-sm">Try adjusting your filters or adding a new product.</p>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetProductForm}
        title={editingProductId ? 'Edit Product Details' : 'Add New Product'}
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleProductSubmit} className="space-y-8 animate-in fade-in duration-500 pb-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            {/* Visuals & Identity */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">
                  Product Identity
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" size={18} />
                    <input
                      name="name"
                      value={productForm.name}
                      onChange={handleProductInputChange}
                      placeholder="Give it a name..."
                      required
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all outline-none font-black"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleProductInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all outline-none font-bold cursor-pointer"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      name="imageKey"
                      value={productForm.imageKey}
                      onChange={handleProductInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all outline-none font-bold cursor-pointer"
                    >
                      {productImageOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3">
                  Product Story
                </label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductInputChange}
                  placeholder="Describe the flavors, texture, and why customers will love it..."
                  rows="5"
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-[32px] text-sm focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all outline-none leading-relaxed font-bold"
                />
              </div>

              <label className="group flex items-center gap-4 p-4 rounded-[32px] bg-orange-50/50 border border-orange-100 cursor-pointer transition-all hover:bg-orange-100/50">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${productForm.featured ? 'bg-orange-500 text-white' : 'bg-white text-orange-400 shadow-sm'}`}>
                  <Star size={20} fill={productForm.featured ? "currentColor" : "none"} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">Featured Product</p>
                  <p className="text-[10px] text-orange-600 font-black uppercase tracking-wider">Highlight on Home Page</p>
                </div>
                <input
                  type="checkbox"
                  name="featured"
                  checked={productForm.featured}
                  onChange={handleProductInputChange}
                  className="w-5 h-5 rounded-lg accent-orange-500 border-orange-200"
                />
              </label>
            </div>

            {/* Pricing & Variations */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Sizes & Pricing
                </label>
                <button
                  type="button"
                  onClick={addSizeField}
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  <Plus size={14} />
                  Add Variant
                </button>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {productForm.sizes.map((size, index) => (
                  <div 
                    key={index} 
                    className="group flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-[32px] transition-all hover:border-orange-100 hover:shadow-sm"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase tracking-widest">Size</span>
                        <input
                          value={size.size}
                          onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                          placeholder="e.g. Small"
                          className="w-full pl-14 pr-4 py-2 bg-slate-50 rounded-2xl text-xs font-black outline-none border border-transparent focus:border-orange-100 transition-all"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase tracking-widest">GHC</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={size.price}
                          onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                          placeholder="0.00"
                          className="w-full pl-14 pr-4 py-2 bg-slate-50 rounded-2xl text-xs font-black outline-none border border-transparent focus:border-orange-100 transition-all"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSizeField(index)}
                      disabled={productForm.sizes.length === 1}
                      className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Preview Hint */}
              <div className="p-5 bg-orange-50/50 rounded-[32px] border border-orange-100 flex items-start gap-4 shadow-inner">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h5 className="text-sm font-black text-orange-900">Pro-tip</h5>
                  <p className="text-xs text-orange-600 leading-relaxed mt-1 font-bold">
                    Add different weights or pack sizes to give your customers more variety and better value options.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-50">
            <Button
              variant="white"
              onClick={resetProductForm}
              className="px-8"
            >
              Discard
            </Button>
            <Button
              type="submit"
              isLoading={isCreatingProduct || isUpdatingProduct}
              className="px-10"
              variant="secondary"
            >
              {editingProductId ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Global Alert Dialog */}
      <AlertDialog
        isOpen={alertConfig.isOpen}
        onClose={closeAlert}
        onConfirm={alertConfig.onConfirm}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
};

export default AdminProductsView;


