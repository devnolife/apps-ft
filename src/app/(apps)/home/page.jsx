'use client';

import useApi from '@hooks/useApi';

export default function Page() {
  const { data: postData, error: postError, isLoading: postLoading } = useApi(
    'https://jsonplaceholder.typicode.com/posts',
    'post',
    { title: 'foo', body: 'bar', userId: 3 }
  );

  if (postError) return <p>Error (POST): {postError.message}</p>;

  return (
    <div>
      <h1>Home page!</h1>
      <h2>POST Data:</h2>
      <pre>{JSON.stringify(postData, null, 2)}</pre>
    </div>
  );
}
