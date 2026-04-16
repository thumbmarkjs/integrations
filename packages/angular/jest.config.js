export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/__tests__'],
  testMatch: [
    '**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__mocks__/',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@angular/core$': '<rootDir>/__tests__/__mocks__/@angular/core.ts',
    '^rxjs$': '<rootDir>/__tests__/__mocks__/rxjs.ts',
    '^@thumbmarkjs/thumbmarkjs$': '<rootDir>/__tests__/__mocks__/@thumbmarkjs/thumbmarkjs.ts',
    '^\\.\\./package\\.json$': '<rootDir>/package.json',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
