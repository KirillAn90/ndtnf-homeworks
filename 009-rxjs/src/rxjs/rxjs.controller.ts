import { Controller, Get, Query } from '@nestjs/common';
import { RxjsService } from './rxjs.service';

@Controller('search')
export class RxjsController {
  constructor(private readonly rxjsService: RxjsService) {}

  @Get()
  async search(
    @Query('q') text: string,
    @Query('hub') hub: string,
    @Query('count') count?: string, // опционально, строка из URL
  ) {
    // Преобразование count в число (по умолчанию 10)
    const countNum = count ? parseInt(count, 10) : 10;

    // Проверка на корректность числа
    if (isNaN(countNum) || countNum <= 0) {
      throw new Error('Count must be a positive number');
    }

    return await this.rxjsService.searchRepositories(text, hub, countNum);
  }
}
