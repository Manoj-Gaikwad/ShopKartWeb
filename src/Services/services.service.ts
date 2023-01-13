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
    let url = this.baseUrl + "/EmployeeDetails/getEmployeeDetailsById/" + id;
    return this.http.get(url);
  }
  getData() {
    let url = this.baseUrl + "/EmployeeDetails/getAllEmployeeDetails";
    return this.http.get(url);
  }
  addCustomer(data: any) {
    debugger
    let url = this.baseUrl + "/CustomerData/addCustomerDetails";
    return this.http.post(url, data);
  }
  updateData(data: any) {
    let url = this.baseUrl + "/EmployeeDetails/updateEmployeeDetails";
    return this.http.post(url, data);
  }
  deletData(id: any) {
    let url = this.baseUrl + "/EmployeeDetails/deletEmployeeDetails/" + id;
    return this.http.get(url);
  }
  getAllGenders() {
    let url = this.baseUrl + "/CustomerData/getAllGender/";
    return this.http.get(url);
  }

  checkValidEmail(email: any, password: any) {
    
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
    let url = this.baseUrl + "/CustomerData/addCustomerDetails";
    return this.http.post(url, data);
  }

  deletItem(data:any)
  {
    let url=this.baseUrl+"/CartData/removeItem/" + data;
    return this.http.get(url);
  }

  addToCart(data:any)
  {
    debugger
    let url=this.baseUrl + "/CartData/addCartData";
    return this.http.post(url , data);
  }
  

}

