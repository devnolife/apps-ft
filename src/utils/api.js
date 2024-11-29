import { toast } from "react-toastify";

export const apiRequest = async (url, method = 'GET', body = null, setLoading, setData) => {
  try {
    if (setLoading) setLoading(true);

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ada kesalahan!');
    }

    if (setData) setData(data)
    toast.success('Request successful!');

    return data;
  } catch (error) {
    toast.error(`Error: ${error.message}`);
  } finally {
    if (setLoading) setLoading(false);
  }
};
