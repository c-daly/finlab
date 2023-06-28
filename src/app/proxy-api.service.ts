import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProxyAPIService {
  http: HttpClient;
  data: string;

  constructor(http: HttpClient) { 
    this.data = '';
    this.http = http;
  }

  ngOnInit() {
    this.getDailyData('IBM');
  }

  // function that returns 'hello world' from the backend
  public helloWorld() {
    return 'hello world';
  }	

  public getDailyData(symbol: string) {
    debugger;
    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=OC6HXD0MP5UWIRHM';
    var res = this.http.get(url, { responseType: 'text' }).subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }
}
