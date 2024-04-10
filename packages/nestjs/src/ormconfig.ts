import * as dotenv from 'dotenv';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

const PROD_ENV = 'production';

const devConfig = {
  url: process.env.DATABASE_URL,
  synchronize: true,
  ssl: false,
};

const prodConfig = {
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

let connectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  entities: ['**/*.entity.js'],
  synchronize: false,
  migrationsTableName: 'migration',
  migrations: ['dist/db/migrations/*.js'],
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
};

if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'test') {
  connectionOptions = Object.assign(connectionOptions, devConfig);
} else {
  connectionOptions = Object.assign(connectionOptions, prodConfig);
}
export default connectionOptions;
