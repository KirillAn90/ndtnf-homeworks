import { Injectable } from '@nestjs/common';
import {
  firstValueFrom,
  toArray,
  from,
  map,
  mergeAll,
  take,
  Observable,
} from 'rxjs';
import axios from 'axios';

@Injectable()
export class RxjsService {
  private readonly githubURL = 'https://api.github.com/search/repositories?q=';
  private readonly gitlabURL = 'https://gitlab.com/api/v4/projects?search=';

  private getGithub(text: string, count: number): Observable<any> {
    return from(axios.get(`${this.githubURL}${text}`))
      .pipe(
        map((res: any) => res.data.items),
        mergeAll(),
      )
      .pipe(take(count));
  }

  private getGitlab(text: string, count: number): Observable<any> {
    return from(axios.get(`${this.gitlabURL}${text}`))
      .pipe(
        map((response) => response.data),
        mergeAll(),
        take(count),
        toArray()
      );
  }

  async searchRepositories(text: string, hub: string, count: number = 10): Promise<any> {
    console.log('hub =', hub, 'count =', count);

    const supportedHubs = ['github', 'gitlab'];
    if (!supportedHubs.includes(hub.toLowerCase())) {
      throw new Error(`Unsupported hub: ${hub}. Supported: ${supportedHubs.join(', ')}`);
    }

    let data$: Observable<any>;

    if (hub.toLowerCase() === 'github') {
      data$ = this.getGithub(text, count).pipe(toArray());
    } else if (hub.toLowerCase() === 'gitlab') {
      data$ = this.getGitlab(text, count);
    }

    return await firstValueFrom(data$);
  }
}
