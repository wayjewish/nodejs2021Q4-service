import CONFIG from './src/common/config';

module.exports = {
  type: 'postgres',
  host: 'host.docker.internal',
  port: CONFIG.POSTGRES_PORT,
  username: CONFIG.POSTGRES_USER,
  password: CONFIG.POSTGRES_PASSWORD,
  database: CONFIG.POSTGRES_DB,
  entities: [],
  synchronize: false,
  logging: false,
  migrationsRun: true,
  migrations: ['./src/typeorm/migration/**/*.ts'],
  cli: {
    migrationsDir: './src/typeorm/migration',
  },
};
