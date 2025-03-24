import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
 
const nextConfig: NextConfig = {};
 
const withNextIntl = createNextIntlPlugin();

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  });
export default bundleAnalyzer(withNextIntl(nextConfig));