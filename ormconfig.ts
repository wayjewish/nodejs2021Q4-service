module.exports = {
  type: 'postgres',
  host: 'host.docker.internal',
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: false,
  migrationsRun: true,
  migrations: ['dist/src/typeorm/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/typeorm/migration',
  },
};
