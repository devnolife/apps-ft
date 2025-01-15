import { useState } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import { toast } from 'react-toastify';

const url = 'https://superapps.if.unismuh.ac.id/graphql';

let isLoggingOut = false;

const useGraphql = (accessToken) => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTokenExpiration = (error) => {
    // Token expiration handling logic removed
  };

  const query = async (
    query,
    variables = {},
    { successMessage = 'Permintaan Berhasil', errorMessage = 'Masalah Permintaan', skipSuccessToast = false } = {}
  ) => {
    setLoading(true);

    try {
      const response = await axios.post(url, {
        query,
        variables
      });

      if (response.data.errors) {
        toast.error("Terjadi kesalahan saat memproses permintaan");
      }

      if (!skipSuccessToast) {
        toast.success(successMessage);
      }

      return response.data;
    } catch (error) {
      handleTokenExpiration(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const mutate = async (
    mutation,
    variables = {},
    { successMessage = 'Permintaan Berhasil', errorMessage = 'Masalah Permintaan', skipSuccessToast = false } = {}
  ) => {
    setLoading(true);

    try {
      const response = await axios.post(url, {
        query: mutation,
        variables
      });

      if (response.data?.errors && response.data.errors.length > 0) {
        throw new Error(response.data.errors[0].message);
      } else {
        return response.data;
      }
    } catch (error) {
      handleTokenExpiration(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { query, mutate, loading };
};

export default useGraphql;
