import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { allowedOriginConfig } from './allowedOrigin.config';

export const corsConfig: CorsOptions = {
  // check whether the origin is allowed
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || allowedOriginConfig.includes(origin)) {
      callback(null, true); // Allow the request if origin is allowed or if origin is undefined (same-origin).
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request if origin is not allowed.
    }
  },

  // allowed methods
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],

  // do not process the actual req immediately after the preflight request check by the browser
  preflightContinue: false,

  // preflight request check
  optionsSuccessStatus: 200,
};
