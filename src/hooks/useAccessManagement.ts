import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetcherDelete,
  fetcherGET,
  fetcherPOST,
  fetcherPUT,
} from '../lib/fetcher';
import { notification } from 'antd';
import { BaseResponse } from '../types';
import { ListUserType } from '../types/listManagement.type';
import { useNavigate } from 'react-router-dom';

export const useCreateUser = () => {
  const querClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation<any, Error, any>({
    mutationFn: async (body: any) => {
      const response = await fetcherPOST('/user/users/', body);
      return response.data;
    },
    onSuccess: () => {
      notification.success({
        message: 'User Berhasil Ditambahkan',
        description: 'Anda berhasil menambahkan user baru',
      });
      querClient.invalidateQueries({
        queryKey: ['LIST_USER', 'LIST_COUNT_USERS'],
      });
      navigate('/access-management');
    },
  });

  return mutation;
};

export const useUploadUserBulk = () => {
  const mutation = useMutation<any, Error, any>({
    mutationFn: async (body: any) => {
      const response = await fetcherPOST('/user/users/bulk/', body);
      console.log(response);
      return response;
    },
  });

  return mutation;
};

export const useListUser = (params: any) => {
  const query = useQuery<BaseResponse<ListUserType>>({
    queryKey: ['LIST_USER', params],
    enabled: !!params,
    queryFn: async () => {
      const data = await fetcherGET('/user/users/', { ...params });
      return data;
    },
  });

  return query;
};

export const useGetUserById = (uuid: string) => {
  const query = useQuery<BaseResponse<ListUserType>>({
    queryKey: ['GET_USER_BY_ID', uuid],
    queryFn: async () => {
      const data = await fetcherGET(`/user/users/${uuid}`, {});
      return data;
    },
  });

  return query;
};

export const useCountUsers = (params: any) => {
  const query = useQuery<any>({
    queryKey: ['LIST_COUNT_USERS', params],
    enabled: !!params,
    queryFn: async () => {
      const data = await fetcherGET('/user/users/count/', { ...params });
      return data;
    },
  });

  return query;
};

export const useResetPassword = () => {
  const querClient = useQueryClient();
  const mutation = useMutation<any, Error, any>({
    mutationFn: async (uuid: string) => {
      const response = await fetcherPOST(
        `user/users/${uuid}/reset-password/`,
        {},
      );
      return response.data;
    },
    onSuccess: () => {
      notification.success({
        message: 'Reset Password Berhasil',
        description:
          'Password berhasil di reset, Silahkan cek email untuk mendapatkan password baru',
      });
      querClient.invalidateQueries({ queryKey: ['LIST_USER'] });
    },
  });

  return mutation;
};

export const useEditEmail = () => {
  const querClient = useQueryClient();
  const mutation = useMutation<any, Error, any>({
    mutationFn: async ({ email, uuid }: { email: string; uuid: string }) => {
      const response = await fetcherPUT(`user/users/${uuid}/change-email/`, {
        email,
      });
      return response.data;
    },
    onSuccess: () => {
      notification.success({
        message: 'Reset Password Berhasil',
        description: 'Email berhasil diubah',
      });
      querClient.invalidateQueries({ queryKey: ['LIST_USER'] });
    },
  });

  return mutation;
};

export const useDeleteUser = () => {
  const querClient = useQueryClient();
  const mutation = useMutation<any, Error, any>({
    mutationFn: async (userId: string) => {
      const response = await fetcherDelete(`/user/users/${userId}`, {});
      return response.data;
    },
    onSuccess: () => {
      notification.success({
        message: 'Berhasil Menghapus User',
        description: 'Anda berhasil menghapus user',
      });
      querClient.invalidateQueries({ queryKey: ['LIST_USER'] });
    },
  });

  return mutation;
};

export const useAccessManagementCheckStatus = (params: any) => {
  const query = useQuery<any>({
    queryKey: ['STATUS_BULK_USER', { ...params, action: 'referral' }],
    queryFn: async () => {
      const response = await fetcherPOST('/common/bulk-create-status/', {
        action: 'user',
      });
      console.log(response, 'response');
      return response;
    },
  });

  return query;
};
