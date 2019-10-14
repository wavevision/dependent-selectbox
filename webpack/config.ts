import path from 'path';

// eslint-disable-next-line
// @ts-ignore
import DtsPlugin from 'dts-bundle-webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { optimize, Configuration } from 'webpack';

import pkg from '../package.json';

import makeLoaders from './loaders';
import { assets, index, naja, name, output } from './constants';

const config: Configuration = {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    [name]: index,
    [`${name}.all`]: naja,
  },
  output: {
    filename: '[name].js',
    library: name.charAt(0).toUpperCase() + name.slice(1),
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: output,
    umdNamedDefine: true,
  },
  target: 'web',
  module: { rules: makeLoaders() },
  optimization: {
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        sourceMap: true,
        terserOptions: {
          compress: {
            unused: true,
            dead_code: true, // eslint-disable-line @typescript-eslint/camelcase
            warnings: false,
          },
          mangle: true,
          output: { comments: false },
        },
      }),
    ],
    nodeEnv: 'production',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!*.d.ts'],
    }),
    new DtsPlugin({
      main: path.join(assets, 'index.d.ts'),
      name: pkg.name,
      out: path.join(output, 'index.d.ts'),
      outputAsModuleFolder: true,
    }),
    new optimize.OccurrenceOrderPlugin(true),
  ],
  stats: 'minimal',
  resolve: { extensions: ['.js', '.ts'] },
};

export default config;
