import { Component, OnInit } from '@angular/core';
import { SubjectbehiviourService } from 'src/Services/subjectbehiviour.service';
import { ServicesService } from 'src/Services/services.service';
import{Router} from '@angular/router';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private ServicesService: ServicesService, private router: Router) {
    
    
   }

  ngOnInit(): void {
    this.ServicesService.cartLength.subscribe(res =>{
      this.cartlength = Number(res);
      this.isLogin=JSON.parse((sessionStorage.getItem("isLogin"))!);
      this.iscustomerid=sessionStorage.getItem("customerid");
    });
    this.getAllCartData();
  }
  
  getAllCartData() {
    this.ServicesService.getAllCartData(this.iscustomerid).subscribe((res) => {
      this.allRecords = res;
      this.ServicesService.cartLength.next(this.allRecords.length);
    });
  }

  logout(){
    sessionStorage.clear();
    this.isLogin=undefined;
    this.iscustomerid=undefined;
    this.getAllCartData();
    this.router.navigate(['/homepage']);
  }


}
