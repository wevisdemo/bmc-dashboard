import { resolve } from '$app/paths';

/**
 * Resolve a pathname with the base path prefix.
 * Wrapper around `resolve` that bypasses strict type-safe overloads for dynamic paths.
 */
export const resolvePath = (path: string) => (resolve as (path: string) => string)(path);
