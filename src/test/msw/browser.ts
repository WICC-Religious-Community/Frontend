import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/** Browser-side mock worker — intercepts client-component `fetch` calls in mock mode. */
export const mswWorker = setupWorker(...handlers);
