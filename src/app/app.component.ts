import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/Services/services.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  employeeDetails!: any;
  constructor(private services: ServicesService) {

  }
  ngOnInit(): void {

    this.getData();
  }


  getData() {
    this.services.getData().subscribe(res => {
      this.employeeDetails = res
    }
    )
  }

  deletData(data: any) {
    this.services.deletData(data).subscribe(res => {
      alert("deleted")
      this.getData();
    })
  }

  updateData(data: any) {
    let data1 =
    {
      empId: data,
      empName: "Satish",
      dob: "2022-11-15T06:42:07.145Z",
      email: "satish@123.com",
      gender: "Male",
      address: "Satara",
      pincode: 789654
    }

    this.services.updateData(data1).subscribe(res => {

      console.log("res" + res);

    })

  }

}
function deletData(data: any, any: any) {
  throw new Error('Function not implemented.');
}

