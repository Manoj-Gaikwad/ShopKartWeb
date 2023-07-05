import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/Services/services.service';
import { Cart } from 'src/app/Model/cart';
import { Router} from '@angular/router';
import { NotifyService } from 'src/Services/notify.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  allRecords: any;
  totalprice = 0;
  sum = 0;
  cartdata: any;
  cart = new Cart();
  isLogin: any;
  isCustomerId: any;
  totalitems: any;
  isCart = true;
  isBuyNow = false;
  billingdata: any;

  constructor(private servicesService: ServicesService,private router:Router,private Notify:NotifyService) {
    this.isLogin =JSON.parse(sessionStorage.getItem('isLogin')!);
    this.isCustomerId = sessionStorage.getItem('customerid');
    if (this.isCustomerId != undefined && this.isCustomerId != 0) {
      this.getAllCartData();
    }
  }

  ngOnInit(): void {
    this.isLogin = JSON.parse(sessionStorage.getItem('isLogin')!);
  }

  getAllCartData() {
    this.servicesService
      .getAllCartData(this.isCustomerId)
      .subscribe((res: any) => {
        if (res.length !== 0) {
          for (let i = 0; i < res.length; i++) {
            if (res[i].ptype == 'shoes') {
              res[i].pimage = '../../assets/shoes-images/' + res[i].pimage;
            }
          }
          this.allRecords = res;

          this.servicesService.cartLength.next(this.allRecords.length);
          this.totalprice = 0;
          this.totalitems = this.allRecords.length;

          for (let i = 0; i < this.allRecords.length; i++) {
            this.totalprice = this.totalprice + this.allRecords[i].newprice;
          }
        }
      });
  }

  removeItem(e: any) {
    this.servicesService.deletItem(e).subscribe((res) => {
      this.Notify.showSuccess('Item Removed Successfully','Success');
      this.getAllCartData();
    });
  }
  back()
  {
    this.isCart = true;
        this.isBuyNow = false;
  }

  AddQuantity = (event: any) => {
    this.cart = event;
    this.cart.pquantity = this.cart.pquantity + 1;
    this.cart.newprice = this.cart.pprice * this.cart.pquantity;
    this.servicesService.updateCart(this.cart).subscribe((res) => {
      if (res != null) {
        this.getAllCartData();
      }
    });
  };

  hideshow() {
    this.getAllCartData();
    this.servicesService.userdata1.subscribe((data) => {
      this.billingdata = data;
      if (this.billingdata != undefined) {
        this.isCart = false;
        this.isBuyNow = true;
      }
    });
  }

  SubtractQuantity = (event: any) => {
    if (event.pquantity >= 1) {
      this.cart = event;
      this.cart.pquantity = this.cart.pquantity - 1;
      this.cart.newprice = this.cart.newprice - this.cart.pprice;
      this.servicesService.updateCart(this.cart).subscribe((res) => {
        if (res != null) {
          this.getAllCartData();
        }
      });
    } else {
      this.Notify.showError('No Product in Cart','Error');
    }
  };
}
