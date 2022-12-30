import { Component, OnInit } from '@angular/core';
import { SubjectbehiviourService } from 'src/Services/subjectbehiviour.service';
import { ServicesService } from 'src/Services/services.service';

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

    // this.SubjectbehiviourService.subject.subscribe(res => {
    //   this.allRecords = res;
    //   let length = res.length;
    //   for (let i = 0; i < length; i++) {
    //     this.total = this.total + res[i]?.pprice;
    //   }
    // })
    this.getAllCartData();
  }

  getAllCartData() {
    debugger
    this.servicesService.getAllCartData().subscribe(res => {
      this.allRecords = res;
    })
  }

  removeItem(e: any)
  {
    debugger
    this.servicesService.deletItem(e).subscribe(res=>{
    alert("item removed");
    this.getAllCartData();
    });
  }


}