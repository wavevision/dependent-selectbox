import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { optimize, Configuration } from 'webpack';

import makeLoaders from './loaders';
import { index, all, library, name, output } from './constants';

const config: Configuration = {
  devtool: 'source-map',
  mode: 'production',
  entry: {
    [name]: index,
    [`${name}.all`]: all,
  },
  output: {
    filename: '[name].js',
    library,
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
            dead_code: true,
            warnings: false,
          },
          mangle: true,
          output: { comments: false },
        },
      }),
    ],
    nodeEnv: 'production',
  },
  plugins: [new CleanWebpackPlugin(), new optimize.OccurrenceOrderPlugin(true)],
  stats: 'minimal',
  resolve: { extensions: ['.js', '.ts'] },
};

export default config;
