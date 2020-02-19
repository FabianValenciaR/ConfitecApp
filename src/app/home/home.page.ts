import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  userCode: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getUserCode();
  }

  getUserCode() {
    this.authService.userData.then(response => {
      if (!response || response == null) {
        return;
      }
      const userData = JSON.parse(response.value);
      this.userCode = userData.userId;
    });
  }
}
