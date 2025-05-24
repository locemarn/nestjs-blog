import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppGraphQLModule } from './infra/http/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppGraphQLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
