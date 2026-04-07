import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../services/apiService';

// Query keys
export const queryKeys = {
  users: ['users'],
  user: (id) => ['users', id],
};

// Users hooks
export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: usersApi.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUser = (id) => {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Mutations
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => usersApi.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      queryClient.invalidateQueries({ queryKey: queryKeys.user(id) });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
};
