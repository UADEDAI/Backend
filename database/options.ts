import { Inject, Injectable } from '@nestjs/common';
import { falses, trues } from '../constants';
import { SequelizeOptionsFactory } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { SequelizeOptions } from 'sequelize-typescript';

/**
 * Indicate if the database feature is enabled
 */
export const isDatabaseEnabled = !falses.includes(
  String(process.env.DATABASE_ENABLED).toLowerCase(),
);

/**
 * Indicate if the database debug query feature is enabled
 */
export const isDatabaseDebugQueryEnabled = trues.includes(
  String(process.env.DATABASE_DEBUG_QUERY).toLowerCase(),
);

/**
 * Indicate if the database sync feature is enabled
 */
export const isDatabaseSyncEnabled = trues.includes(
  String(process.env.DATABASE_SYNC).toLowerCase(),
);

/**
 * Indicate if the auto discover models feature is enabled
 */
export const isAutoDiscoverModelsEnabled = trues.includes(
  String(process.env.AUTO_DISCOVER_MODELS).toLowerCase(),
);

/**
 * Indicate if the database pool feature is enabled
 */
export const isDatabasePoolEnabled = trues.includes(
  String(process.env.DATABASE_POOL_ENABLED).toLowerCase(),
);

/**
 * Database default options
 */
@Injectable()
export class DatabaseOptionsService implements SequelizeOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  public createSequelizeOptions(): SequelizeOptions {
    const defaultHost = this.configService.get<string>('DB_HOST', 'localhost');
    const defaultPort = this.configService.get<number>('DB_PORT', 3306);
    const defaultUsername = this.configService.get<string>(
      'DB_USERNAME',
      'root',
    );
    const defaultDbName = this.configService.get<string>('DB_NAME', 'Cinemapp');
    const defaultPassword = this.configService.get<string>('DB_PASSWORD', '');
    const defaultTimezone = this.configService.get<string>(
      'DB_TIMEZONE',
      '+00:00',
    );
    const models = [];
    let pool;

    if (isDatabasePoolEnabled) {
      // Maximum number of connection in pool
      const poolMax = this.configService.get<number>('DB_POOL_MAX_CONN', 10);
      // Minimum number of connection in pool
      const poolMin = this.configService.get<number>('DB_POOL_MIN_CONN', 0);
      // The maximum time, in milliseconds, that a connection can be idle before being released
      const poolIdle = this.configService.get<number>('DB_POOL_IDLE', 10000);
      // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      const poolAcquire = this.configService.get<number>(
        'DB_POOL_ACQUIRE',
        60000,
      );
      // The time interval, in milliseconds, after which sequelize-pool will remove idle connections.
      const poolEvict = this.configService.get<number>('DB_POOL_EVICT', 1000);

      pool = {
        max: poolMax,
        min: poolMin,
        idle: poolIdle,
        acquire: poolAcquire,
        evict: poolEvict,
      };
    }

    if (isAutoDiscoverModelsEnabled) {
      models.push(
        this.configService.get<string>(
          'DB_ENTITIES_DIR',
          `${process.cwd()}/!(node_modules)/entities/!(index).js`,
        ),
      );
    }

    return {
      database: defaultDbName,
      dialect: 'mysql',
      logging: isDatabaseDebugQueryEnabled ? console.log : false,
      timezone: defaultTimezone,
      sync: {
        force: isDatabaseSyncEnabled,
      },
      models,
      replication: {
        read: [
          {
            host: this.configService.get<string>('DB_HOST', defaultHost),
            port: this.configService.get<number>('DB_PORT', defaultPort),
            username: this.configService.get<string>(
              'DB_USERNAME',
              defaultUsername,
            ),
            password: this.configService.get<string>(
              'DB_PASSWORD',
              defaultPassword,
            ),
          },
        ],
        write: {
          host: this.configService.get<string>('DB_HOST', defaultHost),
          port: this.configService.get<number>('DB_PORT', defaultPort),
          username: this.configService.get<string>(
            'DB_USERNAME',
            defaultUsername,
          ),
          password: this.configService.get<string>(
            'DB_PASSWORD',
            defaultPassword,
          ),
        },
      },
      pool,
      define: {
        timestamps: false,
      },
      dialectOptions: {
        decimalNumbers: true,
      },
    };
  }
}
