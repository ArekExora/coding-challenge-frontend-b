import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {
  private url = 'https://www.busbud.com/napi/flex/suggestions/places';

  constructor(
    private httpClient: HttpClient
  ) { }

  search(query: string): Observable<{name: string, geohash: string}[]> {
    return this.httpClient
      .get(this.composeUrl(query, 'en', 'en'))
      .pipe(
        map(({ suggestions }: any) =>
          suggestions
            .filter(({ place_type }: any) => place_type === 'city' )
            .map(({ full_name, geohash }: any) => ({ full_name, geohash }))
          )
      );
  }

  private composeUrl(query: string, lang: string, locale: string) {
    return `${ this.url }?q=${ query }&limit=5&lang=${ lang }&locale=${ locale }`;
  }
}