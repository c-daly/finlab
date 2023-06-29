import { Component, OnInit } from '@angular/core';
import { StockService } from '../shared/services/stock.service';
import { TwelveData } from '../shared/models/twelvedata.model';
import { Candle } from '../shared/models/candle.model';
import * as Highcharts from 'highcharts';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-finchart',
  templateUrl: './finchart.component.html',
  styleUrls: ['./finchart.component.sass']
})

export class FinchartComponent implements OnInit {
  HighCharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  data: Candle[];
  tickers: string[];
  proxy: TwelveData;
  symbol: string;
  selected: string;

	constructor(proxy: TwelveData) {
    this.proxy = proxy;
    this.data = [];
    this.symbol ='MSFT';
    this.selected = 'MSFT';
    this.tickers = ['MSFT', 'QQQ', 'SPY','QS','WKHS', 'AAPL', 'TSLA', 'AMZN', 'GOOG', 'FB', 'NVDA', 'AMD', 'INTC', 'PYPL', 'ADBE', 'NFLX', 'CMCSA', 'PEP', 'CSCO', 'AVGO', 'TXN', 'QCOM', 'TMUS', 'COST', 'AMGN', 'SBUX', 'CHTR', 'INTU', 'ISRG', 'AMD', 'MU', 'GILD', 'MDLZ', 'BKNG', 'ADP', 'VRTX', 'FISV', 'ATVI', 'REGN', 'ILMN', 'CSX', 'ADI', 'ADSK', 'BIIB', 'MNST', 'JD', 'NXPI', 'LRCX', 'ZM', 'EBAY', 'KHC', 'EXC', 'MELI', 'WBA', 'EA', 'ROST', 'ASML', 'BIDU', 'CTSH', 'MAR', 'WDAY', 'KLAC', 'LULU', 'DXCM', 'SNPS', 'ORLY', 'DOCU', 'XEL', 'CDNS', 'PAYX', 'ANSS', 'SPLK', 'NTES', 'IDXX', 'ALGN', 'XLNX', 'PCAR', 'VRSK', 'FAST', 'SIRI', 'SWKS', 'CPRT', 'MXIM', 'SGEN', 'VRSN', 'INCY', 'DLTR', 'TCOM', 'CDW', 'CHKP', 'CERN', 'ULTA', 'FOXA', 'FOX', 'NTAP', 'CTXS', 'TTWO', 'WDC', 'EXPE', 'MCHP', 'CTAS', 'MXIM', 'SNPS', 'KLAC', 'CDNS', 'PAYX', 'ANSS', 'SPLK', 'NTES', 'IDXX', 'ALGN', 'XLNX', 'PCAR', 'VRSK', 'FAST', 'SIRI', 'SWKS', 'CPRT', 'MXIM', 'SGEN', 'VRSN', 'INCY', 'DLTR', 'TCOM', 'CDW', 'CHKP', 'CERN', 'ULTA', 'FOXA']; 
	}

  ngOnInit(): void {
    this.getDailyData(this.symbol);
  }

  onSelectChange(event: Event){

    const selectedValue = (event.target as HTMLSelectElement).value;
    this.symbol = selectedValue;
    this.getDailyData(this.symbol);
  }

  // This function is called when the user clicks the button
  // It will call the proxy service to get the data
  // The data is then used to populate the chart
  // The chartOptions object is then updated with the new data
  getDailyData(symbol: string): void {
    this.proxy.getDailyData(symbol).subscribe(data => {
      this.data = data;

      const dates = this.data.map(candle => candle.date);
      const closeValues = this.data.map(candle => parseFloat(candle.close));

      this.chartOptions = {
        title: {
          text: symbol + ' Daily Close Prices'
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
