import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AlunoModule } from './aluno/aluno.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    AlunoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
