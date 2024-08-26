import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StockModule } from './module/stock/stock.module';
import { kafkaConfig, serviceName } from './common/constant/config.constant';
import { KafkaConfig } from '@nestjs/microservices/external/kafka.interface';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: serviceName.STOCK_PROCESSING_SVC_TCP,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002,
        },
      },
    ]),
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ClientsModule],
})
export class AppModule {}
