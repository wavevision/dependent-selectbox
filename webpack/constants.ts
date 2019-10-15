import path from 'path';

export const assets = path.resolve(__dirname, '..', 'src', 'assets');
export const dir = 'dist';
export const all = path.join(assets, 'all.ts');
export const index = path.join(assets, 'index.ts');
export const name = 'dependentSelectBox';
export const output = path.join(__dirname, '..', dir);
