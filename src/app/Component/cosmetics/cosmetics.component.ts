import { Component, OnInit } from "@angular/core";
import { Cart } from "src/app/Model/cart";
import { selectedItem } from "src/app/Model/selectedItem";
import { ServicesService } from "src/Services/services.service";
import { Router } from "@angular/router";
import { NotifyService } from "src/Services/notify.service";

@Component({
  selector: "app-cosmetics",
  templateUrl: "./cosmetics.component.html",
  styleUrls: ["./cosmetics.component.scss"],
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
  quantity = 1;
  Cart!: Cart;
  allRecords: any;
  isLogin!: any;
  iscustomerid!: any;

  constructor(
    private ServicesService: ServicesService,
    private Router: Router,
    private Notify: NotifyService
  ) {
    this.iscustomerid = sessionStorage.getItem("customerid");
  }

  ngOnInit(): void {
    this.isLogin = JSON.parse(sessionStorage.getItem("isLogin")!);
    this.GetCosmeticsData();
  }

  GetCosmeticsData() {
    this.ServicesService.GetCosmeticsData().subscribe((res) => {
      this.CosmeticsDetails = res;
    });
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
    if (this.isLogin != undefined) {
      this.sum = 0;
      e.pprice = this.price;
      for (let i = 0; i < this.selectedItems.length; i++) {
        this.Cart = new Cart();
        this.Cart.cid = this.iscustomerid;
        this.Cart.pid = this.selectedItems[i]?.pid;
        this.Cart.ptype = this.selectedItems[i]?.ptype;
        this.Cart.pname = this.selectedItems[i]?.pname;
        this.Cart.psize = "";
        this.Cart.pcolor = this.selectedItems[i].pcolor;
        if (this.Cart.pquantity == undefined) {
          this.Cart.pquantity = this.quantity;
        }
        this.Cart.pprice = this.selectedItems[i].pprice;
        this.Cart.newprice = this.Cart.pprice * this.Cart.pquantity;
        this.Cart.pimage = this.selectedItems[i].pimage;
      }

      this.ServicesService.addToCart(this.Cart).subscribe((res) => {
        if (res == true) {
          this.Notify.showSuccess("Successfully Added To The Cart", "Success");

          this.getAllCartData();
        } else {
          this.Notify.showError("Error To Adding Product in The Cart", "Error");
        }
      });
    } else {
      this.Notify.showWarning("login First", "Error");
      this.Router.navigate(["/signIn"]);
    }
  }
  getAllCartData() {
    this.ServicesService.getAllCartData(this.iscustomerid).subscribe((res) => {
      this.allRecords = res;
      this.ServicesService.cartLength.next(this.allRecords.length);
    });
  }
}
