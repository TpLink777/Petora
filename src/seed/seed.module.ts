
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service.js';
import { SeedController } from './seed.controller.js';
import { ProductsModule } from '../products/products.module.js';

@Module({
  controllers: [ SeedController ],
  providers: [ SeedService ],
  imports: [ ProductsModule ]
})
export class SeedModule {}
