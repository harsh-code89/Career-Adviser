/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: require.resolve('browserify-fs'),
        tls: require.resolve('tls-browserify'),
        net: require.resolve('net-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        buffer: require.resolve('buffer/'),
        http2: require.resolve('http2-wrapper'),
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
          process: 'process/browser',
        })
      );

      config.module.rules.push({
        test: /node:/,
        use: 'null-loader',
      });

      // Exclude server-side libraries from the client-side build
      config.externals = {
        '@grpc/grpc-js': 'commonjs @grpc/grpc-js',
        'google-auth-library': 'commonjs google-auth-library',
        'google-gax': 'commonjs google-gax',
      };
    }

    return config;
  },
};

module.exports = nextConfig;