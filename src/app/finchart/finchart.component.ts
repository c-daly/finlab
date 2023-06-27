import { Component, OnInit } from '@angular/core';
import { ProxyAPIService } from '../proxy-api.service';
import { StockService } from '../shared/services/stock.service';
import { Candle } from '../shared/models/candle.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-finchart',
  templateUrl: './finchart.component.html',
  styleUrls: ['./finchart.component.sass']
})
export class FinchartComponent implements OnInit {
  HighCharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  data: Candle[];
  proxy: StockService;

	constructor(proxy: StockService) {
    this.proxy = proxy;
    this.data = [];
	}

  //ngOnInit(): void {
  //  this.proxy.getDailyData('IBM').subscribe((data: Candle[]) => {
  //    this.data = data;
  //    debugger;
  //  }, (error) => {
  //    console.log(error);
  //  });
  //}
  ngOnInit(): void {
    this.proxy.getDailyData('MSFT').subscribe(data => {
      this.data = data;

      const dates = this.data.map(candle => candle.date);
      const closeValues = this.data.map(candle => parseFloat(candle.close));

      this.chartOptions = {
        title: {
          text: 'MSFT Daily Close Prices'
        },
        xAxis: {
          categories: dates
        },
        series: [{
          type: 'line',
          data: closeValues,
          name: 'Close Price'
        }]
      };
    }, error => {
      console.error('Error: ', error);
    });
  }
}
