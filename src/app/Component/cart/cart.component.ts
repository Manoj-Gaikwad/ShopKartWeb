import { Component, Input, OnInit } from "@angular/core";
import { SubjectbehiviourService } from "src/Services/subjectbehiviour.service";
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

  constructor(
    private SubjectbehiviourService: SubjectbehiviourService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.getAllCartData();
  }

  getAllCartData() {
    this.servicesService.getAllCartData().subscribe((res) => {
      this.allRecords = res;
    });
  }

  removeItem(e: any) {
    this.servicesService.deletItem(e).subscribe((res) => {
      alert("item removed");
      this.getAllCartData();
    });
  }
  AddQuantity = (event: any) => {
    this.cart = event;
    this.cart.pquantity = this.cart.pquantity + 1;
    this.cart.newprice = this.cart.pprice * this.cart.pquantity;
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
