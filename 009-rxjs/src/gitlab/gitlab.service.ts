import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class GitlabService {
  constructor(private readonly httpService: HttpService) {}

  async searchProjects(query: string) {
    const url = `https://gitlab.com/api/v4/projects?search=${encodeURIComponent(query)}`;
    
    const observable = this.httpService.get(url).pipe(
      map(response => response.data)
    );

    return await lastValueFrom(observable);
  }
}
