import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async searchRepositories(query: string) {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`;
    
    const observable = this.httpService.get(url).pipe(
      map(response => response.data.items)
    );

    return await lastValueFrom(observable);
  }
}
