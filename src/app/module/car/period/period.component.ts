import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {

  constructor() { }

  brand: string = '';
  model: string = '';
  price: number = 0;
  total: number = 0;

  downPricePercent: number = 0;
  downPricePercentDescription: string = '';

  select_year: string = '';
  downPerMonth: number = 0;
  fee: number = 0;
  showTotal: boolean = false;



  ngOnInit(): void {
  }

  downPrice() {
    this.downPricePercentDescription = (this.price * this.downPricePercent / 100).toString();
  }

  payPerMonth() {
    this.downPerMonth = (this.price - Number(this.downPricePercentDescription)) / (Number(this.select_year) * 12)
  }

  calculate() {
    if (this.brand == '' || this.brand == null ||
      this.model == '' || this.model == null ||
      this.price == 0 || this.price == null ||
      this.downPricePercent == 0 || this.downPricePercent == null ||
      this.fee == 0 || this.fee == null ||
      this.select_year == '' || this.select_year == null) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      console.log("555")
    } else {
      this.showTotal = true
      this.total = this.downPerMonth + (this.downPerMonth * this.fee / 100);
    }
  }

  clear() {
    this.brand = '';
    this.model = '';
    this.price = 0;
    this.total = 0;
    this.downPricePercent = 0;
    this.downPricePercentDescription = '';
    this.select_year = '';
    this.downPerMonth = 0;
    this.fee = 0;
    this.showTotal = false;
  }
}
