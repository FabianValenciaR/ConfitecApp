import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    this.authService.login();
    this.router.navigateByUrl("/home");
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const user = form.value.user;
    const pass = form.value.password;

    console.log(user, pass);
  }
}
