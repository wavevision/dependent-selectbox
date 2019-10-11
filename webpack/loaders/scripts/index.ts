import path from 'path';

import { RuleSetRule } from 'webpack';

export default (): RuleSetRule[] => [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
      configFile: path.resolve(__dirname, '..', '..', '..', '.eslintrc.js'),
      emitError: true,
      emitWarning: true,
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
];
