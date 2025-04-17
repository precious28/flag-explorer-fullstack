// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'util';

// Cast to the expected type
global.TextEncoder = NodeTextEncoder as unknown as typeof global.TextEncoder;
global.TextDecoder = NodeTextDecoder as unknown as typeof global.TextDecoder;
