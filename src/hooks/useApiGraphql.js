
import { useState, useEffect } from 'react';
import { request } from 'graphql-request';

const useApiGraphql = (url, query, variables = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!url || !query) return;

      try {
        const result = await request(url, query, variables);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, query, variables]);

  return { data, error, isLoading };
};

export default useApiGraphql;
