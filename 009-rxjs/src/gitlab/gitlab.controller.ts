import { Controller, Get, Query } from '@nestjs/common';
import { GitlabService } from './gitlab.service';

@Controller('gitlab')
export class GitlabController {
  constructor(private readonly gitlabService: GitlabService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    return await this.gitlabService.searchProjects(query);
  }
}
