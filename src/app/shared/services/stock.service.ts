import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Candle } from '../models/candle.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private BASE_URL = 'https://www.alphavantage.co/query?';
  AV_API_KEY: string;

  constructor(private http: HttpClient) {
    this.AV_API_KEY = environment.AV_API_KEY;


  }

  getDailyData(symbol: string): Observable<Candle[]> {
    const url = `${this.BASE_URL}function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.AV_API_KEY}`;

    return this.http.get(url).pipe(
      map((response: any) => {
        const data = response['Time Series (Daily)'];
        return Object.keys(data).map((date) => {
          return {
            date: date,
            open: data[date]['1. open'],
            high: data[date]['2. high'],
            low: data[date]['3. low'],
            close: data[date]['4. close'],
            volume: data[date]['5. volume'],
          };
        });
      })
    );
  }
}
