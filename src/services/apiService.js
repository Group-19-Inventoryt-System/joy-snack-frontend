import { defaultProducts, defaultUsers, hydrateProduct } from '../data/catalog';
import { authHelpers } from './authService';

const PRODUCTS_STORAGE_KEY = 'joy-snack-products';
const USERS_STORAGE_KEY = 'joy-snack-users';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage helpers
const loadStoredValue = (key, fallback) => {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
};

const saveStoredValue = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

// Products API
export const productsApi = {
  // Get all products
  getProducts: async () => {
    await delay();
    const products = loadStoredValue(PRODUCTS_STORAGE_KEY, defaultProducts);
    return products.map(hydrateProduct);
  },

  // Get single product by ID
  getProductById: async (id) => {
    await delay();
    const products = loadStoredValue(PRODUCTS_STORAGE_KEY, defaultProducts);
    const product = products.find(p => p.id === parseInt(id));
    return product ? hydrateProduct(product) : null;
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    await delay();
    const products = loadStoredValue(PRODUCTS_STORAGE_KEY, defaultProducts);
    const filtered = products.filter(p => p.category === category);
    return filtered.map(hydrateProduct);
  },

  // Get featured products
  getFeaturedProducts: async () => {
    await delay();
    const products = loadStoredValue(PRODUCTS_STORAGE_KEY, defaultProducts);
    const featured = products.filter(p => p.featured);
    return featured.map(hydrateProduct);
  },

  // Create product
  createProduct: async (productData) => {
    await delay();
    const products = loadStoredValue(PRODUCTS_STORAGE_KEY, defaultProducts);
    const nextId = products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    const newProduct = { ...productData, id: nextId };
    const updatedProducts = [...products, newProduct];
    saveStoredValue(PRODUCTS_STORAGE_KEY, updatedProducts);
    return hydrateProduct(newProduct);
  },

  // Update product
  updateProduct: async (id, productData) => {
    await delay();
    const products = loadStoredValue(PRODUCTS_STORAGE_KEY, defaultProducts);
    const updatedProducts = products.map((product) =>
      product.id === parseInt(id) ? { ...product, ...productData, id: parseInt(id) } : product
    );
    saveStoredValue(PRODUCTS_STORAGE_KEY, updatedProducts);
    const updated = updatedProducts.find(p => p.id === parseInt(id));
    return hydrateProduct(updated);
  },

  // Delete product
  deleteProduct: async (id) => {
    await delay();
    const products = loadStoredValue(PRODUCTS_STORAGE_KEY, defaultProducts);
    const filteredProducts = products.filter((product) => product.id !== parseInt(id));
    saveStoredValue(PRODUCTS_STORAGE_KEY, filteredProducts);
    return true;
  },
};

// Users API
export const usersApi = {
  // Get all users
  getUsers: async () => {
    await delay();
    return loadStoredValue(USERS_STORAGE_KEY, defaultUsers).map(authHelpers.sanitizeUser);
  },

  // Get single user by ID
  getUserById: async (id) => {
    await delay();
    const users = loadStoredValue(USERS_STORAGE_KEY, defaultUsers);
    return authHelpers.sanitizeUser(users.find(u => u.id === parseInt(id)) || null);
  },

  // Create user
  createUser: async (userData) => {
    await delay();
    const users = loadStoredValue(USERS_STORAGE_KEY, defaultUsers);
    const nextId = users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;
    const newUser = {
      id: nextId,
      status: 'active',
      role: 'customer',
      joinedAt: new Date().toISOString().slice(0, 10),
      ...userData,
    };
    const updatedUsers = [...users, newUser];
    saveStoredValue(USERS_STORAGE_KEY, updatedUsers);
    return authHelpers.sanitizeUser(newUser);
  },

  // Update user
  updateUser: async (id, userData) => {
    await delay();
    const users = loadStoredValue(USERS_STORAGE_KEY, defaultUsers);
    const updatedUsers = users.map((user) =>
      user.id === parseInt(id) ? { ...user, ...userData, id: parseInt(id) } : user
    );
    saveStoredValue(USERS_STORAGE_KEY, updatedUsers);
    return authHelpers.sanitizeUser(updatedUsers.find(u => u.id === parseInt(id)));
  },

  // Delete user
  deleteUser: async (id) => {
    await delay();
    const users = loadStoredValue(USERS_STORAGE_KEY, defaultUsers);
    const filteredUsers = users.filter((user) => user.id !== parseInt(id));
    saveStoredValue(USERS_STORAGE_KEY, filteredUsers);
    return true;
  },
};
