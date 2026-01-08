import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    return await this.githubService.searchRepositories(query);
  }
}
