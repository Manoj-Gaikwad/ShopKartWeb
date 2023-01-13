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

  constructor(private SubjectbehiviourService: SubjectbehiviourService, private ServicesService: ServicesService) { }

  ngOnInit(): void {
    this.isLogin=Boolean(sessionStorage.getItem('isLogin'));
    this.getAllCartData();
    // this.SubjectbehiviourService.cartLength.subscribe(res => {
    //   this.cartlent = Number(res);
    // })
  }

  getAllCartData() {
    debugger
    this.ServicesService.getAllCartData().subscribe(res => {
      this.allRecords = res;
      this.cartlength = this.allRecords.length;
      sessionStorage.setItem('CartLength',this.cartlength);
      this.CartLength=sessionStorage.getItem('CartLength');
    })
  }
}
