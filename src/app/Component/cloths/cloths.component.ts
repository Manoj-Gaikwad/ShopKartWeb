import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServicesService } from 'src/Services/services.service';
import { Router } from '@angular/router';
import { selectedItem } from 'src/app/Model/selectedItem';
import { Cart } from 'src/app/Model/cart';

@Component({
  selector: 'app-cloths',
  templateUrl: './cloths.component.html',
  styleUrls: ['./cloths.component.scss']
})
export class ClothsComponent implements OnInit {
  allClothsDetails!: any;
  selectedItems: selectedItem[] = [];
  Cart!:Cart;
  image!: string;
  total = 0;
  sum = 0;
  size!: any;
  price!: any;
  SItemPrice!: number;
  originalPrice!: number;
  quantity=1;
  cartLength:any;
  indexval=0;
  allRecords:any;
  clothsAddress!:string
  // buttonDisebled = false;

  constructor(
    
    private ServicesService: ServicesService,
    private Router: Router,
  ) { }


  ngOnInit(): void {
  
    this.getAllClothsDetails();
  }

  getAllClothsDetails() {
    debugger
    this.ServicesService.getAllClothsDetails().subscribe(res => {
      this.allClothsDetails = res;
      this.clothsAddress="../../assets/images/";
    })
  }

  selectedItem(e: any) {
    debugger
    this.image = e.pimage;
    this.originalPrice = e.pprice;
    this.price = e.pprice;
    this.selectedItems = [];
    this.selectedItems.push(e);
  }

  addToCart(e: any) {
    debugger
    if (this.size == undefined) {
      alert("Please Select Size First");
    }
    else {
      this.sum = 0;
      e.pprice = this.price;
      ;
      for(let i=0;i<this.selectedItems.length;i++)
    {
      this.Cart=new Cart()
      this.Cart.pid=this.selectedItems[i]?.pid;
      this.Cart.ptype=this.selectedItems[i]?.ptype;
      this.Cart.pname=this.selectedItems[i]?.pname;
      this.Cart.psize=this.size;
      this.Cart.pcolor=this.selectedItems[i].pcolor;
      if(this.Cart.pquantity==undefined)
      {
      this.Cart.pquantity=this.quantity;
      }
      this.Cart.pprice=this.price;
      this.Cart.newprice=this.Cart.pprice*this.Cart.pquantity;
      this.Cart.pimage=this.selectedItems[i].pimage;
    }

    this.ServicesService.addToCart(this.Cart).subscribe(res=>
      {
        if(res==true)
        {
          alert("SuccessFully Added To The Cart");
          this.ServicesService.cartLength.next(this.allRecords.length+1);
          this.getAllCartData();

        }
        else{
          alert("Error To Adding in Cart");
        }
      })
       
    }
  }
  getAllCartData() {
    this.ServicesService.getAllCartData().subscribe((res) => {
      this.allRecords = res;
    });
  }
  
  changeImage(e: any) {
    debugger
    console.log(e);
    this.image = e;
  }

  checkSize(size: any) {
    debugger
    this.size = size.innerText;
    // if (this.size != undefined) {
    //   this.buttonDisebled = true;
    // }
    if (this.originalPrice != undefined) {
      this.SItemPrice = this.originalPrice;
      if (this.size == 'S') {
        this.SItemPrice = this.SItemPrice - 100;
      }
      if (this.size == 'M') {
        this.SItemPrice = this.SItemPrice - 50;
      }
      if (this.size == 'XL') {
        this.SItemPrice = this.SItemPrice + 50;
      }
      if (this.size == 'XXL') {
        this.SItemPrice = this.SItemPrice + 100;
      }
      if (this.SItemPrice != undefined) {
        this.price = this.SItemPrice;
      }
    }
  }
}
