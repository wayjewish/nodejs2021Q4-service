module.exports = {
  type: 'postgres',
  host: 'host.docker.internal',
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
  migrationsRun: false,
  migrations: ['./src/typeorm/migration/**/*.ts'],
  cli: {
    migrationsDir: './src/typeorm/migration',
  },
};
