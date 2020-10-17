import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { Clients } from './clients.entity';
import { ClientsResolver } from './clients.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Clients])],
  providers: [ClientsService, ClientsResolver]
})
export class ClientsModule {}
