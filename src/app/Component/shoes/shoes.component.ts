import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServicesService } from 'src/Services/services.service';
import { selectedItem } from 'src/app/Model/selectedItem';
import { Cart } from 'src/app/Model/cart';
import { Router } from '@angular/router';


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
  allRecords:any;
  // buttonDisebled = false;
  shoesAddress=" ../../assets/shoes-images/";
  isLogin!:any;
  iscustomerid!:any;
  

  constructor(
    private ServicesService: ServicesService,
    private router: Router
  ) {
    this.isLogin=JSON.parse(sessionStorage.getItem("isLogin")!);
    this.iscustomerid=sessionStorage.getItem("customerid");
   }


  ngOnInit(): void {
    this.isLogin=JSON.parse(sessionStorage.getItem("isLogin")!);
    // this.ServicesService.isLogin.subscribe(res=>{
    //   this.isLogin=res;
    // })
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
  if(this.isLogin!=undefined){
      var showSize:string=String(this.size);
      if (this.size == undefined) {
        alert("Please Select Size First");
      }
      else {
        this.sum = 0;
        e.pprice = this.price;
        for(let i=0;i<this.selectedItems.length;i++){
        this.Cart=new Cart()
        this.Cart.cid=this.iscustomerid;
        this.Cart.pid=this.selectedItems[i]?.pid;
        this.Cart.ptype=this.selectedItems[i]?.ptype;
        this.Cart.pname=this.selectedItems[i]?.pname;
        this.Cart.psize=showSize;
        this.Cart.pcolor=this.selectedItems[i].pcolor;
        if(this.Cart.pquantity==undefined){
        this.Cart.pquantity=this.quantity;
        }
        this.Cart.pprice=this.price;
        this.Cart.newprice=this.Cart.pprice*this.Cart.pquantity;
        this.Cart.pimage=this.selectedItems[i].pimage;
      }
      this.ServicesService.addToCart(this.Cart).subscribe(res=>{
          if(res==true){
            alert("SuccessFully Added To The Cart");
            this.getAllCartData();
          }
          else{
            alert("Error To Adding in Cart");
          }
      })
    }
  }
    else{
      this.router.navigate(['/signIn']);
      alert("login First");
    }
  }

  getAllCartData() {
    this.ServicesService.getAllCartData(this.iscustomerid).subscribe((res) => {
      this.allRecords = res;
      this.ServicesService.cartLength.next(this.allRecords.length);
    });
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
