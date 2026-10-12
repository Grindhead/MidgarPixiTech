// Test-only module hooks: resolve extensionless relative imports to .ts files
// (as the TypeScript sources are written) and replace pixi.js with a small stub,
// so the library logic can be tested with node:test and no installed dependencies.
import { register } from 'node:module';

register('./hooks.mjs', import.meta.url);
