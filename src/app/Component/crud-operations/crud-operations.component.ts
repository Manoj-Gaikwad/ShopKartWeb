import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicesService } from 'src/Services/services.service';
import { EmployeeData } from 'src/app/Model/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crud-operations',
  templateUrl: './crud-operations.component.html',
  styleUrls: ['./crud-operations.component.scss']
})

export class CrudOperationsComponent implements OnInit {
  @Input() Showdata!: string;
  @Output() public Senddata = new EventEmitter<string>();
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
  }
  ngOnInit(): void {
    this.Senddata.emit("hello");
    this.getData();
    this.getAllGenders();
  }

  bindData(data: any) {
    debugger
    this.services.getbyId(data).subscribe(res => {
      this.employeeById = res;
      let dob = this.formatDate(this.employeeById.dob);
      this.employee.controls['empId'].setValue(this.employeeById.empId);
      this.employee.controls['firstName'].setValue(this.employeeById.firstName);
      this.employee.controls['lastName'].setValue(this.employeeById.lastName);
      this.employee.controls['dob'].setValue(dob);
      this.employee.controls['email'].setValue(this.employeeById.email);
      this.employee.controls['gender'].setValue(this.employeeById.gender);
      this.employee.controls['address'].setValue(this.employeeById.address);
      this.employee.controls['pincode'].setValue(this.employeeById.pincode);
      this.employee.controls['contactNo'].setValue(this.employeeById.contactNo);
    })
  }

  getAllGenders() {
    debugger
    this.services.getAllGenders().subscribe(res => {
      this.allGender = res;
    })
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

  addEmployee() {
    this.employeeData.empId = this.employee.value.empId;
    this.employeeData.firstName = this.employee.value.firstName;
    this.employeeData.lastName = this.employee.value.lastName;
    this.employeeData.dob = this.employee.value.dob;
    this.employeeData.email = this.employee.value.email;
    this.employeeData.gender = this.employee.value.gender;
    this.employeeData.pincode = this.employee.value.pincode;
    this.employeeData.address = this.employee.value.address;
    this.employeeData.contactNo = this.employee.value.contactNo;
    this.employee.reset();
    this.date = this.formatDate(this.employeeData.dob);
    this.employeeData.dob = this.date;
    if (this.employeeData.empId == undefined) {
      this.employeeData.empId = 0;
      this.services.addEmployee(this.employeeData).subscribe(res => {
        console.log("Empolyee Added Successfully");
        this.employee.reset();
        this.getData();
      })
    }
    else {
      this.services.updateData(this.employeeData).subscribe(res => {
        console.log("record updated successfully");
        this.getData();
      })
    }
  }

  clearData() {
    this.employee.reset();
  }


  getData() {
    debugger
    this.employee.reset();
    this.services.getData().subscribe(res => {
      this.employeeDetails = res
    }
    )
  }

  deletData(id: any) {
    debugger
    this.services.deletData(id).subscribe(res => {
      alert("deleted")
      this.getData();
    })
  }



}
function deletData(data: any, any: any) {
  throw new Error('Function not implemented.');

}

