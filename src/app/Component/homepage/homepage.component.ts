import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/Services/services.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  allProductDetails!: any;
  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.getAllProductsDetails();
  }

  getAllProductsDetails() {
    this.service.getAllProductsDetails().subscribe(res => {
      this.allProductDetails = res;
    })
  }

}
