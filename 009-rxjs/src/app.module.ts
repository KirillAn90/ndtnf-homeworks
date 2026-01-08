import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';
import { GitlabController } from './gitlab/gitlab.controller';
import { GitlabService } from './gitlab/gitlab.service';

@Module({
  imports: [HttpModule],
  controllers: [GithubController, GitlabController],
  providers: [GithubService, GitlabService],
})
export class AppModule {}
