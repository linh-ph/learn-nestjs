import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const options: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [__dirname + '/src/db/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/db/migrations/*{.ts,.js}'],
  synchronize: true,
};

// Use with TypeORM CLI
export const AppDataSource = new DataSource(options);
