import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServicesService } from 'src/Services/services.service';
import { Router } from '@angular/router';
import { selectedItem } from 'src/app/Model/selectedItem';
import { Cart } from 'src/app/Model/cart';
import { SubjectbehiviourService } from 'src/Services/subjectbehiviour.service';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.scss']
})
export class ShoesComponent implements OnInit {

  allShoesDetails!: any;
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
  // buttonDisebled = false;

  constructor(
    private ServicesService: ServicesService,
    private Router: Router,
    private subjectBehaviour: SubjectbehiviourService
  ) { }


  ngOnInit(): void {
    this.getAllShoesDetails();
  }

  getAllShoesDetails() {
    this.ServicesService.getShoesData().subscribe(res => {
      this.allShoesDetails = res;
    })
  }

  selectedItem(e: any) {
    this.image = e.pimage;
    this.originalPrice = e.pprice;
    this.price = e.pprice;
    this.selectedItems = [];
    this.selectedItems.push(e);
  }

  addToCart(e: any) {
    var showSize:string=String(this.size);
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
      this.Cart.psize=showSize;
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
        }
        else{
          alert("Error To Adding in Cart");
        }
      })
       
      this.getAllCartData();
    }
  }

  getAllCartData() {
    this.ServicesService.getAllCartData().subscribe(res => {
      this.cartLength=res;
      this.cartLength.push(this.Cart);
      sessionStorage.setItem('CartLength',this.cartLength.length);
    })
  }
  changeImage(e: any) {
    console.log(e);
    this.image = e;
  }

  checkSize(size: any) {
    this.size = size;
    // if (this.size != undefined) {
    //   this.buttonDisebled = true;
    // }
    if (this.originalPrice != undefined) {
      this.SItemPrice = this.originalPrice;
      if (this.size == '7') {
        this.SItemPrice = this.SItemPrice - 100;
      }
      if (this.size == '8') {
        this.SItemPrice = this.SItemPrice - 50;
      }
      if (this.size == '10') {
        this.SItemPrice = this.SItemPrice + 50;
      }
      if (this.size == '11') {
        this.SItemPrice = this.SItemPrice + 100;
      }
      if (this.SItemPrice != undefined) {
        this.price = this.SItemPrice;
      }
    }
  }
}
