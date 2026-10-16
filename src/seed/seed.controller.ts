
import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service.js';
import { SuperAdminAuth } from '../auth/decorators/index.js';


@Controller('seed')
export class SeedController {

  constructor(
    private readonly seedService: SeedService
  ) {}

  @Get()
  //@SuperAdminAuth()
  executeSeed() {
    return this.seedService.runSeed();
  }
}

