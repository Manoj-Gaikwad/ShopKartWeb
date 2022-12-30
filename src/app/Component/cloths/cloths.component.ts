import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/Services/services.service';
import { Router } from '@angular/router';
import { selectedItem } from 'src/app/Model/selectedItem';
import { Cart } from 'src/app/Model/cart';
import { SubjectbehiviourService } from 'src/Services/subjectbehiviour.service';

@Component({
  selector: 'app-cloths',
  templateUrl: './cloths.component.html',
  styleUrls: ['./cloths.component.scss']
})
export class ClothsComponent implements OnInit {
  allClothsDetails!: any;
  selectedItems: selectedItem[] = [];
  cart: Cart[] = [];
  image!: string;
  total = 0;
  sum = 0;
  size!: any;
  price!: any;
  SItemPrice!: number;
  originalPrice!: number;
  // buttonDisebled = false;

  constructor(
    private service: ServicesService,
    private Router: Router,
    private subjectBehaviour: SubjectbehiviourService
  ) { }


  ngOnInit(): void {
    this.getAllClothsDetails();
  }

  getAllClothsDetails() {
    this.service.getAllClothsDetails().subscribe(res => {
      this.allClothsDetails = res;

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
      this.cart.push(e);
      this.subjectBehaviour.subject.next(this.cart);
      let length = this.cart.length;
      this.subjectBehaviour.cartLength.next(length);
      alert("Successfully Added To The Cart");
    }
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
