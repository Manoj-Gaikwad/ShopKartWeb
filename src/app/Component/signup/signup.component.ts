import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/Services/services.service';
import { EmployeeData } from 'src/app/Model/employee';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  Token:any;
  loginForm!: any;
  employeeDetails!: any;
  employee!: any;
  employeeData = new EmployeeData();
  employeeById!: any
  date!: any
  allGender!: any;
  constructor(private services: ServicesService) {
    this.employee = new FormGroup({
      empId: new FormControl(),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      contactNo: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      password: new FormControl('', [Validators.required]),
      cPassword: new FormControl('', [Validators.required])
    })
    
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getAllGenders();
  }
  private formatDate(date: any) {
    debugger
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  getAllGenders() {
    debugger
    this.services.getAllGenders().subscribe(res => {
      this.allGender = res;
    })
  }

  SignUpUser() {
    this.employeeData.empId = this.employee.value.empId;
    this.employeeData.firstName = this.employee.value.firstName;
    this.employeeData.lastName = this.employee.value.lastName;
    this.employeeData.dob = this.employee.value.dob;
    this.employeeData.email = this.employee.value.email;
    this.employeeData.gender = this.employee.value.gender;
    this.employeeData.pincode = this.employee.value.pincode;
    this.employeeData.address = this.employee.value.address;
    this.employeeData.contactNo = this.employee.value.contactNo;
    this.employeeData.password = this.employee.value.password;
    this.employeeData.cPassword = this.employee.value.cPassword;
    this.employee.reset();
    this.date = this.formatDate(this.employeeData.dob);
    this.employeeData.dob = this.date;
    if (this.employeeData.empId == undefined) {
      this.employeeData.empId = 0;
      this.services.SignUpUser(this.employeeData).subscribe(res => {
        if(res==true)
        {
        alert("Success");
        this.employee.reset();
        }
      })
    }
  }

SignIn(data:any)
{
  debugger
  this.services.SignIn(data).subscribe(res=>{
  this.Token=res;
  });
}


}



