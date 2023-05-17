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
  isLogin:any;
  iscustomerid!:any;

  constructor(private ServicesService: ServicesService) {
    this.isLogin=sessionStorage.getItem('isLogin');
    this.iscustomerid=sessionStorage.getItem("customerid");
    this.getAllCartData();

   }

  ngOnInit(): void {
   
  }
  
  getAllCartData() {
    this.ServicesService.getAllCartData(this.iscustomerid).subscribe((res) => {
      this.allRecords = res;
      this.ServicesService.cartLength.next(this.allRecords.length);
    });
    this.ServicesService.cartLength.subscribe(res => {
      this.cartlength = Number(res);
    })
 
  }


}
