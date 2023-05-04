import { Component, OnInit } from '@angular/core';
import { SubjectbehiviourService } from 'src/Services/subjectbehiviour.service';
import { ServicesService } from 'src/Services/services.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartlength: any;
  allRecords: any;
  CartLength:any;
  isLogin=false;

  constructor(private ServicesService: ServicesService) {
    this.getAllCartData();
    this.ServicesService.cartLength.subscribe(res => {
      this.cartlength = Number(res);
    })
   }

  ngOnInit(): void {
    this.isLogin=Boolean(sessionStorage.getItem('isLogin'));
 
  }
  
  getAllCartData() {
    this.ServicesService.getAllCartData().subscribe((res) => {
      this.allRecords = res;
      this.ServicesService.cartLength.next(this.allRecords.length);
    });
    this.ServicesService.cartLength.subscribe(res => {
      this.cartlength = Number(res);
    })
 
  }


}
