import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/Services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  loginForm!: any;
  getEmail!: any;
  getPassword!: any;
  isLogin = true;
  iscustomerid!:any;
  allRecords!:any;
  userdata:any;

  constructor(private services: ServicesService,
    private router: Router,
  ) {
    this.iscustomerid=sessionStorage.getItem("customerid");
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

    
  signin={
    email:"",
    password:""
  }

  ngOnInit(): void {
  }

  checkCustomer(e: any) {
    this.signin.email = e.value.email;
    this.signin.password = e.value.password;
    this.services.SignIn(this.signin).subscribe((res:any) => {
      if (res.result.message == "Success") {
        var data=res.result.output;
        if(data.firstName.length!=0){
        this.services.userdata1.next(data);
      }
        // sessionStorage.setItem('isLogin',res.result.output.firstName);
        sessionStorage.setItem('isLogin',JSON.stringify(res.result.output));
        sessionStorage.setItem('customerid',  res.result.output.cId);
          this.services.getAllCartData(res.result.output.cId).subscribe((res) => {
            this.allRecords = res;
            this.services.cartLength.next(this.allRecords.length);
          });
          this.services.isLogin.next(res.result.output);
        alert("Valid User");
        this.loginForm.reset();
        // this.isLogin = false;
        this.router.navigate(['/homepage']);
      }
      else {
        // this.router.navigate(['/signIn']);
        this.loginForm.reset();
        alert("Invalid Email and Password");
      }
    });
  }
}
 
