import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Model/cart';
import { selectedItem } from 'src/app/Model/selectedItem';
import { ServicesService } from 'src/Services/services.service';

@Component({
  selector: 'app-cosmetics',
  templateUrl: './cosmetics.component.html',
  styleUrls: ['./cosmetics.component.scss']
})
export class CosmeticsComponent implements OnInit {
  CosmeticsDetails!: any;
  selectedItems: selectedItem[] = [];
  // Cart!:Cart;
  image!: string;
  total = 0;
  sum = 0;
  size!: any;
  price!: any;
  SItemPrice!: number;
  originalPrice!: number;
  quantity=1;
  Cart!: Cart;
  allRecords:any;

  constructor(private ServicesService: ServicesService) { }

  ngOnInit(): void {
    this.GetCosmeticsData();
  }

  GetCosmeticsData() {
    this.ServicesService.GetCosmeticsData().subscribe(res => {
      this.CosmeticsDetails = res;
    })
  }

  selectedItem(e: any) {
    this.image = e.pimage;
    this.originalPrice = e.pprice;
    this.price = e.pprice;
    this.selectedItems = [];
    this.selectedItems.push(e);
  }
  changeImage(e: any) {
    console.log(e);
    this.image = e;
  }

  addToCart(e: any) {
    // if (this.size == undefined) {
    //   alert("Please Select Size First");
    // }
    // else {
      this.sum = 0;
      e.pprice = this.price;
      ;
      for(let i=0;i<this.selectedItems.length;i++)
    {
      this.Cart=new Cart()
      this.Cart.pid=this.selectedItems[i]?.pid;
      this.Cart.ptype=this.selectedItems[i]?.ptype;
      this.Cart.pname=this.selectedItems[i]?.pname;
      this.Cart.psize="";
      this.Cart.pcolor=this.selectedItems[i].pcolor;
      if(this.Cart.pquantity==undefined)
      {
      this.Cart.pquantity=this.quantity;
      }
      this.Cart.pprice=this.selectedItems[i].pprice;
      this.Cart.newprice=this.Cart.pprice*this.Cart.pquantity;
      this.Cart.pimage=this.selectedItems[i].pimage;
    }

    this.ServicesService.addToCart(this.Cart).subscribe(res=>
      {
        if(res==true)
        {
          alert("SuccessFully Added To The Cart");
          this.getAllCartData();
        }
        else{
          alert("Error To Adding in Cart");
        }
      })
       
      
    }
    getAllCartData() {
      this.ServicesService.getAllCartData().subscribe((res) => {
        this.allRecords = res;
        this.ServicesService.cartLength.next(this.allRecords.length+1);
      });
    }
}
