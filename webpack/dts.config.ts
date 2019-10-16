import path from 'path';

import { BundlerConfig } from 'dts-bundle-generator/config-schema';

import { assets, library, output } from './constants';

const config: BundlerConfig = {
  compilationOptions: {
    preferredConfigPath: './dts.config.json',
  },
  entries: [
    {
      filePath: path.join(assets, 'index.ts'),
      libraries: {
        importedLibraries: ['naja'],
      },
      outFile: path.join(output, 'index.d.ts'),
      output: {
        umdModuleName: library,
      },
    },
  ],
};

module.exports = config;
