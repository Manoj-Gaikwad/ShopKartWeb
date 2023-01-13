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

  ngOnInit(): void {
  }

  checkEmployee(e: any) {
    debugger
    this.getEmail = e.value.email;
    this.getPassword = e.value.password;
    this.checkValidEmail();

  }

  checkValidEmail() {
    debugger
    this.services.checkValidEmail(this.getEmail, this.getPassword).subscribe(res => {
      if (res == true) {
        sessionStorage.setItem('isLogin','true');
        alert("Valid User");
        this.isLogin = false;
      }
      else {
        this.router.navigate(['/signIn']);
        alert("Invalid Email and Password");
      }
    })
  }
}
