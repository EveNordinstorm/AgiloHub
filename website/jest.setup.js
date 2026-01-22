// Jest setup file for Next.js testing
// Based on official Next.js and Testing Library documentation

// Import custom matchers from Testing Library
// Provides additional matchers like .toBeInTheDocument(), .toHaveClass(), etc.
require('@testing-library/jest-dom');

// Mock Next.js navigation hooks
// Next.js useRouter and usePathname need to be mocked in Jest environment
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image component to avoid optimization issues in tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return require('react').createElement('img', props);
  },
}));
