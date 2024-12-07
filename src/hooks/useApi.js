import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import axios from "axios";

const useApi = (url, method = 'get', body = null) => {
  console.log('useApi', url, method, body);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await useApiRequest(url, method, body, setIsLoading);
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, error, isLoading };
};

const useApiRequest = async (url, method = 'get', body = null, setLoading = null) => {
  try {
    if (setLoading) setLoading(true);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    };

    const response = await axios(url, options);
    toast.success('Request successful!');

    if (method.toLowerCase() === 'get' || method.toLowerCase() === 'post') {
      return response.data;
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`);
    throw error;
  } finally {
    if (setLoading) setLoading(false);
  }
};

export default useApi;
