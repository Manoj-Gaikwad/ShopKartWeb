import { Component, Input, OnInit } from '@angular/core';
import { SubjectbehiviourService } from 'src/Services/subjectbehiviour.service';
import { ServicesService } from 'src/Services/services.service';
import { Cart } from 'src/app/Model/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  allRecords: any;
  total = 0;
  sum = 0

  constructor(private SubjectbehiviourService: SubjectbehiviourService, private servicesService: ServicesService) { }
  
  ngOnInit(): void {
    this.getAllCartData();
  }

  getAllCartData() {
    this.servicesService.getAllCartData().subscribe(res => {
      this.allRecords = res;
    })
  }

  removeItem(e: any) {
    this.servicesService.deletItem(e).subscribe(res => {
      alert("item removed");
      this.getAllCartData();
    });
  }


}