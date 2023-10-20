module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  preset: 'ts-jest',
  testRegex: '.spec.ts$',
  transform: {
    '^.+.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/use-cases/**/*.ts'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
    },
  },
};
