module.exports = {
  testMatch: ['<rootDir>/src/assets/**/tests/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', 'src/assets'],
  coverageDirectory: '<rootDir>/temp/coverage/ts',
  coverageReporters: ['clover', 'html', 'text'],
  collectCoverageFrom: [
    'src/assets/**/*.ts',
    '!src/assets/**/*.d.ts',
    '!src/assets/**/tests/**',
    '!**/node_modules/**',
  ],
  transform: {
    '.*': 'ts-jest',
  },
};
