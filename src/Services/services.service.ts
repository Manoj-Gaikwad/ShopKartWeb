import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl = "https://localhost:44351/api";
  constructor(private http: HttpClient) { }
  getbyId(id: any) {
    debugger
    let url = this.baseUrl + "/EmployeeDetails/getEmployeeDetailsById/" + id;
    return this.http.get(url);
  }
  getData() {
    let url = this.baseUrl + "/EmployeeDetails/getAllEmployeeDetails";
    return this.http.get(url);
  }
  addEmployee(data: any) {
    debugger
    let url = this.baseUrl + "/EmployeeDetails/addEmployeeDetails";
    return this.http.post(url, data);
  }
  updateData(data: any) {
    debugger
    let url = this.baseUrl + "/EmployeeDetails/updateEmployeeDetails";
    return this.http.post(url, data);
  }
  deletData(id: any) {
    debugger
    let url = this.baseUrl + "/EmployeeDetails/deletEmployeeDetails/" + id;
    return this.http.get(url);
  }
  getAllGenders() {
    let url = this.baseUrl + "/EmployeeDetails/getAllGender/";
    return this.http.get(url);
  }

  checkValidEmail(email: any, password: any) {
    debugger
    let url = this.baseUrl + "/SignIn/loginEmployee/" + email + '/' + password;
    return this.http.get(url);
  }

  getAllProductsDetails() {
    let url = this.baseUrl + "/ProductsDetails/getAllEmployeeDetails";
    return this.http.get(url);
  }


  getAllClothsDetails() {
    let url = this.baseUrl + "/ClothsDetails/getAllClothsData";
    return this.http.get(url);
  }

  getAllCartData() {
    let url = this.baseUrl + "/CartData/getAllCartData";
    return this.http.get(url);
  }

  addCustomerData(data: any) {
    debugger
    let url = this.baseUrl + "/CustomerData/addCustomerDetails";
    return this.http.post(url, data);
  }

}

