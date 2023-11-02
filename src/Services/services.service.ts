import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  
  subject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  cartLength: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  isLogin: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  Billingdata: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userdata1: BehaviorSubject<any> = new BehaviorSubject<any>("");

 
  

  baseUrl = "https://localhost:44317/api";

  constructor(private http: HttpClient) { }

  getbyId(id: any){
    let url = this.baseUrl + "/EmployeeDetails/getEmployeeDetailsById/" + id;
    return this.http.get(url);
  }

  getData() {
    let url = this.baseUrl + "/EmployeeDetails/getAllEmployeeDetails";
    return this.http.get(url);
  }

  SignUpUser(data: any) {
    let url = this.baseUrl + "/Account/SignUpUser";
    return this.http.post(url, data);
  }

  SignIn(data:any){
    let url=this.baseUrl+"/Account/SignIn";
    return this.http.post(url,data);
  }

  updateData(data: any){
    let url = this.baseUrl + "/EmployeeDetails/updateEmployeeDetails";
    return this.http.post(url, data);
  }

  deletData(id: any){
    let url = this.baseUrl + "/EmployeeDetails/deletEmployeeDetails/" + id;
    return this.http.get(url);
  }

  getAllGenders(){
    let url = this.baseUrl + "/CustomerData/getAllGender/";
    return this.http.get(url);
  }

  checkValidEmail(email: any, password: any) {
    debugger
    let url = this.baseUrl + "/SignIn/loginEmployee/" + email + '/' + password;
    return this.http.get(url);
  }

  getAllProductsDetails(){
    let url = this.baseUrl + "/ProductsDetails/getAllEmployeeDetails";
    return this.http.get(url);
  }

 addClothsData(data:any){
  let url = this.baseUrl + "/ClothsDetails/AddClothsData";
  return this.http.post(url,data);
 }

 getAllClothsDetails(){
    let url = this.baseUrl + "/ClothsDetails/getClothsData";
    return this.http.get(url);
  }
  getAllCartData(data:any){
    var cid=parseInt(data);
    let url = this.baseUrl + "/CartData/getAllCartData/"+cid;
    return this.http.get(url);
  }

  addCustomerData(data: any){
    let url = this.baseUrl + "/CustomerData/addCustomerDetails";
    return this.http.post(url, data);
  }

  deletItem(data:any){
    let url=this.baseUrl+"/CartData/removeItem/" + data;
    return this.http.get(url);
  }

  addToCart(data:any){
    let url=this.baseUrl + "/CartData/addCartData";
    return this.http.post(url , data);
  }
  
  GetCosmeticsData(){
    let url = this.baseUrl + "/CosmeticsDetails/GetCosmeticsData";
    return this.http.get(url);
  }

  addCosmeticsData(data:any){
    let url = this.baseUrl + "/CosmeticsDetails/addCosmeticsData";
    return this.http.post(url,data);
  }
  getShoesData(){
    let url=this.baseUrl+"/ShoesDetails/getShoesAllData";
    return this.http.get(url);
  }
  addShoesData(data:any){
    let url=this.baseUrl+"/ShoesDetails/addShoesData";
    return this.http.post(url,data);
  }
  updateCart(data:any){
  let url=this.baseUrl+"/CartData/updateCart";
  return this.http.post(url,data);
  }
  

}

