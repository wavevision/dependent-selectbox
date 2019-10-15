module.exports = {
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  testMatch: ['<rootDir>/src/assets/**/tests/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', 'src/assets'],
  moduleFileExtensions: ['js', 'ts', 'd.ts'],
  coverageDirectory: '<rootDir>/temp/coverage/ts',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'src/assets/**/*.ts',
    '!src/assets/**/*.d.ts',
    '!src/assets/naja.ts',
    '!src/assets/**/tests/**',
    '!**/node_modules/**',
  ],
  preset: 'ts-jest',
};
