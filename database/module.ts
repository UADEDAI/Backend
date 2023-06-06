import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseOptionsService } from './options';

/**
 * Database module
 */
export const DatabaseModule = () => {
  const modules = [
    SequelizeModule.forRootAsync({ useClass: DatabaseOptionsService }),
  ];

  return modules;
};
