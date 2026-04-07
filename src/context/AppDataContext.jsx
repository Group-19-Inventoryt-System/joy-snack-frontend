import React, { createContext, useContext, useMemo } from 'react';
import { 
  useProducts, 
  useUsers, 
  useCreateProduct, 
  useUpdateProduct, 
  useDeleteProduct,
  useCreateUser,
  useUpdateUser,
  useDeleteUser
} from '../hooks';
import { hydrateProduct } from '../data/catalog';

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  // Queries
  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();
  const { data: users = [], isLoading: usersLoading, error: usersError } = useUsers();

  // Mutations
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  // Product operations
  const addProduct = async (productData) => {
    return await createProductMutation.mutateAsync(productData);
  };

  const updateProduct = async (productId, productData) => {
    return await updateProductMutation.mutateAsync({ id: productId, data: productData });
  };

  const deleteProduct = async (productId) => {
    return await deleteProductMutation.mutateAsync(productId);
  };

  // User operations
  const addUser = async (userData) => {
    return await createUserMutation.mutateAsync(userData);
  };

  const updateUser = async (userId, userData) => {
    return await updateUserMutation.mutateAsync({ id: userId, data: userData });
  };

  const deleteUser = async (userId) => {
    return await deleteUserMutation.mutateAsync(userId);
  };

  const value = useMemo(
    () => ({
      // Data
      products,
      hydratedProducts: products.map(hydrateProduct),
      users,
      
      // Loading states
      productsLoading,
      usersLoading,
      
      // Error states
      productsError,
      usersError,
      
      // Product operations
      addProduct,
      updateProduct,
      deleteProduct,
      
      // User operations
      addUser,
      updateUser,
      deleteUser,
      
      // Mutation states
      isCreatingProduct: createProductMutation.isPending,
      isUpdatingProduct: updateProductMutation.isPending,
      isDeletingProduct: deleteProductMutation.isPending,
      isCreatingUser: createUserMutation.isPending,
      isUpdatingUser: updateUserMutation.isPending,
      isDeletingUser: deleteUserMutation.isPending,
    }),
    [
      products,
      users,
      productsLoading,
      usersLoading,
      productsError,
      usersError,
      addProduct,
      updateProduct,
      deleteProduct,
      addUser,
      updateUser,
      deleteUser,
      createProductMutation.isPending,
      updateProductMutation.isPending,
      deleteProductMutation.isPending,
      createUserMutation.isPending,
      updateUserMutation.isPending,
      deleteUserMutation.isPending,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }

  return context;
};
