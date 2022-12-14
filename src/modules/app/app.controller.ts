import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import AppService from './app.service';

@ApiTags('')
@Controller('v1')
export default class AppController {
    constructor(private readonly appService: AppService) {}

  @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
