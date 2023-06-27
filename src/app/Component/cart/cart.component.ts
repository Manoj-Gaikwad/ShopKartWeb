import { Component, Input, OnInit } from "@angular/core";
import { ServicesService } from "src/Services/services.service";
import { Cart } from "src/app/Model/cart";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  allRecords: any;
  total = 0;
  sum = 0;
  cartdata: any;
  cart = new Cart();
  isLogin:any;
  isCustomerId:any;

  constructor(
    private servicesService: ServicesService){
      this.isLogin=sessionStorage.getItem("isLogin");
      this.isCustomerId=sessionStorage.getItem("customerid");
      if(this.isCustomerId!=undefined && this.isCustomerId!=0)
      {
        this.getAllCartData();
      }
  }

  ngOnInit(): void {

  }

  getAllCartData() {
    this.servicesService.getAllCartData(this.isCustomerId).subscribe((res:any) => {
      for(let i=0;i<res.length;i++){
      if(res[i].ptype == "shoes"){
        res[i].pimage="../../assets/shoes-images/"+res[i].pimage;
      }
    }
      this.allRecords = res;
      this.servicesService.cartLength.next(this.allRecords.length);
    });
  }

  removeItem(e: any) {
    this.servicesService.deletItem(e).subscribe((res) => {
      alert("Item Removed");
      this.getAllCartData();
    });
  }

  AddQuantity = (event: any) => {
    this.cart = event;
    this.cart.pquantity = this.cart.pquantity + 1;
    this.cart.newprice = this.cart.pprice *this.cart.pquantity;
    this.servicesService.updateCart(this.cart).subscribe((res) => {
      if (res != null) {
        console.log("Success");
        this.getAllCartData();
      }
    });
  };

  SubtractQuantity = (event: any) => {
    if (event.pquantity > 1) {
      this.cart = event;
      this.cart.pquantity = this.cart.pquantity - 1;
      this.cart.newprice = this.cart.newprice - this.cart.pprice;
      this.servicesService.updateCart(this.cart).subscribe((res) => {
        if (res != null) {
          console.log("Success");
          this.getAllCartData();
        }
      });
    } else {
      alert("Product Quantity is not less than 1");
    }
  };
}
