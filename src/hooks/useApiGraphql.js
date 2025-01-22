import { useState, useEffect } from 'react';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const url = 'https://superapps.if.unismuh.ac.id/graphql';

const useApiGraphql = (query, variables = null) => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!url || !query) return;

      let client;

      try {
        client = new ApolloClient({
          uri: url,
          cache: new InMemoryCache()
        });
      } catch (error) {
        console.log("🚀 ~ ApolloClient initialization error:", error);
        setError(error);
        setIsLoading(false);

        return;
      }

      try {
        const result = await client.query({
          query: gql`${query}`,
          variables
        });

        setData(result.data);
      } catch (error) {
        console.log("🚀 ~ fetchData ~ error:", error)
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, variables]);

  return { data, error, isLoading };
};


export default useApiGraphql;
