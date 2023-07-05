import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicesService } from "src/Services/services.service";
import { Router } from "@angular/router";
import { NotifyService } from "src/Services/notify.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  loginForm!: any;
  getEmail!: any;
  getPassword!: any;
  isLogin = true;
  iscustomerid!: any;
  allRecords!: any;
  userdata: any;

  constructor(
    private services: ServicesService,
    private router: Router,
    private Notify: NotifyService
  ) {
    this.iscustomerid = sessionStorage.getItem("customerid");
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  signin = {
    email: "",
    password: "",
  };

  ngOnInit(): void {}

  checkCustomer(e: any) {
    debugger;
    this.signin.email = e.value.email;
    this.signin.password = e.value.password;
    this.services.SignIn(this.signin).subscribe((res: any) => {
      if (res.result.message == "Success") {
        this.Notify.showSuccess("Login Successfully", "Success");
        sessionStorage.setItem("isLogin", JSON.stringify(res.result.output));
        sessionStorage.setItem("customerid", res.result.output.cId);
        this.services.getAllCartData(res.result.output.cId).subscribe((res) => {
          this.allRecords = res;
          this.services.cartLength.next(this.allRecords.length);
        });
        this.services.isLogin.next(res.result.output);
        this.loginForm.reset();
        this.router.navigate(["/homepage"]);
      } else {
        // this.router.navigate(['/signIn']);
        this.Notify.showError("!! Invalid Details.", "Error");
        // this.loginForm.reset();
      }
    });
  }
}
