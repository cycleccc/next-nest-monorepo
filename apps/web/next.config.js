import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
                hostname: 'avatar.vercel.sh',
            },
        ],
    },
    outputFileTracingRoot: path.resolve(__dirname, '../../'),
};

export default config;
