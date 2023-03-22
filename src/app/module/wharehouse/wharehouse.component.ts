import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wharehouse',
  templateUrl: './wharehouse.component.html',
  styleUrls: ['./wharehouse.component.scss']
})
export class WharehouseComponent implements OnInit {

  //id, name
  productType: any[] = [
    {
      productTypeId: "0001",
      productTypeName: "เครื่องดื่ม",
    },
    {
      productTypeId: "0003",
      productTypeName: "อาหาร",
    },
    {
      productTypeId: "0002",
      productTypeName: "ขนม",
    }
  ];
  //id, name, des, address
  store: any[] = [
    {
      storeId: "S001",
      storeName: "โกดังบ้านทุ่ง",
      storeDescription: "ใช้จัดเก็บอาหาร",
      storeAddress: "เชียงราย",
    },
    {
      storeId: "S002",
      storeName: "โกดัง ABC",
      storeDescription: "ใช้จัดเก็บอุปกรณ์",
      storeAddress: "เชียงใหม่",
    },
    {
      storeId: "S003",
      storeName: "โกดัง XYZ",
      storeDescription: "ใช้จัดเก็บของใช้ต่างๆ",
      storeAddress: "กรุงเทพ",
    },
  ];
  //barcode, typeID, name, 
  product: any[] = [
    {
      barcode: "P001",
      productTypeId: "0003",
      productName: "กะเพราหมูกรอบ",
      productDescription: "อร่อย 500 calery",
    },
    {
      barcode: "P002",
      productTypeId: "0003",
      productName: "ก๋วยเตี้ยว",
      productDescription: "อร่อย 450 calery",
    },
    {
      barcode: "P003",
      productTypeId: "0002",
      productName: "มาม่า",
      productDescription: "อร่อย 2 calery",
    },
  ];
  //id, barcode, storeID, instock(bool), amount 
  adjust: any[] = [
    {
      adjustId: "A001",
      barcode: "P001",
      storeId: "S002",
      amount: 15,
      instock: true,
    },
    {
      adjustId: "A002",
      barcode: "P001",
      storeId: "S003",
      amount: 20,
      instock: true,
    },
    {
      adjustId: "A003",
      barcode: "P003",
      storeId: "S001",
      amount: 5,
      instock: false,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
