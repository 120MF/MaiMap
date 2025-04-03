import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import * as RefreshPlugin from '@rspack/plugin-react-refresh';

const isDev = process.env.NODE_ENV === 'development';
import * as path from 'node:path';
const Dotenv = require('dotenv-webpack');
// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

export default defineConfig({
  context: __dirname,
  entry: {
    main: './src/main.tsx',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['postcss-loader'],
        type: 'css',
      },
      {
        test: /\.svg$/,
        type: 'asset',
      },
      { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource' },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    isDev ? new RefreshPlugin() : null,
    new Dotenv({
      path: './.env',
      safe: false,
    }),
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  devServer: {
    proxy: [
      {
        context: '/api/map',
        target: 'https://apis.map.qq.com',
        changeOrigin: true,
        pathRewrite: { '^/api/map': '' },
      },
    ],
  },
  experiments: {
    css: true,
  },
});
