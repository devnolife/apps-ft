import { useEffect } from 'react';

import { useRouter } from 'next/router';

import themeConfig from '../configs/themeConfig';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(themeConfig.homePageUrl);
  }, [router]);

  return null;
};

export default Index;
