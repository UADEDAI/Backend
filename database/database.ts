import { ModuleRef } from '@nestjs/core';

export class Database {
  /**
   * Returns the connection with the given name or the default connection
   */
  getConnection(moduleRef: ModuleRef, connectionName?: string) {
    const {
      getConnectionToken,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
    } = require('@nestjs/sequelize/dist/common/sequelize.utils');
    try {
      return moduleRef.get(getConnectionToken(connectionName), {
        strict: false,
      });
    } catch (err) {
      throw new Error(
        `Unable to find connection with the given name ${
          connectionName || 'Database'
        }`,
      );
    }
  }
}

// Singleton database instance
export const db = new Database();
