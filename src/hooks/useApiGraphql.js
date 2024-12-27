import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const useApiGraphql = (url, query, variables = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!url || !query) return;

      const client = new ApolloClient({
        uri: url,
        cache: new InMemoryCache()
      });

      try {
        const result = await client.query({
          query: gql`${query}`,
          variables
        });
        setData(result.data);
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
