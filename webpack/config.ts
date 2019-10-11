import path from 'path';

import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { optimize, Configuration } from 'webpack';

import makeLoaders from './loaders';

const assets = path.resolve(__dirname, '..', 'src', 'assets');
const dir = '/dist';
const index = path.join(assets, 'index.ts');
const naja = path.join(assets, 'naja.ts');
const name = 'dependentSelectBox';
const output = path.join(__dirname, '..', dir);

const config: Configuration = {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    [name]: index,
    [`${name}.min`]: index,
    [`${name}.all`]: naja,
    [`${name}.all.min`]: naja,
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
  module: {
    rules: makeLoaders(),
  },
  optimization: {
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        include: /\.min\.js$/,
        sourceMap: true,
        terserOptions: {
          compress: {
            unused: true,
            dead_code: true, // eslint-disable-line @typescript-eslint/camelcase
            warnings: false,
          },
          mangle: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
    nodeEnv: 'production',
  },
  plugins: [new CleanWebpackPlugin(), new optimize.OccurrenceOrderPlugin(true)],
  stats: 'minimal',
  resolve: {
    extensions: ['.js', '.ts'],
  },
};

export default config;
