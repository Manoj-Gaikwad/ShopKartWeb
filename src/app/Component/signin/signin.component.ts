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

  constructor(
    private services: ServicesService,
    private router: Router
  ) {
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
        sessionStorage.setItem('isLogin',res.result.output.firstName);
        sessionStorage.setItem('customerid',  res.result.output.cId);
        alert("Valid User");
        this.loginForm.reset();
        // this.isLogin = false;
      }
      else {
        // this.router.navigate(['/signIn']);
        this.loginForm.reset();
        alert("Invalid Email and Password");
      }

    });
  }
}
 
