import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clients } from './clients.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clients])
  ],
  providers: [ClientsService, ClientsResolver]
})
export class ClientsModule { }
