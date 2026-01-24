import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import '@jest/globals';

declare module '@jest/globals' {
  interface Matchers<R = void> extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}
