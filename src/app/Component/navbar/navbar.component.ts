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
  pagesAccess:any;
  Home:any;
  Cloth:any;
  ShoesSandals:any;
  Cosmetics:any;
  Cart:any;
  Inventry:any;
  About:any;
  Contact:any;
  Dashboard:any;

  //Pages Access Variables
  

  constructor(private ServicesService: ServicesService, private router: Router) {
    
    
   }

  ngOnInit(): void {
      this.Cloth=true;
      this.ShoesSandals=true;
      this.Cosmetics=true;
      this.ServicesService.cartLength.subscribe(res =>{
      this.cartlength = Number(res);
      this.isLogin=JSON.parse((sessionStorage.getItem("isLogin"))!);
      this.iscustomerid=sessionStorage.getItem("customerid");
      this.userPagesAccess();
    });
    this.getAllCartData();
 
  }
  
  userPagesAccess(){
    debugger
    this.pagesAccess=sessionStorage.getItem("pages");
    this.pagesAccess=this.pagesAccess?.split(',');
    for(let i=0;i<this.pagesAccess.length;i++){
    switch (this.pagesAccess[i]) {
      case this.pagesAccess[i]="Home":{
        this.Home=true;
        break;
      }
      case this.pagesAccess[i]="About":{
        this.About=true;
        break;
      }
      case this.pagesAccess[i]="Contact":{
        this.Contact=true;
        break;
      }
      case this.pagesAccess[i]="Inventary":{
        this.Inventry=true;
        break;
      }
      case this.pagesAccess[i]="Dashboard":{
        this.Dashboard=true;
        break;
      }
      
    }
    }
    console.log("PageAccess is="+this.pagesAccess);
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
