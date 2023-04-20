import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from 'typeOrm.config';

///cái này kết nối với db chứ k phải để migrations
// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get('POSTGRES_HOST'),
//         port: configService.get('POSTGRES_PORT'),
//         username: configService.get('POSTGRES_USER'),
//         password: configService.get('POSTGRES_PASSWORD'),
//         database: configService.get('POSTGRES_DB'),
//         entities: [__dirname + '/../entities/**/*.entity.ts'],
//         migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
//         synchronize: true,
//         autoLoadEntities: true,
//       }),
//     }),
//   ],
// })
//Cái này cấu hình để sử dụng cho riêng trường hợp db là typeorm
@Module({
  imports: [TypeOrmModule.forRoot(options)],
})
export class DatabaseModule {}
