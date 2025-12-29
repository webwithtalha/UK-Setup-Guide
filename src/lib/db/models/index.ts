/**
 * Database Models Index
 * Export all Mongoose models from a single entry point
 */

export { default as User } from './user';
export type { IUser } from './user';

export { default as Profile } from './profile';
export type { IProfile } from './profile';

// Export connection utilities
export { connectDB, disconnectDB, isConnected, getConnectionStatus } from '../connection';

