import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/** Node-side mock server — used by RSC/server fetches in dev+build mock mode, and by Vitest. */
export const mswServer = setupServer(...handlers);
